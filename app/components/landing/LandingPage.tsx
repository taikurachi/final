"use client";
import { FC } from "react";
import Button from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";
import Logo from "../utils/Logo";

const LandingPage: FC = () => {
  const router = useRouter();
  const goToSignUp = () => {
    router.push("/sign-up");
  };
  return (
    <>
      <header className="p-8 absolute top-0 left-0">
        <Logo />
      </header>
      <div className="flex flex-col justify-center items-center h-[100dvh]">
        <main className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-6xl font-extrabold">
              Post your oufits and earn rewards.
            </h1>
            <Button onClick={goToSignUp}>Start sharing</Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
