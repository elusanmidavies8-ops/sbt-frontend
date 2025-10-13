"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, Search, ExternalLink, Download, Share2, Calendar, User, BookOpen } from "lucide-react"
import { tonClient, type NFTItem } from "@/lib/ton-client"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchAddress, setSearchAddress] = useState("")
  const [searching, setSearching] = useState(false)
  const { toast } = useToast()

  // Sample student address for demo
  const sampleAddress = "EQCrW7jM-oELrLMwDRzAoZuaMcqbtoWASmtpsPOrfUm0lETv"

  useEffect(() => {
    loadSampleNFTs()
  }, [])

  const loadSampleNFTs = async () => {
    setLoading(true)
    try {
      const studentNFTs = await tonClient.getNFTsByOwner(sampleAddress)
      setNfts(studentNFTs)
    } catch (error) {
      console.error("Failed to load NFTs:", error)
      toast({
        title: "Error",
        description: "Failed to load NFT gallery",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchAddress.trim()) return

    setSearching(true)
    try {
      const studentNFTs = await tonClient.getNFTsByOwner(searchAddress)
      setNfts(studentNFTs)
      toast({
        title: "Search Complete",
        description: `Found ${studentNFTs.length} certificates for this address`,
      })
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Could not fetch NFTs for this address",
        variant: "destructive",
      })
    } finally {
      setSearching(false)
    }
  }

  const shareNFT = (nft: NFTItem) => {
    const shareData = {
      title: nft.metadata.name,
      text: `Check out my ${nft.metadata.name} certificate NFT!`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Gallery link copied to clipboard",
      })
    }
  }

  const downloadCertificate = (nft: NFTItem) => {
    // Mock download functionality
    toast({
      title: "Download Started",
      description: `Downloading ${nft.metadata.name} certificate`,
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6" />
          <h1 className="text-3xl font-bold">NFT Gallery</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6" />
          <h1 className="text-3xl font-bold">NFT Certificate Gallery</h1>
        </div>
        <Badge variant="outline" className="gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          {nfts.length} Certificates
        </Badge>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              placeholder="Enter TON address to view certificates..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <Button type="submit" disabled={searching}>
              {searching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchAddress(sampleAddress)
                handleSearch({ preventDefault: () => {} } as React.FormEvent)
              }}
            >
              Load Sample Certificates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NFT Grid */}
      {nfts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Certificates Found</h3>
            <p className="text-muted-foreground mb-4">
              Enter a TON address above to view certificates, or load sample certificates to explore the gallery.
            </p>
            <Button
              onClick={() => {
                setSearchAddress(sampleAddress)
                handleSearch({ preventDefault: () => {} } as React.FormEvent)
              }}
            >
              View Sample Certificates
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nfts.map((nft) => (
            <Card key={nft.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Certificate Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5">
                  <Image
                    src={nft.metadata.image || "/certificate-badge.png"}
                    alt={nft.metadata.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      #{nft.id}
                    </Badge>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-balance leading-tight mb-2">{nft.metadata.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{nft.metadata.description}</p>
                  </div>

                  {/* Certificate Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Course:</span>
                      <span className="font-medium">Blockchain Fundamentals</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">Dec 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {nft.owner.slice(0, 8)}...{nft.owner.slice(-6)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => downloadCertificate(nft)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => shareNFT(nft)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center justify-center pt-2">
                    <Badge variant="default" className="gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Verified on TON
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Gallery Stats */}
      {nfts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Gallery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{nfts.length}</div>
                <div className="text-sm text-muted-foreground">Total Certificates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Verification Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">TON</div>
                <div className="text-sm text-muted-foreground">Blockchain Network</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
