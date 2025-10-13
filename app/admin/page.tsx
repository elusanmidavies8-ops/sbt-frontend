"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings, Award, Plus, UserPlus, Send, CheckCircle, AlertCircle, Copy, ExternalLink, Wallet } from "lucide-react";
import { tonClient, type ContractState, updateTonClientWallet } from "@/lib/ton-client";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/use-wallet";

interface MintForm {
  recipientAddress: string;
  certificateName: string;
  description: string;
  courseName: string;
  completionDate: string;
}

export default function AdminPanel() {
  const [contractState, setContractState] = useState<ContractState | null>(null);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [addingAdmin, setAddingAdmin] = useState(false);
  const { toast } = useToast();
  const { wallet, connected, connect, disconnect, address, network } = useWallet();

  const [mintForm, setMintForm] = useState<MintForm>({
    recipientAddress: "",
    certificateName: "",
    description: "",
    courseName: "",
    completionDate: new Date().toISOString().split("T")[0],
  });

  const [newAdminAddress, setNewAdminAddress] = useState("");

  useEffect(() => {
    const fetchContractState = async () => {
      try {
        const state = await tonClient.getContractState();
        setContractState(state);
      } catch (error) {
        console.error("Failed to fetch contract state:", error);
        toast({
          title: "Error",
          description: "Failed to fetch contract state",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContractState();
  }, [toast]);

  useEffect(() => {
    updateTonClientWallet(wallet);
  }, [wallet]);

  const handleMintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractState) return;

    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      });
      return;
    }

    setMinting(true);
    try {
      const success = await tonClient.mintNFT(mintForm.recipientAddress, contractState.nextItemIndex);

      if (success) {
        toast({
          title: "NFT Minted Successfully",
          description: `Certificate #${contractState.nextItemIndex} has been minted to ${mintForm.recipientAddress}`,
        });

        setMintForm({
          recipientAddress: "",
          certificateName: "",
          description: "",
          courseName: "",
          completionDate: new Date().toISOString().split("T")[0],
        });

        const newState = await tonClient.getContractState();
        setContractState(newState);
      }
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: error instanceof Error ? error.message : "Failed to mint NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setMinting(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to add admins",
        variant: "destructive",
      });
      return;
    }

    setAddingAdmin(true);

    try {
      const success = await tonClient.addAdmin(newAdminAddress);
      if (success) {
        toast({
          title: "Admin Added",
          description: `${newAdminAddress} has been granted admin privileges`,
        });
        setNewAdminAddress("");
      }
    } catch (error) {
      toast({
        title: "Failed to Add Admin",
        description: error instanceof Error ? error.message : "Could not add admin. Please check the address and try again.",
        variant: "destructive",
      });
    } finally {
      setAddingAdmin(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Address copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-40 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2">
            <CheckCircle className="h-3 w-3 text-green-500" />
            Admin Access
          </Badge>
          <Badge variant={connected ? "default" : "secondary"} className="gap-2">
            <Wallet className="h-3 w-3" />
            {connected ? "Wallet Connected" : "Wallet Required"}
          </Badge>
          <Button onClick={connected ? disconnect : connect}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </Button>
          {connected && (
            <p className="text-sm text-muted-foreground">
              Connected: {address?.slice(0, 8)}... ({network})
            </p>
          )}
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You have full administrative access to the CertificationNFT contract. Use these tools responsibly to mint
          certificates and manage admins.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Mint Certificate NFT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleMintNFT} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="recipient"
                    placeholder="EQ..."
                    value={mintForm.recipientAddress}
                    onChange={(e) =>
                      setMintForm((prev) => ({
                        ...prev,
                        recipientAddress: e.target.value,
                      }))
                    }
                    required
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="certificateName">Certificate Name</Label>
                  <Input
                    id="certificateName"
                    placeholder="e.g., Blockchain Fundamentals"
                    value={mintForm.certificateName}
                    onChange={(e) =>
                      setMintForm((prev) => ({
                        ...prev,
                        certificateName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    placeholder="e.g., CS-101"
                    value={mintForm.courseName}
                    onChange={(e) =>
                      setMintForm((prev) => ({
                        ...prev,
                        courseName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Certificate description and achievements..."
                  value={mintForm.description}
                  onChange={(e) =>
                    setMintForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={mintForm.completionDate}
                  onChange={(e) =>
                    setMintForm((prev) => ({
                      ...prev,
                      completionDate: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next Token ID:</span>
                <Badge variant="secondary">#{contractState?.nextItemIndex}</Badge>
              </div>

              <Button type="submit" className="w-full" disabled={minting}>
                {minting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Mint Certificate NFT
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Admin Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Add New Admin</h3>
              <form onSubmit={handleAddAdmin} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="adminAddress">Admin Address</Label>
                  <Input
                    id="adminAddress"
                    placeholder="EQ..."
                    value={newAdminAddress}
                    onChange={(e) => setNewAdminAddress(e.target.value)}
                    required
                    className="font-mono text-sm"
                  />
                </div>
                <Button type="submit" className="w-full bg-transparent" disabled={addingAdmin} variant="outline">
                  {addingAdmin ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Admin
                    </>
                  )}
                </Button>
              </form>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Contract Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Contract Owner</span>
                  <Badge variant="secondary">You</Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Contract Address</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(contractState?.owner || "")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="font-mono text-xs bg-muted p-2 rounded break-all">{contractState?.owner}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Supply</span>
                  <span className="text-sm font-medium">{contractState?.totalSupply}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Base URI</span>
                  <Badge variant="outline" className="text-xs">
                    Configured
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">NFT #42 minted successfully</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New admin added</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}