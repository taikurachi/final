"use client";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config.js";
import LandingPage from "../landing/LandingPage";
import MainPage from "./MainPage";
import LoadingScreen from "./LoadingScreen";

const Main: FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return !user ? <LandingPage /> : <MainPage user={user} />;
};

export default Main;
