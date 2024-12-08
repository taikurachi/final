"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; // Make sure the path is correct
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from "./components/utils/Header";
import Main from "./components/app/Main";
export default function Home() {
  return (
    <div className="flex items-start">
      <Header />
      <Main />
    </div>
  );
}
