import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Your Project ID
    .setKey(process.env.APPWRITE_API_KEY!); // Your secret API key

export const databasesServer = new Databases(client);
export const accountServer = new Account(client);

export default client;