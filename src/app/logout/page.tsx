"use client"
import { Icons } from "@/components/icons";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.setItem("bearerToken", '');
    localStorage.setItem("refreshToken", '');
    if (window) {
      window.location.href = '/login';
    }
  }, [window]);

  return (
    <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          Logging out...
        </div>
      </div>
    </div>
  );
};

export default Logout;
