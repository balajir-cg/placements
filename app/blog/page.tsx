import { Search, Filter, Calendar, Clock, ArrowUpRight, PenLine } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function BlogPage() {
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
                placeholder="Search blog posts..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button asChild>
              <Link href="/blog/create">
                <PenLine className="mr-2 h-4 w-4" />
                Write a Post
              </Link>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Blog</h1>
              <p className="text-muted-foreground">Insights, experiences, and advice from students for students</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search blog posts..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="rounded-full px-4 py-1">
                All Topics
              </Badge>
              <Badge variant="secondary" className="rounded-full px-4 py-1">
                Placement Experiences
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1">
                Interview Tips
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1">
                Resume Building
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-1">
                Internships
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="trending" className="flex-1 md:flex-none">
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex-1 md:flex-none">
                Recent
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex-1 md:flex-none">
                Featured
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1 md:flex-none">
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="mb-2 text-xl font-semibold tracking-tight">{post.title}</h2>
                      <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{post.publishedAt}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{post.readTime} min read</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                          Read
                          <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts
                  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                  .map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="mb-2 text-xl font-semibold tracking-tight">{post.title}</h2>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{post.author.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{post.publishedAt}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.readTime} min read</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                            Read
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts
                  .filter((post) => post.featured)
                  .map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="mb-2 text-xl font-semibold tracking-tight">{post.title}</h2>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{post.author.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{post.publishedAt}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.readTime} min read</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                            Read
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts
                  .filter((post) => post.author.following)
                  .map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="mb-2 text-xl font-semibold tracking-tight">{post.title}</h2>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{post.author.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{post.publishedAt}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.readTime} min read</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1 p-0 text-xs text-primary">
                            Read
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
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

const blogPosts = [
  {
    id: "1",
    title: "How I Cracked My Google Interview: A Step-by-Step Guide",
    excerpt:
      "From preparation strategies to the final rounds, here's my complete journey to securing a software engineering role at Google.",
    coverImage: "/placeholder.svg?height=400&width=600&query=coding+interview",
    tags: ["Interview Experience", "Google", "Tech"],
    author: {
      name: "Alex Morgan",
      avatar: "/diverse-person.png",
      following: true,
    },
    publishedAt: "May 15, 2024",
    readTime: 8,
    featured: true,
  },
  {
    id: "2",
    title: "5 Resume Mistakes That Cost Me Job Opportunities",
    excerpt:
      "Learn from my mistakes and avoid these common resume pitfalls that can significantly impact your chances of landing interviews.",
    coverImage: "/placeholder.svg?height=400&width=600&query=resume+writing",
    tags: ["Resume Building", "Career Advice"],
    author: {
      name: "Jamie Chen",
      avatar: "/diverse-group-two.png",
      following: false,
    },
    publishedAt: "May 10, 2024",
    readTime: 6,
    featured: false,
  },
  {
    id: "3",
    title: "My Summer Internship at Microsoft: Lessons Learned",
    excerpt: "Reflecting on my 12-week internship experience, the projects I worked on, and advice for future interns.",
    coverImage: "/placeholder.svg?height=400&width=600&query=office+workspace",
    tags: ["Internship", "Microsoft", "Experience"],
    author: {
      name: "Sam Wilson",
      avatar: "/diverse-group-outdoors.png",
      following: true,
    },
    publishedAt: "April 28, 2024",
    readTime: 10,
    featured: true,
  },
  {
    id: "4",
    title: "Balancing Academics and Placement Preparation: My Strategy",
    excerpt: "How I managed to maintain a high GPA while preparing for technical interviews and campus placements.",
    coverImage: "/placeholder.svg?height=400&width=600&query=student+studying",
    tags: ["Study Tips", "Placement Prep", "Time Management"],
    author: {
      name: "Taylor Reed",
      avatar: "/diverse-group-four.png",
      following: false,
    },
    publishedAt: "April 22, 2024",
    readTime: 7,
    featured: false,
  },
  {
    id: "5",
    title: "From Rejection to Offer: My Comeback Story",
    excerpt: "After facing multiple rejections, here's how I changed my approach and finally secured my dream job.",
    coverImage: "/placeholder.svg?height=400&width=600&query=success+achievement",
    tags: ["Motivation", "Career Journey", "Perseverance"],
    author: {
      name: "Jordan Lee",
      avatar: "/diverse-group-five.png",
      following: true,
    },
    publishedAt: "April 15, 2024",
    readTime: 9,
    featured: true,
  },
  {
    id: "6",
    title: "The Ultimate DSA Roadmap for Placement Preparation",
    excerpt: "A comprehensive guide to mastering Data Structures and Algorithms for technical interviews.",
    coverImage: "/placeholder.svg?height=400&width=600&query=programming+code",
    tags: ["DSA", "Technical Interview", "Coding"],
    author: {
      name: "Casey Kim",
      avatar: "/diverse-group-six.png",
      following: false,
    },
    publishedAt: "April 8, 2024",
    readTime: 12,
    featured: false,
  },
]
