import * as sdk from 'node-appwrite'

export const {
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_DATABASE_ID,
    NEXT_PUBLIC_PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT
} = process.env;

if (!NEXT_PUBLIC_ENDPOINT || !NEXT_PUBLIC_PROJECT_ID || !NEXT_PUBLIC_API_KEY) {
    console.log('Missing Appwrite environment variables.');
  }

const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66e9f1e7003aa837cccf').setKey(NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);