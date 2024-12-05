import { FC } from "react";
import Button from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";

const LandingPage: FC = () => {
  const router = useRouter();
  const goToSignUp = () => {
    router.push("/pages/sign-up");
  };
  return (
    <main className="flex flex-col h-[100dvh] justify-center items-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-extrabold">
          Post your oufits and earn rewards.
        </h1>
        <Button onClick={goToSignUp}>Start sharing</Button>
      </div>
    </main>
  );
};

export default LandingPage;
