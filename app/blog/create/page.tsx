"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save, ImageIcon, LinkIcon, List, ListOrdered, Bold, Italic } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function CreateBlogPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [preview, setPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      window.location.href = "/blog"
    }, 1500)
  }

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    const newText = beforeText + prefix + selectedText + suffix + afterText
    setContent(newText)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + prefix.length
      textarea.selectionEnd = start + prefix.length + selectedText.length
    }, 0)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="preview-mode" checked={preview} onCheckedChange={setPreview} />
                <Label htmlFor="preview-mode">Preview</Label>
              </div>
              <Button type="submit" form="blog-form" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>

          <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your blog title..."
                className="border-none bg-transparent text-3xl font-bold shadow-none focus-visible:ring-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 font-normal">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Select onValueChange={handleAddTag}>
                  <SelectTrigger className="h-7 w-[180px] border-dashed">
                    <SelectValue placeholder="Add tags..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Placement Experience">Placement Experience</SelectItem>
                    <SelectItem value="Interview Tips">Interview Tips</SelectItem>
                    <SelectItem value="Resume Building">Resume Building</SelectItem>
                    <SelectItem value="Internships">Internships</SelectItem>
                    <SelectItem value="Career Advice">Career Advice</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center gap-1 border-b bg-muted/40 px-2 py-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertMarkdown("**", "**")}
                >
                  <Bold className="h-4 w-4" />
                  <span className="sr-only">Bold</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertMarkdown("*", "*")}
                >
                  <Italic className="h-4 w-4" />
                  <span className="sr-only">Italic</span>
                </Button>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertMarkdown("\n- ")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">Bullet List</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertMarkdown("\n1. ")}
                >
                  <ListOrdered className="h-4 w-4" />
                  <span className="sr-only">Numbered List</span>
                </Button>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertMarkdown("![Alt text](", ")")}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="sr-only">Image</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertMarkdown("[", "](https://)")}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span className="sr-only">Link</span>
                </Button>
              </div>

              <Tabs defaultValue="write" value={preview ? "preview" : "write"}>
                <TabsList className="hidden">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-0">
                  <Textarea
                    id="content"
                    placeholder="Write your blog post content here... (Markdown supported)"
                    className="min-h-[500px] resize-none rounded-none border-0 p-4 shadow-none focus-visible:ring-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-0">
                  <div className="prose prose-sm max-w-none p-4 dark:prose-invert md:prose-base lg:prose-lg">
                    {content ? (
                      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
                    ) : (
                      <p className="text-muted-foreground">Nothing to preview yet...</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/blog">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </form>
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

// Simple markdown to HTML converter for preview
function markdownToHtml(markdown: string): string {
  const html = markdown
    // Headers
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold and Italic
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    // Links and Images
    .replace(/!\[(.*?)\]$$(.*?)$$/gim, '<img alt="$1" src="$2" />')
    .replace(/\[(.*?)\]$$(.*?)$$/gim, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\s*\d+\.\s+(.*$)/gim, "<li>$1</li>")
    .replace(/^\s*[-*]\s+(.*$)/gim, "<li>$1</li>")
    // Paragraphs
    .replace(/^(?!<h|<li|<ul|<ol|<p)(.*$)/gim, "<p>$1</p>")

  return html
}
