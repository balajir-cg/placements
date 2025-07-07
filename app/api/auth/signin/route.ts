import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const session = await account.createEmailPasswordSession(email, password);

    return NextResponse.json({
      message: 'User logged in successfully',
      userId: session.userId,
    });
  } catch (error: any) {
    console.error('[Sign In POST Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to log in' },
      { status: 500 }
    );
  }
}
