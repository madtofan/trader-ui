"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRegisterUser } from "@/hooks/userApi";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import Link from "next/link";
import { Form, } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

export default function RegisterPage() {
  const { mutate: register } = useRegisterUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    register({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    })
  }

  return (
    <div className="max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Registration</h1>
      </div>

      <Form {...form}>
        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              control={form.control}
              name="firstName"
              inputType="text"
              inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />

            <FormInput
              label="Last Name"
              control={form.control}
              name="lastName"
              inputType="text"
              inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
          <FormInput
            label="Email"
            control={form.control}
            name="email"
            inputType="email"
            inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            icon="email"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Password"
              control={form.control}
              name="password"
              inputType="password"
              inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              icon="password"
            />
            <FormInput
              label="Confirm Password"
              control={form.control}
              name="confirmPassword"
              inputType="password"
              inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              icon="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">
              Create an account
            </Button>
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link className="underline pl-1" href="/login">Log in</Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
