"use client";
import { FC, useState } from "react";
import Button from "./utils/Button";
import { useRouter } from "next/navigation";

const LogInForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const returnHome = () => router.push("/");
  const handleLogin = () => {
    console.log("login in button clicked");
  };

  return (
    <div className="p-10 flex justify-center items-center h-[100dvh]">
      <form className="border-black border rounded-xl p-10 flex flex-col gap-8">
        <h2 className="text-4xl font-extrabold text-center">Log in</h2>
        <p>
          Sign in to your account with this form. Don't have an account? Click
          sign in
        </p>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="block border-black border rounded-md w-full p-2"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="block border-black border rounded-md w-full p-2"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="flex w-full justify-between gap-9">
          <Button className={"flex-1 text-center"} onClick={handleLogin}>
            Start sharing
          </Button>
          <Button className={"flex-1 text-center"} onClick={returnHome}>
            Continue as guest
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
