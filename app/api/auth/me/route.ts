import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function GET(request: NextRequest) {
  try {
    const user = await account.get();
    return NextResponse.json(user);
  } catch (error: any) {
    // If no session, Appwrite throws an error. We can return null or an empty object.
    // It's important to distinguish between an actual error and no session.
    if (error.code === 401) { // Or check specific Appwrite error code for no session
        return NextResponse.json({ user: null }, { status: 200 }); // No user logged in, but not an error
    }
    console.error('[Me GET Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch user' },
      { status: error.code || 500 } 
    );
  }
} 