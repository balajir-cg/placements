"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying your magic link...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const queryError = searchParams.get('error'); // Error passed directly in query

    if (queryError) {
      setError(decodeURIComponent(queryError));
      setMessage("Verification failed.");
      // Optionally redirect to sign-in after a delay or let user click
      // setTimeout(() => router.push('/sign-in'), 5000);
      return;
    }

    if (userId && secret) {
      fetch(`/api/auth/verify-magic-link?userId=${encodeURIComponent(userId)}&secret=${encodeURIComponent(secret)}`)
        .then(async (res) => {
          if (res.ok) {
            // If the response is OK and it's a redirect, Next.js fetch API
            // won't automatically follow it for client-side fetch.
            // The server-side API route itself issues the redirect.
            // We need to check if the server responded with a redirect URL.
            // A common pattern is that the server responds with 200 OK and a body indicating success,
            // and then the client redirects.
            // OR, the server responds with a redirect status code (3xx), and res.url would be the new URL.
            // Our current /api/auth/verify-magic-link sends a 307/302 redirect.
            // When fetch is used like this, `res.redirected` will be true, and `res.url` will be the target.
            if (res.redirected) {
              router.push(res.url); // Follow the redirect from the API
            } else {
              // This case should ideally not happen if API always redirects
              setMessage("Verification successful. Redirecting...");
              // Fallback redirect if API didn't explicitly redirect but was successful
              router.push('/discover'); 
            }
          } else {
            // If response is not OK, try to parse error from body
            const errorData = await res.json().catch(() => ({ error: "Verification failed. Please try again." }));
            setError(errorData.error || "Verification failed. Please try again.");
            setMessage("Could not verify magic link.");
            // router.push(`/sign-in?error=${encodeURIComponent(errorData.error || "Verification failed")}`);
          }
        })
        .catch((e) => {
          console.error("Verification fetch error:", e);
          setError("An unexpected error occurred during verification.");
          setMessage("Verification failed.");
          // router.push('/sign-in?error=unexpected_error');
        });
    } else if (!queryError) {
      // No userId, secret, or error in query params
      setMessage("Invalid verification link.");
      setError("Missing required parameters in the link.");
      // setTimeout(() => router.push('/sign-in'), 5000);
    }
  }, [searchParams, router]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2>{error ? "Verification Problem" : "Verifying Account"}</h2>
      <p style={{ marginTop: '10px', marginBottom: '20px' }}>{message}</p>
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <p>Error: {error}</p>
        </div>
      )}
      {error && (
        <Link href="/sign-in" style={{
          padding: '10px 15px',
          color: 'white',
          backgroundColor: '#0070f3',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Try Signing In Again
        </Link>
      )}
      {/* You can add a loading spinner here */}
    </div>
  );
} 