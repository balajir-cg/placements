"use client"

import type React from "react"
import { useState, FormEvent, useEffect } from "react"
import { KeyRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !secret) {
      setError('Invalid or missing reset token.');
    }
  }, [userId, secret]);

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!userId || !secret) {
      setError('Invalid or missing reset token.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, secret, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccessMessage(data.message || 'Your password has been reset successfully!');
      setPassword('');
      setConfirmPassword('');
      router.push('/sign-in'); // Redirect to sign-in page after successful reset
    } catch (e: any) {
      console.error("Reset password error:", e);
      setError(e.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="mx-auto grid w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-2xl border shadow-lg md:grid-cols-2">
          <div className="relative hidden md:block">
            <Image src="/diverse-group-five.png" alt="Students collaborating" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold">Reset Your Password</h2>
              <p className="mt-2">Enter your new password.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="mt-2 text-muted-foreground">Enter your new password below.</p>
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

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="********" 
                    className="pl-10" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="********" 
                    className="pl-10" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link href="/sign-in" className="font-medium text-primary hover:underline">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
