"use client"

import type React from "react"

import { useState } from "react"
import { Github, ExternalLink } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddProjectDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        <Button>Add New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Showcase your projects to demonstrate your skills and experience to potential employers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input id="project-title" placeholder="e.g. Smart Campus Navigation System" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project, its purpose, and your role in it"
                className="min-h-[100px] resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project-start-date">Start Date</Label>
                <Input id="project-start-date" type="month" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-end-date">End Date</Label>
                <Input id="project-end-date" type="month" />
                <p className="text-xs text-muted-foreground">Leave empty if ongoing</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic Project</SelectItem>
                  <SelectItem value="personal">Personal Project</SelectItem>
                  <SelectItem value="internship">Internship Project</SelectItem>
                  <SelectItem value="hackathon">Hackathon Project</SelectItem>
                  <SelectItem value="research">Research Project</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-technologies">Technologies Used</Label>
              <Input id="project-technologies" placeholder="e.g. React, Node.js, MongoDB, Express" required />
              <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-image">Project Image (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input id="project-image" type="file" accept="image/*" className="flex-1" />
              </div>
              <p className="text-xs text-muted-foreground">Upload a screenshot or image representing your project</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-github">GitHub Repository URL (Optional)</Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="project-github" placeholder="https://github.com/username/project" className="pl-10" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-live">Live Demo URL (Optional)</Label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="project-live" placeholder="https://your-project-demo.com" className="pl-10" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
