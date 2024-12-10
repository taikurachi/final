"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Links from "./Links";
const Header: FC = () => {
  return (
    <header className="flex p-8 w-[20vw]">
      <nav className="flex flex-col gap-11">
        <p className="text-5xl font-extrabold tracking-[-3px]">fitr</p>
        <ul className="flex flex-col gap-6 justify-center">
          <Links path="/" type="home" text="Home" />
          <Links path="/market" type="market" text="Market" />
          <Links path="/gallery" type="gallery" text="Gallery" />
          <Links path="/sign-up" type="sign-up" text="Sign Up" />
          <Links path="/login" type="logout" text="Logout" />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
