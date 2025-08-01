"use client";

import { useEffect, useState } from "react";
import { Search, Briefcase, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { databases } from "@/lib/appwrite";
import { useRole } from "@/hooks/use-role";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddJobDialog } from "@/components/add-job-dialog"

export default function JobsPage() {
  const { role, loading: roleLoading } = useRole();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID!
        );
        setJobs(response.documents);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (role === 'admin') {
      fetchJobs();
    }
  }, [role]);

  if (roleLoading || loading) {
    return <div>Loading...</div>;
  }

  if (role !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search jobs..." className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]" />
            </div>
            <AddJobDialog />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Job Opportunities</h1>
              <p className="text-muted-foreground">Explore job openings and internships from top companies</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search jobs..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-[250px_1fr]">
            <div className="space-y-6 rounded-lg border p-4">
              <div>
                <h3 className="mb-2 font-medium">Job Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="full-time" className="mr-2" />
                    <label htmlFor="full-time" className="text-sm">
                      Full-time
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="part-time" className="mr-2" />
                    <label htmlFor="part-time" className="text-sm">
                      Part-time
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="contract" className="mr-2" />
                    <label htmlFor="contract" className="text-sm">
                      Contract
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="internship" className="mr-2" />
                    <label htmlFor="internship" className="text-sm">
                      Internship
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Location</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="remote" className="mr-2" />
                    <label htmlFor="remote" className="text-sm">
                      Remote
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="hybrid" className="mr-2" />
                    <label htmlFor="hybrid" className="text-sm">
                      Hybrid
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="on-site" className="mr-2" />
                    <label htmlFor="on-site" className="text-sm">
                      On-site
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Experience Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="entry" className="mr-2" />
                    <label htmlFor="entry" className="text-sm">
                      Entry Level
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mid" className="mr-2" />
                    <label htmlFor="mid" className="text-sm">
                      Mid Level
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="senior" className="mr-2" />
                    <label htmlFor="senior" className="text-sm">
                      Senior Level
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Salary Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="range1" className="mr-2" />
                    <label htmlFor="range1" className="text-sm">
                      ₹0 - ₹5 LPA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="range2" className="mr-2" />
                    <label htmlFor="range2" className="text-sm">
                      ₹5 - ₹10 LPA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="range3" className="mr-2" />
                    <label htmlFor="range3" className="text-sm">
                      ₹10 - ₹20 LPA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="range4" className="mr-2" />
                    <label htmlFor="range4" className="text-sm">
                      ₹20+ LPA
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing {jobs.length} jobs</p>
                <div className="flex items-center gap-2">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="relevant">Most Relevant</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <Link href={`/jobs/${job.$id}`} key={job.$id}>
                    <Card className="hover:border-primary/50 hover:shadow-sm">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.companyName} />
                            <AvatarFallback>{job.companyName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.companyName}</p>
                          </div>
                        </div>
                        <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.level}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm">{job.description}</p>
                      </CardContent>
                      <CardContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Jobs</Button>
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
