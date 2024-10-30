'use server'

import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            '66e9f261002fcc17fa95',  //db id
            '66e9f2f3000d36831223',   //appointment collection id
            ID.unique(),
            appointment
        )

        return parseStringify(newAppointment);
    } catch (error) {
        console.log("An erroe occured while creating a new appointmnet: ", error)
    }
}

export const createClient = async (appointment: CreateClientParams) => {
    try {
        const newClient = await databases.createDocument(
            '66e9f261002fcc17fa95',  //db id
            '66e9f2f3000d36831223',   //appointment collection id
            ID.unique(),
            appointment
        )

        return parseStringify(newClient);
    } catch (error) {
        console.log("An erroe occured while creating a new client: ", error)
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            '66e9f261002fcc17fa95',  //db id
            '66e9f2f3000d36831223',   //appointment collection id
            appointmentId,
        )
        return parseStringify(appointment);
    } catch (error) {
        console.log(error)
    }
}

export const getReacentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            '66e9f261002fcc17fa95',  //db id
            '66e9f2f3000d36831223',   //appointment collection id
            [Query.orderDesc('$createdAt')]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled'){
                acc.scheduledCount += 1;
            } else if (appointment.status === "pending") {
                acc.pendingCount += 1;
            } else if (appointment.status === 'cancelled') {
                acc.cancelledCount += 1;
            }

            return acc;
        }, initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);
    } catch (error) {
        console.log(error)
    }
}

export const updateAppointment = async ({ appointmentId, appointment} : UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            '66e9f261002fcc17fa95',  //db id
            '66e9f2f3000d36831223',   //appointment collection id
            appointmentId,
            appointment
        )
        console.log('UPDATED APPOINTMENT ', updateAppointment)
        if(!updateAppointment){
            throw new Error('Appointment not found');
        }
        // SMS notification 
        revalidatePath('/admin');
        return parseStringify(updatedAppointment)

    } catch (error) {
        console.log(error)
    }
}