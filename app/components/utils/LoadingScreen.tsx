import { FC } from "react";
import Logo from "./Logo";

const LoadingScreen: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100dvh]">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <main className="mt-5">Loading user data ...</main>
    </div>
  );
};

export default LoadingScreen;
