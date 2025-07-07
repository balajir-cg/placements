"use client"

import type React from "react"
import { useState, FormEvent } from "react"

import { Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleMagicLinkRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link');
      }

      setSuccessMessage(data.message || `A magic link has been sent to ${email}. Please check your inbox.`);
      setEmail(''); // Clear email field on success
      // User will be redirected by clicking the link in their email.
      // No client-side redirect here, just a message.
    } catch (e: any) {
      console.error("Magic link request error:", e);
      setError(e.message || 'Failed to send magic link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="mx-auto grid w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-2xl border shadow-lg md:grid-cols-2">
          <div className="relative hidden md:block">
            <Image src="/diverse-group-outdoors.png" alt="Students on campus" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="mt-2">Sign in with a magic link sent to your email.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">Sign In</h1>
              <p className="mt-2 text-muted-foreground">Enter your email to receive a login link.</p>
            </div>
            
            {successMessage && (
              <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleMagicLinkRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@xxx.com" 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending link..." : "Send Magic Link"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/sign-up" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
