"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import { Form, FormControl } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { ClientFormValidation, PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/client.actions";
import { FormFieldType } from "./LoginForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Clients } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ClientFormValidation>>({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ClientFormValidation>) {
    setIsLoading(true);
    const formData = new FormData();
    // formData.append("blobFile", blobFile);
    // formData.append("fileName", values.identificationDocument[0].name);
    try {
      const clientData = {
        ...values,
        clientId: client.$id,
      };

      const patient = await registerClient(patientData);

      if (client) router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/present-orig-logo-w.png"
            height={200}
            width={200}
            alt="logo"
            className="h-32 w-fit"
          />
        </Link>
        <section className="space-y-4">
          <h1 className="header">Register A New Client</h1>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Client Name"
          placeholder="Ford"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="client@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Contact number"
          placeholder="(+02) 123-4578"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="clientImage"
          label="Client logo"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Add A Client</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
