import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function POST(request: NextRequest) {
  try {
    await account.deleteSession('current');
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('[Logout POST Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to logout' },
      { status: 500 }
    );
  }
} 