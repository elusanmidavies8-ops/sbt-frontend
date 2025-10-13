// src/hooks/use-wallet.ts
"use client"

import { useEffect, useState, useCallback } from "react"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { updateTonClientWallet } from "@/lib/ton-client"

export interface WalletConnection {
  wallet: any | null
  connected: boolean
  connect: () => void
  disconnect: () => void
  address: string | null
  network: string | null
}

export function useWallet(): WalletConnection {
  const [tonConnectUI] = useTonConnectUI()
  const [wallet, setWallet] = useState<any | null>(null)
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [network, setNetwork] = useState<string | null>(null)

  // Handle connection state changes
  useEffect(() => {
    if (!tonConnectUI) return

    const unsubscribe = tonConnectUI.onStatusChange((walletInfo) => {
      if (walletInfo && walletInfo.account) {
        setWallet(walletInfo)
        setConnected(true)
        setAddress(walletInfo.account.address)
        setNetwork(walletInfo.account.chain === "-239" ? "testnet" : "mainnet")
        updateTonClientWallet(walletInfo)
      } else {
        setWallet(null)
        setConnected(false)
        setAddress(null)
        setNetwork(null)
        updateTonClientWallet(null)
      }
    })

    return () => unsubscribe()
  }, [tonConnectUI])

  const connect = useCallback(() => {
    tonConnectUI?.connectWallet()
  }, [tonConnectUI])

  const disconnect = useCallback(() => {
    tonConnectUI?.disconnect()
  }, [tonConnectUI])

  return { wallet, connected, connect, disconnect, address, network }
}
