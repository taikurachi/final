"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

const Header: FC = () => {
  const router = useRouter();
  const goToSignUp = () => router.push("/pages/sign-up");
  const goToLogin = () => router.push("/pages/login");
  return (
    <header className="absolute flex justify-between items-center w-full p-8">
      <p className="text-5xl font-extrabold tracking-[-3px]">fitr</p>
      <ul className="flex gap-3 justify-center items-center">
        <li onClick={goToSignUp} className="font-bold cursor-pointer">
          Sign up
        </li>
        <li
          onClick={goToLogin}
          className="font-bold p-2 bg-black text-white rounded-lg cursor-pointer"
        >
          Log in
        </li>
      </ul>
    </header>
  );
};

export default Header;
