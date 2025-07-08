import { Client, Databases, Account } from 'appwrite';

const client: Client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

if (process.env.APPWRITE_API_KEY) {
  client.setKey(process.env.APPWRITE_API_KEY);
}

export const databasesServer = new Databases(client);
export const accountServer = new Account(client);

export default client;