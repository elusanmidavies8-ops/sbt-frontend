"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Award, Calendar, Mail, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Student {
  id: string
  name: string
  email: string
  address: string
  certificatesCount: number
  lastActivity: string
  avatar?: string
  courses: string[]
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Mock student data - replace with actual data fetching
    const mockStudents: Student[] = [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        address: "EQCrW7jM-oELrLMwDRzAoZuaMcqbtoWASmtpsPOrfUm0lETv",
        certificatesCount: 3,
        lastActivity: "2 days ago",
        courses: ["Blockchain Fundamentals", "Smart Contract Development", "DeFi Protocols"],
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        address: "EQBvW0FX2L2mR6hsuzYMcKrfNX7d3GPadQCShetck-jV4tOy",
        certificatesCount: 2,
        lastActivity: "1 week ago",
        courses: ["Blockchain Fundamentals", "Cryptocurrency Trading"],
      },
      {
        id: "3",
        name: "Carol Davis",
        email: "carol@example.com",
        address: "EQD2NmD_lH5f5u1Kj6Ka4NlM2W1AX9fdd_svoV7g5gOsM_-y",
        certificatesCount: 4,
        lastActivity: "3 hours ago",
        courses: ["Blockchain Fundamentals", "Smart Contract Development", "Web3 Development", "NFT Creation"],
      },
      {
        id: "4",
        name: "David Wilson",
        email: "david@example.com",
        address: "EQC5zW2mR6hsuzYMcKrfNX7d3GPadQCShetck-jV4tOyBvW0",
        certificatesCount: 1,
        lastActivity: "5 days ago",
        courses: ["Blockchain Fundamentals"],
      },
    ]

    setTimeout(() => {
      setStudents(mockStudents)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Student address copied to clipboard",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Students</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
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
          <Users className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Students</h1>
        </div>
        <Badge variant="outline" className="gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          {students.length} Active Students
        </Badge>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Last active {student.lastActivity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Address:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 font-mono text-xs"
                        onClick={() => copyAddress(student.address)}
                      >
                        {student.address.slice(0, 12)}...{student.address.slice(-8)}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{student.certificatesCount}</span>
                    <span className="text-sm text-muted-foreground">certificates</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>

              {/* Courses */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Completed Courses:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {student.courses.map((course, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Students Found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "No students match your search criteria." : "No students have been registered yet."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Student Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{students.length}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {students.reduce((sum, s) => sum + s.certificatesCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {(students.reduce((sum, s) => sum + s.certificatesCount, 0) / students.length || 0).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg per Student</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
