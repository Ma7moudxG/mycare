"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormField from "../CustomFormField"
import { Form } from "../ui/form"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

const defined_user = {
  email: "testing@dgtl-factory.com",
  password: "testing"
}
 
const LoginForm = () => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  
  async function onSubmit({email, password}: z.infer<typeof UserFormValidation>) {
    
    setIsLoading(true)
    console.log(defined_user)
    try {

        if(email === defined_user.email && password === defined_user.password)  {
            router.push(`/admin`)
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Welcome to Present Dashboard</h1>
        </section>
        
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="present@dgtl-factory.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="user"
        />

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="*********"
            iconSrc="/assets/icons/password.svg"
            iconAlt="password"
        />

        <SubmitButton isLoading={isLoading}>Dashboard Login</SubmitButton>
      </form>
    </Form>
  )
}

export default LoginForm