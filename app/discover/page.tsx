import { Search, Filter, ArrowUpRight, Building2, Briefcase, Banknote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { PlacementStats } from "@/components/placement-stats"
import { SharePlacementDialog } from "@/components/share-placement-dialog"

export default function DiscoverPage() {
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
                placeholder="Search placements..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <SharePlacementDialog />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Placement Success Stories</h1>
              <p className="text-muted-foreground">Discover students who secured placements at top companies</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search placements..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <PlacementStats />

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="rounded-full px-4 py-1">
                All Departments
              </Badge>
              <Badge variant="secondary" className="rounded-full px-4 py-1">
                Computer Science
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1">
                Information Technology
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1">
                Electronics
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1">
                Mechanical
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="recent" className="flex-1 md:flex-none">
                Recent Placements
              </TabsTrigger>
              <TabsTrigger value="top" className="flex-1 md:flex-none">
                Top Packages
              </TabsTrigger>
              <TabsTrigger value="dream" className="flex-1 md:flex-none">
                Dream Companies
              </TabsTrigger>
              <TabsTrigger value="international" className="flex-1 md:flex-none">
                International Offers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {placedStudents.map((student) => (
                  <Link
                    key={student.id}
                    href={`/students/${student.id}`}
                    className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                  >
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                          src={student.companyLogo || "/placeholder.svg"}
                          alt={student.companyName}
                          width={800}
                          height={600}
                          className="h-full w-full object-contain p-4"
                        />
                      </div>
                      <Badge
                        className="absolute right-3 top-3"
                        variant={student.offerType === "Full-time" ? "default" : "secondary"}
                      >
                        {student.offerType}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-xs text-muted-foreground">{student.department}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{student.companyName}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{student.role}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Banknote className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-primary">{student.package}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Placed {student.placedDate}</span>
                        <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                          View Details
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {placedStudents
                  .sort((a, b) => {
                    const aPackage = Number.parseInt(a.package.replace(/[^\d]/g, ""))
                    const bPackage = Number.parseInt(b.package.replace(/[^\d]/g, ""))
                    return bPackage - aPackage
                  })
                  .slice(0, 8)
                  .map((student) => (
                    <Link
                      key={student.id}
                      href={`/students/${student.id}`}
                      className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                    >
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <Image
                            src={student.companyLogo || "/placeholder.svg"}
                            alt={student.companyName}
                            width={800}
                            height={600}
                            className="h-full w-full object-contain p-4"
                          />
                        </div>
                        <Badge
                          className="absolute right-3 top-3"
                          variant={student.offerType === "Full-time" ? "default" : "secondary"}
                        >
                          {student.offerType}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-xs text-muted-foreground">{student.department}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{student.companyName}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{student.role}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Banknote className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-primary">{student.package}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Placed {student.placedDate}</span>
                          <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                            View Details
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="dream" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {placedStudents
                  .filter((student) => dreamCompanies.includes(student.companyName))
                  .map((student) => (
                    <Link
                      key={student.id}
                      href={`/students/${student.id}`}
                      className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                    >
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <Image
                            src={student.companyLogo || "/placeholder.svg"}
                            alt={student.companyName}
                            width={800}
                            height={600}
                            className="h-full w-full object-contain p-4"
                          />
                        </div>
                        <Badge
                          className="absolute right-3 top-3"
                          variant={student.offerType === "Full-time" ? "default" : "secondary"}
                        >
                          {student.offerType}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-xs text-muted-foreground">{student.department}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{student.companyName}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{student.role}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Banknote className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-primary">{student.package}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Placed {student.placedDate}</span>
                          <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                            View Details
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="international" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {placedStudents
                  .filter((student) => student.isInternational)
                  .map((student) => (
                    <Link
                      key={student.id}
                      href={`/students/${student.id}`}
                      className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                    >
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <Image
                            src={student.companyLogo || "/placeholder.svg"}
                            alt={student.companyName}
                            width={800}
                            height={600}
                            className="h-full w-full object-contain p-4"
                          />
                        </div>
                        <Badge
                          className="absolute right-3 top-3"
                          variant={student.offerType === "Full-time" ? "default" : "secondary"}
                        >
                          {student.offerType}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-xs text-muted-foreground">{student.department}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{student.companyName}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{student.role}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Banknote className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-primary">{student.package}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Placed {student.placedDate}</span>
                          <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                            View Details
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More</Button>
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

const placedStudents = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/diverse-person.png",
    department: "Computer Science",
    companyName: "Google",
    companyLogo: "/placeholder.svg?height=600&width=800&query=google+logo",
    role: "Software Engineer",
    package: "₹45 LPA",
    offerType: "Full-time",
    placedDate: "2 weeks ago",
    isInternational: true,
  },
  {
    id: "2",
    name: "Jamie Chen",
    avatar: "/diverse-group-two.png",
    department: "Information Technology",
    companyName: "Microsoft",
    companyLogo: "/placeholder.svg?height=600&width=800&query=microsoft+logo",
    role: "Product Manager",
    package: "₹38 LPA",
    offerType: "Full-time",
    placedDate: "3 weeks ago",
    isInternational: false,
  },
  {
    id: "3",
    name: "Sam Wilson",
    avatar: "/diverse-group-outdoors.png",
    department: "Electronics & Communication",
    companyName: "Amazon",
    companyLogo: "/placeholder.svg?height=600&width=800&query=amazon+logo",
    role: "SDE II",
    package: "₹42 LPA",
    offerType: "Full-time",
    placedDate: "1 month ago",
    isInternational: false,
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatar: "/diverse-group-four.png",
    department: "Computer Science",
    companyName: "Apple",
    companyLogo: "/placeholder.svg?height=600&width=800&query=apple+logo",
    role: "iOS Developer",
    package: "₹40 LPA",
    offerType: "Full-time",
    placedDate: "2 months ago",
    isInternational: true,
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/diverse-group-five.png",
    department: "Information Technology",
    companyName: "Netflix",
    companyLogo: "/placeholder.svg?height=600&width=800&query=netflix+logo",
    role: "Full Stack Developer",
    package: "₹36 LPA",
    offerType: "Full-time",
    placedDate: "1 month ago",
    isInternational: false,
  },
  {
    id: "6",
    name: "Casey Kim",
    avatar: "/diverse-group-six.png",
    department: "Computer Science",
    companyName: "Meta",
    companyLogo: "/placeholder.svg?height=600&width=800&query=meta+logo",
    role: "Research Engineer",
    package: "₹44 LPA",
    offerType: "Full-time",
    placedDate: "3 weeks ago",
    isInternational: true,
  },
  {
    id: "7",
    name: "Riley Johnson",
    avatar: "/diverse-group-seven.png",
    department: "Electrical Engineering",
    companyName: "Tesla",
    companyLogo: "/placeholder.svg?height=600&width=800&query=tesla+logo",
    role: "Embedded Systems Engineer",
    package: "₹32 LPA",
    offerType: "Full-time",
    placedDate: "2 months ago",
    isInternational: false,
  },
  {
    id: "8",
    name: "Quinn Parker",
    avatar: "/diverse-group-eight.png",
    department: "Computer Science",
    companyName: "Adobe",
    companyLogo: "/placeholder.svg?height=600&width=800&query=adobe+logo",
    role: "UI/UX Designer",
    package: "₹28 LPA",
    offerType: "Full-time",
    placedDate: "1 month ago",
    isInternational: false,
  },
  {
    id: "9",
    name: "Avery Thompson",
    avatar: "/placeholder.svg?height=40&width=40&query=person+9",
    department: "Information Technology",
    companyName: "Uber",
    companyLogo: "/placeholder.svg?height=600&width=800&query=uber+logo",
    role: "Backend Engineer",
    package: "₹30 LPA",
    offerType: "Full-time",
    placedDate: "3 weeks ago",
    isInternational: false,
  },
  {
    id: "10",
    name: "Morgan Bailey",
    avatar: "/placeholder.svg?height=40&width=40&query=person+10",
    department: "Computer Science",
    companyName: "Goldman Sachs",
    companyLogo: "/placeholder.svg?height=600&width=800&query=goldman+sachs+logo",
    role: "Quantitative Analyst",
    package: "₹35 LPA",
    offerType: "Full-time",
    placedDate: "1 month ago",
    isInternational: false,
  },
  {
    id: "11",
    name: "Drew Garcia",
    avatar: "/placeholder.svg?height=40&width=40&query=person+11",
    department: "Electronics & Communication",
    companyName: "Intel",
    companyLogo: "/placeholder.svg?height=600&width=800&query=intel+logo",
    role: "Hardware Engineer",
    package: "₹26 LPA",
    offerType: "Full-time",
    placedDate: "2 months ago",
    isInternational: false,
  },
  {
    id: "12",
    name: "Cameron Wright",
    avatar: "/placeholder.svg?height=40&width=40&query=person+12",
    department: "Computer Science",
    companyName: "Salesforce",
    companyLogo: "/placeholder.svg?height=600&width=800&query=salesforce+logo",
    role: "Cloud Solutions Engineer",
    package: "₹32 LPA",
    offerType: "Full-time",
    placedDate: "3 weeks ago",
    isInternational: false,
  },
]

const dreamCompanies = ["Google", "Microsoft", "Apple", "Meta", "Amazon", "Netflix"]
