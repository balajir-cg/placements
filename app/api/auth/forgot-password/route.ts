import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const recovery = await account.createRecovery(
      email,
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
    );

    return NextResponse.json({
      message: 'Password recovery email sent successfully. Please check your email.',
      userId: recovery.userId,
    });
  } catch (error: any) {
    console.error('[Forgot Password POST Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send password recovery email' },
      { status: 500 }
    );
  }
}
