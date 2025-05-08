"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Briefcase, Banknote, Calendar, Upload } from "lucide-react"

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

export function SharePlacementDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
        <Button>Share Your Placement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Share Your Placement Success</DialogTitle>
          <DialogDescription>
            Congratulations on your placement! Share your success story to inspire other students.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="company" placeholder="e.g. Google" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Job Role</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="role" placeholder="e.g. Software Engineer" className="pl-10" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package">Package (LPA)</Label>
              <div className="relative">
                <Banknote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="package" placeholder="e.g. 18.5" type="number" step="0.1" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="offer-type">Offer Type</Label>
              <Select required>
                <SelectTrigger id="offer-type">
                  <SelectValue placeholder="Select offer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placement-date">Placement Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="placement-date" type="date" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select required>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="on-site">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-logo">Company Logo</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Upload className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="company-logo" type="file" accept="image/*" className="pl-10" />
                </div>
              </div>
              <div className="h-16 w-16 rounded-md border bg-muted"></div>
            </div>
            <p className="text-xs text-muted-foreground">Upload a company logo (optional). Max size: 2MB.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Share Your Experience</Label>
            <Textarea
              id="experience"
              placeholder="Tell us about your interview experience, preparation strategy, and any advice for other students..."
              className="min-h-[120px]"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
