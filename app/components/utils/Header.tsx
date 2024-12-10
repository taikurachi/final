"use client";
import { FC } from "react";
import IconsList from "./IconsList";
import Logo from "./Logo";

const Header: FC = () => {
  return (
    <header className="flex p-8 md:w-[20vw] w-full">
      <nav className="flex flex-row sm:flex-col gap-11">
        <Logo />
        <IconsList />
      </nav>
    </header>
  );
};

export default Header;
