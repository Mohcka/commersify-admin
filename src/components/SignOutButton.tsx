"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
