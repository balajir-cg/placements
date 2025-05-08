import { Search, Download, ExternalLink, FileText, GraduationCap, Award, Code, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { AddAcademicInfoDialog } from "@/components/add-academic-info-dialog"
import { UploadResumeDialog } from "@/components/upload-resume-dialog"
import { AddProjectDialog } from "@/components/add-project-dialog"
import { AddCertificationDialog } from "@/components/add-certification-dialog"

export default function AcademicsPage() {
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
                placeholder="Search academics..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <AddAcademicInfoDialog />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Academic Profile</h1>
              <p className="text-muted-foreground">Manage your academic information, resume, and portfolio</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search academics..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6 w-full md:w-auto">
                  <TabsTrigger value="overview" className="flex-1 md:flex-none">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="resume" className="flex-1 md:flex-none">
                    Resume
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex-1 md:flex-none">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="certifications" className="flex-1 md:flex-none">
                    Certifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Department</p>
                          <p>Computer Science & Engineering</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Batch</p>
                          <p>2021-2025</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Current Semester</p>
                          <p>6th Semester</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Current CGPA</p>
                          <p>8.7/10.0</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Rank</p>
                          <p>12 / 180 students</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                          <p>92%</p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">Semester-wise Performance</p>
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm">Semester 1</p>
                              <p className="text-sm font-medium">8.5</p>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm">Semester 2</p>
                              <p className="text-sm font-medium">8.7</p>
                            </div>
                            <Progress value={87} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm">Semester 3</p>
                              <p className="text-sm font-medium">9.1</p>
                            </div>
                            <Progress value={91} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm">Semester 4</p>
                              <p className="text-sm font-medium">8.9</p>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm">Semester 5</p>
                              <p className="text-sm font-medium">8.4</p>
                            </div>
                            <Progress value={84} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Proficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="mb-2 text-sm font-medium">Programming Languages</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="px-3 py-1">Java</Badge>
                            <Badge className="px-3 py-1">Python</Badge>
                            <Badge className="px-3 py-1">JavaScript</Badge>
                            <Badge className="px-3 py-1">C++</Badge>
                            <Badge variant="outline" className="px-3 py-1">
                              Go
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-medium">Frameworks & Libraries</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="px-3 py-1">React</Badge>
                            <Badge className="px-3 py-1">Node.js</Badge>
                            <Badge className="px-3 py-1">Spring Boot</Badge>
                            <Badge variant="outline" className="px-3 py-1">
                              TensorFlow
                            </Badge>
                            <Badge variant="outline" className="px-3 py-1">
                              Django
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-medium">Tools & Technologies</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="px-3 py-1">Git</Badge>
                            <Badge className="px-3 py-1">Docker</Badge>
                            <Badge className="px-3 py-1">AWS</Badge>
                            <Badge className="px-3 py-1">MongoDB</Badge>
                            <Badge variant="outline" className="px-3 py-1">
                              Kubernetes
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-sm font-medium">Soft Skills</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="px-3 py-1">Team Leadership</Badge>
                            <Badge className="px-3 py-1">Problem Solving</Badge>
                            <Badge className="px-3 py-1">Communication</Badge>
                            <Badge className="px-3 py-1">Time Management</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements & Awards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Dean's List Award</h3>
                            <p className="text-sm text-muted-foreground">
                              Awarded for academic excellence in 3rd semester
                            </p>
                            <p className="text-xs text-muted-foreground">December 2022</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Code className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Hackathon Winner</h3>
                            <p className="text-sm text-muted-foreground">
                              First place at the National Coding Championship
                            </p>
                            <p className="text-xs text-muted-foreground">March 2023</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Merit Scholarship</h3>
                            <p className="text-sm text-muted-foreground">
                              Received for being in the top 5% of the class
                            </p>
                            <p className="text-xs text-muted-foreground">August 2023</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resume" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Resume</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <UploadResumeDialog />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border bg-muted/40 p-4">
                        <div className="aspect-[1/1.4] w-full overflow-hidden rounded border bg-white shadow-sm sm:aspect-[1/1.3]">
                          <Image
                            src="/placeholder.svg?height=800&width=600&query=resume+template"
                            alt="Resume preview"
                            width={600}
                            height={800}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">Resume Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span>May 10, 2024</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Format</span>
                            <span>PDF</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size</span>
                            <span>420 KB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ATS Compatibility</span>
                            <span className="text-green-600">High</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="mb-2 font-medium">Resume Tips</h3>
                        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                          <li>Use action verbs to describe your experiences</li>
                          <li>Quantify your achievements with numbers when possible</li>
                          <li>Tailor your resume for each job application</li>
                          <li>Keep your resume to one page for entry-level positions</li>
                          <li>Proofread carefully to avoid typos and grammatical errors</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Resume Versions</CardTitle>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Version
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Software_Engineer_Resume.pdf</p>
                              <p className="text-sm text-muted-foreground">Updated May 10, 2024</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Data_Science_Resume.pdf</p>
                              <p className="text-sm text-muted-foreground">Updated April 22, 2024</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Product_Management_Resume.pdf</p>
                              <p className="text-sm text-muted-foreground">Updated March 15, 2024</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Projects</h2>
                    <AddProjectDialog />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {projects.map((project, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                          <p className="mb-4 text-muted-foreground">{project.description}</p>
                          <div className="mb-4 flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="font-normal">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{project.duration}</p>
                            <div className="flex gap-2">
                              {project.githubUrl && (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Code className="mr-2 h-4 w-4" />
                                    Code
                                  </Link>
                                </Button>
                              )}
                              {project.demoUrl && (
                                <Button size="sm" asChild>
                                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Demo
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 px-6 py-3">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="certifications" className="mt-0">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Certifications</h2>
                    <AddCertificationDialog />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((cert, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.title}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline">{cert.provider}</Badge>
                            <Badge variant={cert.verified ? "default" : "secondary"}>
                              {cert.verified ? "Verified" : "In Progress"}
                            </Badge>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold">{cert.title}</h3>
                          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{cert.date}</span>
                            {cert.expiryDate && (
                              <>
                                <span>•</span>
                                <span>Expires: {cert.expiryDate}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Credential ID: {cert.credentialId}</p>
                            {cert.url && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Verify
                                </Link>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 px-6 py-3">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/diverse-person.png" alt="Alex Morgan" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-xl font-semibold">Alex Morgan</h3>
                  <p className="text-muted-foreground">Computer Science & Engineering</p>
                  <p className="text-sm text-muted-foreground">2021-2025 Batch</p>

                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Profile Completion</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="mt-2" />
                  </div>

                  <Button className="mt-6 w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Placement Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="font-medium">Placed</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Offer received from Google</p>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company</span>
                      <span className="font-medium">Google</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span>Software Engineer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package</span>
                      <span className="font-medium text-primary">₹45 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joining Date</span>
                      <span>July 2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <p className="font-medium">Resume Workshop</p>
                      <p className="text-sm text-muted-foreground">Learn how to create an ATS-friendly resume</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">May 25, 2024 • 2:00 PM</span>
                        <Badge variant="outline">Virtual</Badge>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <p className="font-medium">Microsoft Info Session</p>
                      <p className="text-sm text-muted-foreground">Learn about career opportunities at Microsoft</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">May 28, 2024 • 11:00 AM</span>
                        <Badge variant="outline">In-person</Badge>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <p className="font-medium">Mock Interview Session</p>
                      <p className="text-sm text-muted-foreground">Practice technical interviews with alumni</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">June 2, 2024 • 10:00 AM</span>
                        <Badge variant="outline">Hybrid</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

const projects = [
  {
    title: "Smart Campus Navigation System",
    description:
      "A mobile application that helps students navigate around campus, find classrooms, and check facility availability in real-time.",
    image: "/placeholder.svg?height=400&width=600&query=mobile+app+ui",
    technologies: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
    duration: "Jan 2023 - Apr 2023",
    githubUrl: "https://github.com/username/smart-campus",
    demoUrl: "https://demo-smart-campus.vercel.app",
  },
  {
    title: "AI-Powered Study Assistant",
    description:
      "An AI-powered web application that helps students organize study materials, create flashcards, and generate practice questions.",
    image: "/placeholder.svg?height=400&width=600&query=ai+study+app",
    technologies: ["Python", "Flask", "TensorFlow", "React", "PostgreSQL"],
    duration: "Aug 2023 - Dec 2023",
    githubUrl: "https://github.com/username/study-assistant",
    demoUrl: null,
  },
  {
    title: "Blockchain-based Certificate Verification",
    description:
      "A system that uses blockchain technology to issue and verify academic certificates, preventing forgery and simplifying verification.",
    image: "/placeholder.svg?height=400&width=600&query=blockchain+certificate",
    technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
    duration: "Feb 2024 - Present",
    githubUrl: "https://github.com/username/cert-chain",
    demoUrl: "https://cert-chain-demo.vercel.app",
  },
  {
    title: "Collaborative Research Platform",
    description:
      "A platform that connects students with research opportunities and facilitates collaboration between students and faculty.",
    image: "/placeholder.svg?height=400&width=600&query=research+collaboration",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
    duration: "Oct 2022 - Mar 2023",
    githubUrl: "https://github.com/username/research-connect",
    demoUrl: "https://research-connect-demo.vercel.app",
  },
]

const certifications = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    provider: "Amazon Web Services",
    date: "April 2024",
    expiryDate: "April 2027",
    credentialId: "AWS-ASA-12345",
    verified: true,
    image: "/placeholder.svg?height=400&width=600&query=aws+certification",
    url: "https://aws.amazon.com/verification",
  },
  {
    title: "Machine Learning Specialization",
    provider: "Coursera",
    date: "January 2024",
    expiryDate: null,
    credentialId: "COURSERA-ML-67890",
    verified: true,
    image: "/placeholder.svg?height=400&width=600&query=machine+learning+certificate",
    url: "https://coursera.org/verify",
  },
  {
    title: "React Developer Certification",
    provider: "Meta",
    date: "November 2023",
    expiryDate: null,
    credentialId: "META-REACT-54321",
    verified: true,
    image: "/placeholder.svg?height=400&width=600&query=react+certificate",
    url: "https://meta.com/verify",
  },
  {
    title: "Google Cloud Professional Data Engineer",
    provider: "Google Cloud",
    date: "In Progress",
    expiryDate: null,
    credentialId: "N/A",
    verified: false,
    image: "/placeholder.svg?height=400&width=600&query=google+cloud+certificate",
    url: null,
  },
  {
    title: "Cybersecurity Fundamentals",
    provider: "IBM",
    date: "August 2023",
    expiryDate: null,
    credentialId: "IBM-CYBER-13579",
    verified: true,
    image: "/placeholder.svg?height=400&width=600&query=cybersecurity+certificate",
    url: "https://ibm.com/verify",
  },
  {
    title: "Agile Project Management",
    provider: "Atlassian",
    date: "May 2023",
    expiryDate: null,
    credentialId: "ATLASSIAN-APM-24680",
    verified: true,
    image: "/placeholder.svg?height=400&width=600&query=agile+certificate",
    url: "https://atlassian.com/verify",
  },
]

import { Check, Calendar } from "lucide-react"
