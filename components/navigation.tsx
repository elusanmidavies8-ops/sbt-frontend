"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Award, BarChart3, Menu, X } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Dashboard", icon: BarChart3 },
    { href: "/admin", label: "Admin Panel", icon: Settings },
    { href: "/gallery", label: "NFT Gallery", icon: Award },
    { href: "/students", label: "Students", icon: Users },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <Card
        className={`fixed left-0 top-0 h-full w-64 border-r bg-card transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">CertifyNFT</h1>
              <Badge variant="secondary" className="text-xs">
                TON Testnet
              </Badge>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-11" onClick={() => setIsOpen(false)}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-sm mb-2">Contract Info</h3>
              <p className="text-xs text-muted-foreground font-mono break-all">
                EQCrW7jM-oELrLMwDRzAoZuaMcqbtoWASmtpsPOrfUm0lETv
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-sm mb-3">Wallet</h3>
              <WalletConnect />
            </div>
          </div>
        </div>
      </Card>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
