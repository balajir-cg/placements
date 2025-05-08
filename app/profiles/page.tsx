import { Search, GraduationCap, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilesPage() {
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
                placeholder="Search profiles..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button>Connect</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Profiles</h1>
              <p className="text-muted-foreground">Connect with fellow students and alumni</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search profiles..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-[250px_1fr]">
            <div className="space-y-6 rounded-lg border p-4">
              <div>
                <h3 className="mb-2 font-medium">Department</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="cs" className="mr-2" />
                    <label htmlFor="cs" className="text-sm">
                      Computer Science
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="it" className="mr-2" />
                    <label htmlFor="it" className="text-sm">
                      Information Technology
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="ece" className="mr-2" />
                    <label htmlFor="ece" className="text-sm">
                      Electronics & Communication
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="eee" className="mr-2" />
                    <label htmlFor="eee" className="text-sm">
                      Electrical Engineering
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mech" className="mr-2" />
                    <label htmlFor="mech" className="text-sm">
                      Mechanical Engineering
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Batch</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="batch-2025" className="mr-2" />
                    <label htmlFor="batch-2025" className="text-sm">
                      2021-2025
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="batch-2024" className="mr-2" />
                    <label htmlFor="batch-2024" className="text-sm">
                      2020-2024
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="batch-2023" className="mr-2" />
                    <label htmlFor="batch-2023" className="text-sm">
                      2019-2023
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="batch-alumni" className="mr-2" />
                    <label htmlFor="batch-alumni" className="text-sm">
                      Alumni
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Skills</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="skill-java" className="mr-2" />
                    <label htmlFor="skill-java" className="text-sm">
                      Java
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="skill-python" className="mr-2" />
                    <label htmlFor="skill-python" className="text-sm">
                      Python
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="skill-react" className="mr-2" />
                    <label htmlFor="skill-react" className="text-sm">
                      React
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="skill-ml" className="mr-2" />
                    <label htmlFor="skill-ml" className="text-sm">
                      Machine Learning
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="skill-design" className="mr-2" />
                    <label htmlFor="skill-design" className="text-sm">
                      UI/UX Design
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Placement Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="status-placed" className="mr-2" />
                    <label htmlFor="status-placed" className="text-sm">
                      Placed
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="status-seeking" className="mr-2" />
                    <label htmlFor="status-seeking" className="text-sm">
                      Seeking Opportunities
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="status-internship" className="mr-2" />
                    <label htmlFor="status-internship" className="text-sm">
                      Internship
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing 48 profiles</p>
                <div className="flex items-center gap-2">
                  <Select defaultValue="relevant">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevant">Most Relevant</SelectItem>
                      <SelectItem value="recent">Recently Active</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((profile) => (
                  <Link href={`/profiles/${profile.id}`} key={profile.id}>
                    <Card className="h-full hover:border-primary/50 hover:shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="mt-4 text-lg font-semibold">{profile.name}</h3>
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <GraduationCap className="h-4 w-4" />
                            <span>{profile.department}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{profile.location}</span>
                          </div>
                          {profile.company && (
                            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                              <Briefcase className="h-4 w-4" />
                              <span>
                                {profile.role} at {profile.company}
                              </span>
                            </div>
                          )}
                          <Badge
                            className="mt-3"
                            variant={
                              profile.status === "Placed"
                                ? "default"
                                : profile.status === "Internship"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {profile.status}
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <p className="line-clamp-2 text-center text-sm text-muted-foreground">{profile.bio}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {profile.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                          {profile.skills.length > 3 && (
                            <Badge variant="outline" className="font-normal">
                              +{profile.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <Button className="mt-4 w-full" variant="outline">
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Profiles</Button>
              </div>
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

const profiles = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/diverse-person.png",
    department: "Computer Science",
    location: "Bangalore, India",
    company: "Google",
    role: "Software Engineer",
    status: "Placed",
    bio: "Passionate about building scalable web applications and solving complex problems. Interested in AI and machine learning.",
    skills: ["Java", "React", "Node.js", "Python", "AWS"],
  },
  {
    id: "2",
    name: "Jamie Chen",
    avatar: "/diverse-group-two.png",
    department: "Information Technology",
    location: "Mumbai, India",
    company: "Microsoft",
    role: "Product Manager",
    status: "Placed",
    bio: "Product enthusiast with a keen eye for user experience. Experienced in leading cross-functional teams and delivering impactful products.",
    skills: ["Product Management", "UX Research", "Agile", "Data Analysis"],
  },
  {
    id: "3",
    name: "Sam Wilson",
    avatar: "/diverse-group-outdoors.png",
    department: "Electronics & Communication",
    location: "Delhi, India",
    company: "Amazon",
    role: "SDE II",
    status: "Placed",
    bio: "Full-stack developer with a passion for building robust and scalable applications. Experienced in cloud technologies and microservices.",
    skills: ["JavaScript", "AWS", "Microservices", "System Design", "MongoDB"],
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatar: "/diverse-group-four.png",
    department: "Computer Science",
    location: "Hyderabad, India",
    company: null,
    role: null,
    status: "Seeking Opportunities",
    bio: "Final year student with strong programming skills and a passion for mobile app development. Looking for opportunities in software development.",
    skills: ["Swift", "Kotlin", "Flutter", "Firebase", "UI/UX"],
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/diverse-group-five.png",
    department: "Information Technology",
    location: "Pune, India",
    company: "Netflix",
    role: "Intern",
    status: "Internship",
    bio: "Currently interning as a software developer. Passionate about web technologies and open-source contributions.",
    skills: ["React", "TypeScript", "GraphQL", "Next.js", "Tailwind CSS"],
  },
  {
    id: "6",
    name: "Casey Kim",
    avatar: "/diverse-group-six.png",
    department: "Computer Science",
    location: "Chennai, India",
    company: null,
    role: null,
    status: "Seeking Opportunities",
    bio: "Machine learning enthusiast with experience in computer vision and natural language processing. Looking for research opportunities.",
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
  },
]
