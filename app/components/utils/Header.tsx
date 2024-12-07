"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
const Header: FC = () => {
  const router = useRouter();
  const goToSignUp = () => router.push("/pages/sign-up");
  const goToLogin = () => router.push("/pages/login");
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
            onClick={goToSignUp}
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
            onClick={goToSignUp}
            className="font-bold cursor-pointer flex gap-4 items-center"
          >
            <Image src="/home.svg" width={30} height={30} alt="home image" />
            <span>Home</span>
          </li>
          <li
            onClick={goToSignUp}
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
            onClick={goToSignUp}
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
