"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account, databases } from "@/lib/appwrite";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
          params.id
        );
        setTitle(response.title);
        setContent(response.content);
      } catch (e: any) {
        setError(e.message);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
        params.id,
        {
          title,
          content,
        }
      );
      router.push(`/blog/${params.id}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link href={`/blog/${params.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Post
              </Link>
            </Button>
            <Button type="submit" form="blog-form" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
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
            </div>

            <div className="rounded-md border">
              <Textarea
                id="content"
                placeholder="Write your blog post content here..."
                className="min-h-[500px] resize-none rounded-none border-0 p-4 shadow-none focus-visible:ring-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href={`/blog/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
