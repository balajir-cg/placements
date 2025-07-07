import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await account.create(ID.unique(), email, password, name);

    return NextResponse.json({
      message: 'User registered successfully',
      userId: user.$id,
    });
  } catch (error: any) {
    console.error('[Sign Up POST Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register user' },
      { status: 500 }
    );
  }
}
