import { useState, useEffect } from 'react';
import { account, databases } from '@/lib/appwrite';
import { Models } from 'appwrite';

export function useRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const user = await account.get();
        if (user) {
          const document = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
            [Query.equal("userId", user.$id)]
          );
          if (document.documents.length > 0) {
            setRole(document.documents[0].role);
          }
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading, error };
}
