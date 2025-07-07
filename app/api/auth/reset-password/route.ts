import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    const { userId, secret, password } = await request.json();

    if (!userId || !secret || !password) {
      return NextResponse.json(
        { error: 'User ID, secret, and new password are required' },
        { status: 400 }
      );
    }

    await account.updateRecovery(userId, secret, password);

    return NextResponse.json({
      message: 'Password reset successfully',
    });
  } catch (error: any) {
    console.error('[Reset Password POST Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to reset password' },
      { status: 500 }
    );
  }
}
