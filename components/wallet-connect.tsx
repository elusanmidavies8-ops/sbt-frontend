"use client"

import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WalletConnect() {
  const { connected, connect, disconnect, address } = useWallet()
  const { toast } = useToast()

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  if (connected && address) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Wallet Connected</span>
        </div>

        <div className="p-3 bg-muted rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Address</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={copyAddress}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <p className="font-mono text-xs break-all">{shortAddress}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={disconnect}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span className="text-sm font-medium">Wallet Disconnected</span>
      </div>

      <Button
        className="w-full"
        onClick={connect}
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    </div>
  )
}
