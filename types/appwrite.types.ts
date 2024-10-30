import { Models } from "node-appwrite";

export interface Client extends Models.Document {
  clientId: string;
  name: string;
  email: string;
  clientImage: FormData;
  contact: string;
}