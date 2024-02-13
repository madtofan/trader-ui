"use client"
import { Icons } from "@/components/icons";
import { useVerifyRegistration } from "@/hooks/userApi";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const verifyToken = router.query.token as string;
  const { isLoading, isError } = useVerifyRegistration(verifyToken);

  if (isError) {
    router.push('/');
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Registration Verified</h1>

        <p className="mt-4 ">
          You may now log in to the system with your credentials
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <Link className="underline pl-1" href="/login">Back to login page</Link>
        </p>
      </div>

    </div>
  )
}
