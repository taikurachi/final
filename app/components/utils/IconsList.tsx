import { FC } from "react";
import Links from "./Links";

const IconsList: FC = () => {
  return (
    <ul className="flex flex-row gap-6 justify-center items-center lg:items-start sm:flex-col">
      <Links path="/" type="home" text="Home" />
      <Links path="/market" type="market" text="Market" />
      <Links path="/gallery" type="gallery" text="Gallery" />
      <Links path="/sign-up" type="sign-up" text="Sign Up" />
      <Links path="/login" type="logout" text="Logout" />
    </ul>
  );
};

export default IconsList;
