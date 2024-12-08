"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
const Header: FC = () => {
  const router = useRouter();
  const goTo = (path: string) => router.push(path);

  return (
    <header className="flex p-8 w-[20vw]">
      <nav className="flex flex-col gap-11">
        <p className="text-5xl font-extrabold tracking-[-3px]">fitr</p>
        <ul className="flex flex-col gap-6 justify-center">
          <li
            onClick={goToSignUp}
            className="font-bold cursor-pointer flex justify-center gap-4 items-center"
          >
            <Image
              src="/sign-up.svg"
              width={30}
              height={30}
              alt="sign-up image"
            />
            <span>Sign up</span>
          </li>
          <li
            onClick={() => goTo("/pages/login")}
            className="font-bold cursor-pointer flex justify-center gap-4 items-center"
          >
            <Image
              src="/logout.svg"
              width={30}
              height={30}
              alt="logout image"
            />
            <span>Logout</span>
          </li>
          <li
            onClick={() => goTo("/")}
            className="font-bold cursor-pointer flex gap-4 items-center"
          >
            <Image src="/home.svg" width={30} height={30} alt="home image" />
            <span>Home</span>
          </li>
          <li
            onClick={() => goTo("/market")}
            className="font-bold cursor-pointer flex gap-4 items-center"
          >
            <Image
              src="/market.svg"
              width={30}
              height={30}
              alt="market image"
            />
            <span>Market</span>
          </li>
          <li
            onClick={() => goTo("/gallery")}
            className="font-bold cursor-pointer flex gap-4 items-center"
          >
            <Image
              src="/gallery.svg"
              width={30}
              height={30}
              alt="gallery image"
            />
            <span>Gallery</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
