import { Search, Filter, Download, ChevronDown, Eye, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminCandidatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Candidate Management</h1>
              <p className="text-muted-foreground">
                View and manage all candidates who have applied to your organization
              </p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search candidates..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-auto">
                  All Candidates
                  <Badge className="ml-2" variant="secondary">
                    {candidates.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="shortlisted" className="flex-1 sm:flex-auto">
                  Shortlisted
                  <Badge className="ml-2" variant="secondary">
                    {candidates.filter((c) => c.status === "Shortlisted").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="interviewed" className="flex-1 sm:flex-auto">
                  Interviewed
                  <Badge className="ml-2" variant="secondary">
                    {candidates.filter((c) => c.status === "Interviewed").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="selected" className="flex-1 sm:flex-auto">
                  Selected
                  <Badge className="ml-2" variant="secondary">
                    {candidates.filter((c) => c.status === "Selected").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex-1 sm:flex-auto">
                  Rejected
                  <Badge className="ml-2" variant="secondary">
                    {candidates.filter((c) => c.status === "Rejected").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        Sort
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem>Date Applied (Newest)</DropdownMenuItem>
                      <DropdownMenuItem>Date Applied (Oldest)</DropdownMenuItem>
                      <DropdownMenuItem>CGPA (Highest)</DropdownMenuItem>
                      <DropdownMenuItem>CGPA (Lowest)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Select defaultValue="all-positions">
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-positions">All Positions</SelectItem>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Showing {candidates.length} candidates</span>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>All Candidates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Candidate</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>CGPA</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates.map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{candidate.name}</div>
                                  <div className="text-sm text-muted-foreground">{candidate.department}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{candidate.position}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{candidate.appliedDate}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  candidate.status === "Selected"
                                    ? "default"
                                    : candidate.status === "Shortlisted" || candidate.status === "Interviewed"
                                      ? "secondary"
                                      : candidate.status === "Rejected"
                                        ? "destructive"
                                        : "outline"
                                }
                              >
                                {candidate.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{candidate.cgpa}/10</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Candidate Profile</DialogTitle>
                                      <DialogDescription>Detailed information about the candidate</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-4">
                                      <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarImage
                                            src={candidate.avatar || "/placeholder.svg"}
                                            alt={candidate.name}
                                          />
                                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-lg font-semibold">{candidate.name}</h3>
                                          <p className="text-muted-foreground">{candidate.department}</p>
                                          <div className="mt-2 flex flex-wrap gap-2">
                                            <Badge variant="outline" className="gap-1">
                                              <Mail className="h-3 w-3" />
                                              {candidate.email}
                                            </Badge>
                                            <Badge variant="outline" className="gap-1">
                                              <Phone className="h-3 w-3" />
                                              {candidate.phone}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                          <h4 className="mb-2 font-medium">Academic Information</h4>
                                          <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Department:</span>
                                              <span>{candidate.department}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Batch:</span>
                                              <span>{candidate.batch}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">CGPA:</span>
                                              <span>{candidate.cgpa}/10</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Backlogs:</span>
                                              <span>{candidate.backlogs}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="mb-2 font-medium">Application Details</h4>
                                          <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Position:</span>
                                              <span>{candidate.position}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Applied Date:</span>
                                              <span>{candidate.appliedDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Status:</span>
                                              <Badge
                                                variant={
                                                  candidate.status === "Selected"
                                                    ? "default"
                                                    : candidate.status === "Shortlisted" ||
                                                        candidate.status === "Interviewed"
                                                      ? "secondary"
                                                      : candidate.status === "Rejected"
                                                        ? "destructive"
                                                        : "outline"
                                                }
                                              >
                                                {candidate.status}
                                              </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">Availability:</span>
                                              <span>{candidate.availability}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Skills</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                          {candidate.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="font-normal">
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Resume</h4>
                                        <div className="flex items-center justify-between rounded-lg border p-3">
                                          <div className="flex items-center gap-3">
                                            <div className="rounded-md bg-muted p-2">
                                              <Image
                                                src="/placeholder.svg?height=40&width=32&query=pdf"
                                                alt="PDF icon"
                                                width={32}
                                                height={40}
                                                className="h-10 w-8"
                                              />
                                            </div>
                                            <div>
                                              <p className="font-medium">{candidate.name}_Resume.pdf</p>
                                              <p className="text-xs text-muted-foreground">420 KB</p>
                                            </div>
                                          </div>
                                          <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                          </Button>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Update Status</h4>
                                        <div className="flex items-center gap-2">
                                          <Select defaultValue={candidate.status.toLowerCase()}>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="applied">Applied</SelectItem>
                                              <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                              <SelectItem value="interviewed">Interviewed</SelectItem>
                                              <SelectItem value="selected">Selected</SelectItem>
                                              <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <Button>Update</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Mark as Shortlisted</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Interviewed</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Selected</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Rejected</DropdownMenuItem>
                                    <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shortlisted" className="mt-0">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Shortlisted Candidates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Candidate</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>CGPA</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates
                          .filter((c) => c.status === "Shortlisted")
                          .map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{candidate.name}</div>
                                    <div className="text-sm text-muted-foreground">{candidate.department}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{candidate.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{candidate.appliedDate}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{candidate.status}</Badge>
                              </TableCell>
                              <TableCell>{candidate.cgpa}/10</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interviewed" className="mt-0">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Interviewed Candidates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Candidate</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>CGPA</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates
                          .filter((c) => c.status === "Interviewed")
                          .map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{candidate.name}</div>
                                    <div className="text-sm text-muted-foreground">{candidate.department}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{candidate.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{candidate.appliedDate}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{candidate.status}</Badge>
                              </TableCell>
                              <TableCell>{candidate.cgpa}/10</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="selected" className="mt-0">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Selected Candidates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Candidate</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>CGPA</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates
                          .filter((c) => c.status === "Selected")
                          .map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{candidate.name}</div>
                                    <div className="text-sm text-muted-foreground">{candidate.department}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{candidate.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{candidate.appliedDate}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge>{candidate.status}</Badge>
                              </TableCell>
                              <TableCell>{candidate.cgpa}/10</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rejected" className="mt-0">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Rejected Candidates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Candidate</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>CGPA</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates
                          .filter((c) => c.status === "Rejected")
                          .map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{candidate.name}</div>
                                    <div className="text-sm text-muted-foreground">{candidate.department}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{candidate.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{candidate.appliedDate}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="destructive">{candidate.status}</Badge>
                              </TableCell>
                              <TableCell>{candidate.cgpa}/10</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">© 2024 Campus Placement Platform. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const candidates = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/diverse-person.png",
    email: "alex.morgan@example.com",
    phone: "+91 9876543210",
    department: "Computer Science",
    batch: "2021-2025",
    cgpa: 9.2,
    backlogs: "None",
    position: "Software Engineer",
    appliedDate: "May 15, 2024",
    status: "Shortlisted",
    availability: "July 2025",
    skills: ["Java", "React", "Node.js", "Python", "AWS"],
  },
  {
    id: "2",
    name: "Jamie Chen",
    avatar: "/diverse-group-two.png",
    email: "jamie.chen@example.com",
    phone: "+91 9876543211",
    department: "Information Technology",
    batch: "2021-2025",
    cgpa: 8.7,
    backlogs: "None",
    position: "Data Scientist",
    appliedDate: "May 14, 2024",
    status: "Interviewed",
    availability: "July 2025",
    skills: ["Python", "Machine Learning", "Data Science", "SQL", "TensorFlow"],
  },
  {
    id: "3",
    name: "Sam Wilson",
    avatar: "/diverse-group-outdoors.png",
    email: "sam.wilson@example.com",
    phone: "+91 9876543212",
    department: "Electronics & Communication",
    batch: "2020-2024",
    cgpa: 8.9,
    backlogs: "None",
    position: "Hardware Engineer",
    appliedDate: "May 12, 2024",
    status: "Selected",
    availability: "June 2024",
    skills: ["VLSI", "Embedded Systems", "IoT", "C++", "PCB Design"],
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatar: "/diverse-group-four.png",
    email: "taylor.reed@example.com",
    phone: "+91 9876543213",
    department: "Computer Science",
    batch: "2021-2025",
    cgpa: 9.5,
    backlogs: "None",
    position: "Software Engineer",
    appliedDate: "May 10, 2024",
    status: "Applied",
    availability: "July 2025",
    skills: ["Algorithms", "System Design", "Java", "C++", "Cloud Computing"],
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/diverse-group-five.png",
    email: "jordan.lee@example.com",
    phone: "+91 9876543214",
    department: "Information Technology",
    batch: "2020-2024",
    cgpa: 8.3,
    backlogs: "1",
    position: "Frontend Developer",
    appliedDate: "May 8, 2024",
    status: "Rejected",
    availability: "June 2024",
    skills: ["Web Development", "UI/UX", "JavaScript", "React", "Node.js"],
  },
  {
    id: "6",
    name: "Casey Kim",
    avatar: "/diverse-group-six.png",
    email: "casey.kim@example.com",
    phone: "+91 9876543215",
    department: "Computer Science",
    batch: "2021-2025",
    cgpa: 9.0,
    backlogs: "None",
    position: "ML Engineer",
    appliedDate: "May 5, 2024",
    status: "Shortlisted",
    availability: "July 2025",
    skills: ["AI/ML", "Python", "Data Analysis", "NLP", "Computer Vision"],
  },
]
