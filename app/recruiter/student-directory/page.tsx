import { Search, Filter, Download, GraduationCap, MapPin, Star, ChevronDown } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function StudentDirectoryPage() {
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
                placeholder="Search students..."
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
              <h1 className="text-3xl font-bold tracking-tight">Student Directory</h1>
              <p className="text-muted-foreground">Find and connect with qualified candidates for your organization</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search students..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <TabsList>
                <TabsTrigger value="all">All Students</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="contacted">Contacted</TabsTrigger>
                <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Filter Students</DialogTitle>
                      <DialogDescription>
                        Refine your search based on academic metrics and other criteria
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="academics">
                          <AccordionTrigger>Academic Metrics</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label htmlFor="cgpa-range">CGPA Range</Label>
                                  <span className="text-sm">7.0 - 10.0</span>
                                </div>
                                <Slider defaultValue={[7, 10]} min={0} max={10} step={0.1} id="cgpa-range" />
                              </div>
                              <div className="space-y-2">
                                <Label>Department</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    "Computer Science",
                                    "Information Technology",
                                    "Electronics & Communication",
                                    "Electrical Engineering",
                                    "Mechanical Engineering",
                                    "Civil Engineering",
                                  ].map((dept) => (
                                    <div key={dept} className="flex items-center space-x-2">
                                      <Checkbox id={`dept-${dept}`} />
                                      <Label htmlFor={`dept-${dept}`} className="text-sm font-normal">
                                        {dept}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Batch</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {["2021-2025", "2020-2024", "2019-2023", "2018-2022"].map((batch) => (
                                    <div key={batch} className="flex items-center space-x-2">
                                      <Checkbox id={`batch-${batch}`} />
                                      <Label htmlFor={`batch-${batch}`} className="text-sm font-normal">
                                        {batch}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Backlogs</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {["No Backlogs", "≤ 1 Backlog", "≤ 2 Backlogs", "Any"].map((backlog) => (
                                    <div key={backlog} className="flex items-center space-x-2">
                                      <Checkbox id={`backlog-${backlog}`} />
                                      <Label htmlFor={`backlog-${backlog}`} className="text-sm font-normal">
                                        {backlog}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="skills">
                          <AccordionTrigger>Skills & Competencies</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Technical Skills</Label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    "Java",
                                    "Python",
                                    "JavaScript",
                                    "React",
                                    "Node.js",
                                    "Angular",
                                    "C++",
                                    "Machine Learning",
                                    "Data Science",
                                    "Cloud Computing",
                                    "DevOps",
                                    "Blockchain",
                                  ].map((skill) => (
                                    <div key={skill} className="flex items-center space-x-2">
                                      <Checkbox id={`skill-${skill}`} />
                                      <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                                        {skill}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Certifications</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    "AWS Certified",
                                    "Microsoft Certified",
                                    "Google Cloud",
                                    "Oracle Certified",
                                    "Cisco Certified",
                                    "CompTIA",
                                  ].map((cert) => (
                                    <div key={cert} className="flex items-center space-x-2">
                                      <Checkbox id={`cert-${cert}`} />
                                      <Label htmlFor={`cert-${cert}`} className="text-sm font-normal">
                                        {cert}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="experience">
                          <AccordionTrigger>Experience & Projects</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Internship Experience</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {["Any Experience", "≥ 1 Internship", "≥ 2 Internships", "No Experience"].map(
                                    (exp) => (
                                      <div key={exp} className="flex items-center space-x-2">
                                        <Checkbox id={`exp-${exp}`} />
                                        <Label htmlFor={`exp-${exp}`} className="text-sm font-normal">
                                          {exp}
                                        </Label>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Projects</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {["Any Projects", "≥ 3 Projects", "≥ 5 Projects", "Research Projects"].map((proj) => (
                                    <div key={proj} className="flex items-center space-x-2">
                                      <Checkbox id={`proj-${proj}`} />
                                      <Label htmlFor={`proj-${proj}`} className="text-sm font-normal">
                                        {proj}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="availability">
                          <AccordionTrigger>Availability & Preferences</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Joining Availability</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {["Immediate", "Within 1 Month", "Within 3 Months", "After Graduation"].map(
                                    (avail) => (
                                      <div key={avail} className="flex items-center space-x-2">
                                        <Checkbox id={`avail-${avail}`} />
                                        <Label htmlFor={`avail-${avail}`} className="text-sm font-normal">
                                          {avail}
                                        </Label>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Preferred Locations</Label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    "Bangalore",
                                    "Mumbai",
                                    "Delhi NCR",
                                    "Hyderabad",
                                    "Chennai",
                                    "Pune",
                                    "Kolkata",
                                    "Remote",
                                    "Any Location",
                                  ].map((loc) => (
                                    <div key={loc} className="flex items-center space-x-2">
                                      <Checkbox id={`loc-${loc}`} />
                                      <Label htmlFor={`loc-${loc}`} className="text-sm font-normal">
                                        {loc}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline">Reset Filters</Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Sort By
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>CGPA (High to Low)</DropdownMenuItem>
                    <DropdownMenuItem>CGPA (Low to High)</DropdownMenuItem>
                    <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                    <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                    <DropdownMenuItem>Department</DropdownMenuItem>
                    <DropdownMenuItem>Batch (Newest First)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                  <Card key={student.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <GraduationCap className="h-3.5 w-3.5" />
                              <span>{student.department}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{student.location}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">CGPA</span>
                          <span className="font-medium">{student.cgpa}/10</span>
                        </div>
                        <Progress value={student.cgpa * 10} className="h-1.5" />
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium">Key Skills</h4>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {student.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                          {student.skills.length > 4 && (
                            <Badge variant="outline" className="font-normal">
                              +{student.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium">Academic Highlights</h4>
                        <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                          {student.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 border-t bg-muted/50 px-6 py-3">
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                      <Button size="sm" className="w-full">
                        Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>

            <TabsContent value="shortlisted" className="mt-6">
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No Shortlisted Students</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't shortlisted any students yet. Browse the directory and star profiles to add them here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="contacted" className="mt-6">
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No Contacted Students</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't contacted any students yet. Use the contact button to reach out to potential candidates.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="interviewed" className="mt-6">
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No Interviewed Students</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't marked any students as interviewed. Update candidate status after conducting interviews.
                </p>
              </div>
            </TabsContent>
          </Tabs>
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

const students = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/diverse-person.png",
    department: "Computer Science",
    batch: "2021-2025",
    location: "Bangalore, India",
    cgpa: 9.2,
    skills: ["Java", "React", "Node.js", "Python", "AWS"],
    highlights: ["Dean's List Award", "Research Publication", "No Backlogs"],
  },
  {
    id: "2",
    name: "Jamie Chen",
    avatar: "/diverse-group-two.png",
    department: "Information Technology",
    batch: "2021-2025",
    location: "Mumbai, India",
    cgpa: 8.7,
    skills: ["Python", "Machine Learning", "Data Science", "SQL", "TensorFlow"],
    highlights: ["Hackathon Winner", "Research Assistant", "1 Internship"],
  },
  {
    id: "3",
    name: "Sam Wilson",
    avatar: "/diverse-group-outdoors.png",
    department: "Electronics & Communication",
    batch: "2020-2024",
    location: "Delhi, India",
    cgpa: 8.9,
    skills: ["VLSI", "Embedded Systems", "IoT", "C++", "PCB Design"],
    highlights: ["Technical Paper Publication", "Project Lead", "No Backlogs"],
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatar: "/diverse-group-four.png",
    department: "Computer Science",
    batch: "2021-2025",
    location: "Hyderabad, India",
    cgpa: 9.5,
    skills: ["Algorithms", "System Design", "Java", "C++", "Cloud Computing"],
    highlights: ["Gold Medalist", "Competitive Programming", "Research Intern"],
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/diverse-group-five.png",
    department: "Information Technology",
    batch: "2020-2024",
    location: "Pune, India",
    cgpa: 8.3,
    skills: ["Web Development", "UI/UX", "JavaScript", "React", "Node.js"],
    highlights: ["2 Internships", "Open Source Contributor", "Web Dev Lead"],
  },
  {
    id: "6",
    name: "Casey Kim",
    avatar: "/diverse-group-six.png",
    department: "Computer Science",
    batch: "2021-2025",
    location: "Chennai, India",
    cgpa: 9.0,
    skills: ["AI/ML", "Python", "Data Analysis", "NLP", "Computer Vision"],
    highlights: ["Research Publication", "ML Competition Winner", "No Backlogs"],
  },
]
