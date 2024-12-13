"use client";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config.js";

import MainPage from "./components/main/MainPage";
import { useRouter } from "next/navigation";

const Main: FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      setIsFirstLoad(false);
      router.push("/home");
    }
  }, [loading, user, router]);

  if (loading && isFirstLoad) return null;
  if (user) return <MainPage user={user} />;
  return null;
};

export default Main;
