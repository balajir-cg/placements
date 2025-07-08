"use client";

import { useEffect, useState } from "react";
import { Search, GraduationCap, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
          [Query.equal("role", "student")]
        );
        setProfiles(response.documents);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
                    <label htmlFor="status-seeking" className.tsx
