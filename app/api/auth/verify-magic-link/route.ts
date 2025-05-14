import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  if (!userId || !secret) {
    return NextResponse.redirect(new URL('/login?error=verification_failed', process.env.NEXT_PUBLIC_APP_URL));
  }

  try {
    // Verify the magic link secret and create a session
    const session = await account.updateMagicURLSession(userId, secret);

    // Redirect to a protected page or dashboard
    // The session cookies will be automatically set by Appwrite
    const response = NextResponse.redirect(new URL('/discover', process.env.NEXT_PUBLIC_APP_URL));
    
    // It's good practice to ensure Appwrite SDK sets cookies correctly, especially in serverless environments.
    // Appwrite's web SDK typically handles this, but with Node SDK on server, explicit cookie handling might be needed if not automatic.
    // For Next.js API routes, Appwrite's Node SDK should handle setting HttpOnly cookies if the session is created server-side.

    return response;
  } catch (error: any) {
    console.error('[Verify Magic Link GET Error]', error);
    // Redirect to login page with an error message
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message || 'Verification failed')}`, process.env.NEXT_PUBLIC_APP_URL));
  }
} 