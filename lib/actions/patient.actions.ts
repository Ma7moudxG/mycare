/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, ID, Query } from "node-appwrite"
import { parseStringify } from "../utils"
import { Users } from "node-appwrite";
import { InputFile } from "node-appwrite/file"
import { databases, storage } from "../appwrite.config";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) // Your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)            // Your Appwrite project ID
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);                  // Use API Key for server-side

const users = new Users(client);

export const createUser = async (user: CreateUserParams) => {
    console.log('PROJECT IDDDDDDDDDDD ', process.env.NEXT_PUBLIC_ENDPOINT)
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email,
            user.phone, 
            undefined, 
            user.name 
        )
        console.log("new new new new userrrrrrrrr", {newUser})

        return parseStringify(newUser);
    } catch (error: any) {
        if(error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        }
        console.error("An error occurred while creating a new user:", error);
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.log(error)
    }
}

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        let file;

        if(identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string,
            )
            console.log("storage : ", storage)
            file = await storage.createFile(
                '66e9f318000840e2d92d', 
                ID.unique(),
                inputFile
            )

        }

        const newPatient = await databases.createDocument(
            '66e9f261002fcc17fa95',  //db id
            '66e9f29300125fc15805',   //patient collection id
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/66e9f318000840e2d92d/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
                ...patient 
            }
        )

        return parseStringify(newPatient);

    } catch (error) {
        console.log(error)
    }
}

export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            '66e9f261002fcc17fa95',
            '66e9f29300125fc15805',
            [Query.equal("userId", userId)]
        )
        return parseStringify(patients.documents[0]);
    } catch (error) {
        console.log(error)
    }
}