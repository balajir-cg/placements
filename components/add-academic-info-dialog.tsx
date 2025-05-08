"use client"

import type React from "react"

import { useState } from "react"
import { GraduationCap, Book, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AddAcademicInfoDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsOpen(false)
      // You would typically show a success notification here
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Academic Information</DialogTitle>
          <DialogDescription>
            Keep your academic profile up to date to showcase your achievements to potential employers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="cs">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="eee">Electrical Engineering</SelectItem>
                      <SelectItem value="mech">Mechanical Engineering</SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="batch" placeholder="e.g. 2021-2025" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-semester">Current Semester</Label>
                  <Select defaultValue="6">
                    <SelectTrigger id="current-semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Semester</SelectItem>
                      <SelectItem value="2">2nd Semester</SelectItem>
                      <SelectItem value="3">3rd Semester</SelectItem>
                      <SelectItem value="4">4th Semester</SelectItem>
                      <SelectItem value="5">5th Semester</SelectItem>
                      <SelectItem value="6">6th Semester</SelectItem>
                      <SelectItem value="7">7th Semester</SelectItem>
                      <SelectItem value="8">8th Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roll-number">Roll Number</Label>
                  <div className="relative">
                    <Book className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="roll-number" placeholder="e.g. CS21001" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setActiveTab("grades")}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="grades" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-cgpa">Current CGPA</Label>
                <Input id="current-cgpa" type="number" step="0.01" min="0" max="10" placeholder="e.g. 8.7" />
              </div>

              <div className="space-y-2">
                <Label>Semester-wise GPA</Label>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((semester) => (
                    <div key={semester} className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Semester {semester}</span>
                      </div>
                      <Input type="number" step="0.01" min="0" max="10" placeholder={`Semester ${semester} GPA`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("skills")}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Programming Languages</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["Java", "Python", "JavaScript", "C++", "Go", "Ruby"].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <input type="checkbox" id={`lang-${lang}`} className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor={`lang-${lang}`} className="text-sm font-normal">
                        {lang}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Frameworks & Libraries</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["React", "Node.js", "Spring Boot", "TensorFlow", "Django", "Angular"].map((framework) => (
                    <div key={framework} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`framework-${framework}`}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`framework-${framework}`} className="text-sm font-normal">
                        {framework}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tools & Technologies</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["Git", "Docker", "AWS", "MongoDB", "Kubernetes", "SQL"].map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <input type="checkbox" id={`tool-${tool}`} className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor={`tool-${tool}`} className="text-sm font-normal">
                        {tool}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("grades")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("achievements")}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="achievement-1">Achievement 1</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3">
                      <Input id="achievement-1" placeholder="e.g. Dean's List Award" />
                    </div>
                    <div>
                      <Input type="month" />
                    </div>
                  </div>
                  <Input placeholder="Brief description of the achievement" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievement-2">Achievement 2</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3">
                      <Input id="achievement-2" placeholder="e.g. Hackathon Winner" />
                    </div>
                    <div>
                      <Input type="month" />
                    </div>
                  </div>
                  <Input placeholder="Brief description of the achievement" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievement-3">Achievement 3</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3">
                      <Input id="achievement-3" placeholder="e.g. Merit Scholarship" />
                    </div>
                    <div>
                      <Input type="month" />
                    </div>
                  </div>
                  <Input placeholder="Brief description of the achievement" />
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("skills")}>
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
        <DialogFooter className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">All fields are optional unless required by your institution.</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
