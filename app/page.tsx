"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, TrendingUp, Activity, ExternalLink, Settings } from "lucide-react"
import { tonClient, type ContractState } from "@/lib/ton-client"

export default function Dashboard() {
  const [contractState, setContractState] = useState<ContractState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContractState = async () => {
      try {
        const state = await tonClient.getContractState()
        setContractState(state)
      } catch (error) {
        console.error("Failed to fetch contract state:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContractState()
  }, [])

  const stats = [
    {
      title: "Total NFTs Minted",
      value: contractState?.totalSupply || 0,
      icon: Award,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Students",
      value: "1,234",
      icon: Users,
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "Completion Rate",
      value: "87%",
      icon: TrendingUp,
      change: "+2%",
      changeType: "positive" as const,
    },
    {
      title: "Next Token ID",
      value: contractState?.nextItemIndex || 0,
      icon: Activity,
      change: "Ready",
      changeType: "neutral" as const,
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Badge variant="outline">Loading...</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
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
        <div>
          <h1 className="text-3xl font-bold text-balance">Certification Dashboard</h1>
          <p className="text-muted-foreground">Manage your TON blockchain NFT certification platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            TON Testnet Connected
          </Badge>
          <Badge variant="secondary" className="gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Wallet Integration Ready
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant={stat.changeType === "positive" ? "default" : "secondary"} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Contract Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Contract Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Contract Address</span>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-mono text-xs break-all bg-muted p-3 rounded">{contractState?.owner}</p>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Base URI</span>
              <span className="text-sm font-medium">Configured</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Owner</span>
              <Badge variant="secondary">You</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2" asChild>
              <a href="/admin">
                <Settings className="h-4 w-4" />
                Open Admin Panel
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <a href="/gallery">
                <Award className="h-4 w-4" />
                View NFT Gallery
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <a href="/students">
                <Users className="h-4 w-4" />
                Manage Students
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
