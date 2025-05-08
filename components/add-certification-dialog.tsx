"use client"

import type React from "react"

import { useState } from "react"
import { Award, Calendar, ExternalLink } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"

export function AddCertificationDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hasExpiry, setHasExpiry] = useState(false)

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
        <Button>Add New Certification</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Certification</DialogTitle>
          <DialogDescription>
            Add your certifications to showcase your skills and qualifications to potential employers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cert-title">Certification Title</Label>
              <div className="relative">
                <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cert-title"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cert-provider">Issuing Organization</Label>
              <Select>
                <SelectTrigger id="cert-provider">
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">Amazon Web Services</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="coursera">Coursera</SelectItem>
                  <SelectItem value="udemy">Udemy</SelectItem>
                  <SelectItem value="ibm">IBM</SelectItem>
                  <SelectItem value="oracle">Oracle</SelectItem>
                  <SelectItem value="cisco">Cisco</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cert-other-provider">Other Organization</Label>
              <Input id="cert-other-provider" placeholder="Enter organization name if not in the list above" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cert-issue-date">Issue Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="cert-issue-date" type="month" className="pl-10" required />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cert-expiry">Has Expiry Date</Label>
                  <Switch id="cert-expiry" checked={hasExpiry} onCheckedChange={setHasExpiry} />
                </div>
                {hasExpiry && (
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="cert-expiry-date" type="month" className="pl-10" required={hasExpiry} />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cert-credential">Credential ID</Label>
              <Input id="cert-credential" placeholder="e.g. AWS-ASA-12345" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cert-url">Verification URL (Optional)</Label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="cert-url" placeholder="e.g. https://www.credly.com/badges/..." className="pl-10" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cert-image">Certificate Image (Optional)</Label>
              <Input id="cert-image" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Upload an image of your certificate (JPEG, PNG, PDF)</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Certification"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
