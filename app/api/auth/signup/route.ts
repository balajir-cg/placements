import { NextRequest, NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';
import { databasesServer } from '@/lib/appwrite-server';
import { ID } from 'appwrite';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name || !role) {
      console.error('[Sign Up POST Error] - Missing required fields', { email, password, name, role });
      return NextResponse.json(
        { error: 'Email, password, name, and role are required' },
        { status: 400 }
      );
    }

    let user;
    try {
      user = await account.create(ID.unique(), email, password, name);
    } catch (error: any) {
      console.error('[Sign Up POST Error] - Appwrite account.create failed', error);
      return NextResponse.json(
        { error: `Failed to create user account: ${error.message}` },
        { status: 500 }
      );
    }

    const userId = user.$id;

    try {
      await databasesServer.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          email,
          name,
          role,
        }
      );
    } catch (error: any) {
      console.error('[Sign Up POST Error] - Appwrite databases.createDocument failed', error);
      // Clean up the created user if document creation fails
      await account.deleteIdentity(userId);
      console.error('[Sign Up POST Error] - Cleaned up user after document creation failure');
      return NextResponse.json(
        { error: `Failed to store user role: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User registered successfully',
      userId: userId,
    });
  } catch (error: any) {
    console.error('[Sign Up POST Error] - General error', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register user' },
      { status: 500 }
    );
  }
}
