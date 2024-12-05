"use client";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config.js";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";

const Main: FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  return !user ? <LandingPage /> : <MainPage user={user} />;
};

export default Main;
