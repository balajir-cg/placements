import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite'; // Assuming your appwrite client is exported from lib/appwrite.ts
import { ID } from 'appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // The URL to redirect the user to after they click the magic link
    // This should be a page in your frontend that calls the /api/auth/verify-magic-link endpoint
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`;

    await account.createMagicURLToken(
      ID.unique(), // Or a specific user ID if you want to target an existing user
      email,
      redirectUrl
    );

    return NextResponse.json({
      message: 'Magic link sent successfully. Please check your email.',
    });
  } catch (error: any) {
    console.error('[Magic Link POST Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send magic link' },
      { status: 500 }
    );
  }
} 