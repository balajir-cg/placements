"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, Heart, MessageSquare, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState("")

  // Find the blog post by ID
  const post = blogPosts.find((post) => post.id === params.id) || blogPosts[0]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button>Write a Post</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-4xl px-4 py-6 sm:px-8 md:py-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>

          <div className="mb-8 flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Follow
            </Button>
          </div>

          <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-lg">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                <span>{liked ? post.likes + 1 : post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments.length}</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => setBookmarked(!bookmarked)}>
                {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                <span>{bookmarked ? "Saved" : "Save"}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="mb-6 text-2xl font-bold">Comments ({post.comments.length})</h2>

            <div className="mb-8 flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/diverse-group.png" alt="Your avatar" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[100px] resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="mt-2 flex justify-end">
                  <Button disabled={!comment.trim()}>Post Comment</Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {post.comments.map((comment, index) => (
                <div key={index} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{comment.author.name}</h4>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                        Like ({comment.likes})
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
    likes: 245,
    content: `
# How I Cracked My Google Interview: A Step-by-Step Guide

After months of preparation, multiple interview rounds, and a lot of anxiety, I finally received the email I had been waiting for: "Congratulations! We're excited to offer you a position at Google." In this post, I want to share my complete journey, from preparation to offer, hoping it helps others who are on the same path.

## My Background

I'm a final year Computer Science student with a decent academic record (8.7 CGPA) and some internship experience at a mid-sized tech company. I had been coding since high school but never thought I'd make it to Google. I started my preparation about 6 months before the campus placements began.

## Preparation Strategy

### 1. Data Structures and Algorithms

This was the foundation of my preparation. I followed:

- **LeetCode**: I solved around 300 problems, focusing on medium and hard difficulty.
- **Cracking the Coding Interview**: This book was my bible. I went through all the core chapters multiple times.
- **AlgoExpert**: The video explanations were incredibly helpful for understanding complex algorithms.

### 2. System Design

Even though I was applying for an entry-level position, I wanted to be prepared:

- **System Design Primer (GitHub)**: A fantastic resource for beginners.
- **Designing Data-Intensive Applications**: This book gave me a deeper understanding of distributed systems.

### 3. Behavioral Preparation

- I used the STAR method (Situation, Task, Action, Result) to structure my answers.
- Prepared stories about teamwork, conflict resolution, and technical challenges.
- Practiced with friends and recorded myself to improve delivery.

## The Interview Process

### Online Assessment

The first step was an online coding test with two algorithmic problems:

1. A medium-level graph traversal problem
2. A string manipulation problem with dynamic programming

I passed both and moved to the next round.

### Phone Screen

This was a 45-minute technical interview with a Google engineer:

- One medium-level algorithm problem (binary tree traversal)
- Follow-up questions about time and space complexity
- Brief discussion about my projects

### Onsite Interviews (Virtual due to COVID)

I had four back-to-back interviews, each 45 minutes long:

1. **Coding Interview 1**: Two algorithm problems (array manipulation and dynamic programming)
2. **Coding Interview 2**: One harder problem about graph algorithms
3. **System Design**: Design a simplified version of Google Drive
4. **Behavioral + Coding**: Questions about my experience, teamwork, and a final coding problem

## What Worked for Me

1. **Consistent Practice**: I solved at least 2-3 problems daily for months.
2. **Mock Interviews**: I used platforms like Pramp and interviewed with friends.
3. **Thinking Aloud**: During interviews, I verbalized my thought process, which helped the interviewers follow my reasoning.
4. **Learning from Failures**: I failed many mock interviews but used each as a learning opportunity.

## Tips for Future Candidates

1. **Start Early**: Six months of consistent preparation is ideal.
2. **Quality over Quantity**: Understanding 200 problems deeply is better than rushing through 500.
3. **Focus on Fundamentals**: Make sure your basics of DSA, OS, and Networks are solid.
4. **Take Care of Yourself**: Don't burn out. I took one day off each week to recharge.

## Conclusion

The journey was challenging but incredibly rewarding. Remember that each rejection is a stepping stone to success. Stay persistent, keep learning, and believe in yourself.

Feel free to reach out if you have any questions about my experience or need advice for your preparation!
    `,
    comments: [
      {
        author: {
          name: "Jamie Chen",
          avatar: "/diverse-group-two.png",
        },
        content:
          "This is incredibly helpful! I'm preparing for my Google interview next month. Could you share more details about the system design round?",
        timestamp: "2 days ago",
        likes: 15,
      },
      {
        author: {
          name: "Sam Wilson",
          avatar: "/diverse-group-outdoors.png",
        },
        content:
          "Congratulations on your offer! I'm curious about how you balanced your academic responsibilities with interview preparation during your final year.",
        timestamp: "1 day ago",
        likes: 8,
      },
    ],
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
    likes: 178,
    content: `
# 5 Resume Mistakes That Cost Me Job Opportunities

When I started applying for internships and full-time positions, I was confident that my resume would stand out. I had good grades, relevant projects, and some extracurricular activities. Yet, I wasn't getting the callbacks I expected. After several rejections and a professional resume review, I realized I was making some critical mistakes that were costing me opportunities.

## Mistake #1: Using a Generic Resume for All Applications

**What I did wrong:** I created one resume and sent the exact same version to every company I applied to.

**Why it hurt me:** Different companies and roles have different requirements and priorities. By using a generic resume, I wasn't highlighting the specific skills and experiences relevant to each position.

**The fix:** I now tailor my resume for each application, emphasizing the skills and experiences that align with the job description. This doesn't mean rewriting the entire resume, but adjusting bullet points and highlighting relevant projects.

## Mistake #2: Focusing on Responsibilities Instead of Achievements

**What I did wrong:** My bullet points were descriptions of what I was supposed to do in my roles, not what I actually accomplished.

**Why it hurt me:** Recruiters want to see the impact you made, not just a list of your duties.

**The fix:** I rewrote my bullet points using the formula: Action + Result + Quantification. For example, instead of "Responsible for developing the company website," I now write "Developed and launched a responsive company website that increased user engagement by 40% and reduced bounce rate by 25%."

## Mistake #3: Including Irrelevant Information

**What I did wrong:** I included every course I took, every club I joined, and every small project I worked on.

**Why it hurt me:** This cluttered my resume and buried the important information that recruiters were looking for.

**The fix:** I streamlined my resume to focus only on relevant courses, significant projects, and experiences that demonstrate skills applicable to the jobs I'm applying for.

## Mistake #4: Poor Formatting and Design

**What I did wrong:** My resume was visually unappealing with inconsistent formatting, multiple fonts, and dense blocks of text.

**Why it hurt me:** Recruiters spend an average of 6-7 seconds scanning a resume. If it's hard to read or visually confusing, they'll move on.

**The fix:** I redesigned my resume with a clean, consistent format, plenty of white space, and a professional font. I also used bold text strategically to highlight key information.

## Mistake #5: Not Proofreading Carefully

**What I did wrong:** I had typos, grammatical errors, and inconsistencies in my resume.

**Why it hurt me:** Errors signal carelessness and lack of attention to detail—qualities no employer wants.

**The fix:** I now proofread my resume multiple times and have at least two other people review it before sending it out. I also read it aloud to catch errors I might miss when reading silently.

## The Results

After fixing these mistakes, my callback rate increased from about 5% to nearly 30%. I received interview invitations from companies that had previously rejected me, including my current employer.

## Conclusion

Your resume is often your first impression with potential employers. Taking the time to avoid these common mistakes can significantly improve your chances of landing interviews. Remember, it's not just about listing your experiences—it's about presenting them in a way that demonstrates your value to the company.

What resume mistakes have you made or seen others make? Share in the comments below!
    `,
    comments: [
      {
        author: {
          name: "Taylor Reed",
          avatar: "/diverse-group-four.png",
        },
        content:
          "This is exactly what I needed! I've been making the same mistakes with my resume. Going to revise it right away using your tips.",
        timestamp: "3 days ago",
        likes: 12,
      },
    ],
  },
]
