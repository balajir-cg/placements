"use client"

import type React from "react"

import { useState } from "react"
import { Upload, File, Check } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"

export function UploadResumeDialog() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [fileName, setFileName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleUpload = () => {
    if (!fileName) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const resetForm = () => {
    setFileName("")
    setUploadProgress(0)
    setUploadComplete(false)
    setIsUploading(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(resetForm, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Upload className="h-4 w-4" />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
          <DialogDescription>
            Upload your latest resume to showcase your skills and experience to potential employers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!uploadComplete ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="resume-file">Resume File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="resume-file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX. Max size: 5MB</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="resume-title">Resume Title</Label>
                <Input
                  id="resume-title"
                  placeholder="e.g. Software Engineer Resume"
                  disabled={isUploading}
                  defaultValue={fileName ? fileName.split(".")[0] : ""}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="resume-description">Description (Optional)</Label>
                <Textarea
                  id="resume-description"
                  placeholder="Add a brief description of your resume"
                  disabled={isUploading}
                  className="resize-none"
                />
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-medium">Upload Complete</h3>
              <p className="mb-4 text-sm text-muted-foreground">Your resume has been successfully uploaded.</p>
              <div className="flex items-center justify-center gap-3 rounded-lg border p-3 text-left">
                <File className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">{fileName}</p>
                  <p className="text-xs text-muted-foreground">Uploaded on {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          {!uploadComplete ? (
            <>
              <Button variant="outline" onClick={handleClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!fileName || isUploading}>
                {isUploading ? "Uploading..." : "Upload Resume"}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
