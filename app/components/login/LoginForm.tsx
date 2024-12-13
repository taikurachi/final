"use client";
import { FC, useState } from "react";
import Button from "../utils/Button";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signInAnonymously } from "firebase/auth";

const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMsg("Please provide email and password.");
      return;
    }

    const res = await signInWithEmailAndPassword(username, password);
    if (res) {
      router.push("/");
    }
    setErrorMsg("Invalid login. Please try again.");
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      console.log("this ");
      router.push("/");
    } catch {
      setErrorMsg("Failed to login as guest. Please try again.");
    }
  };

  return (
    <div className="p-10 flex justify-center items-center h-[100dvh]">
      <form
        className="border-black border rounded-xl p-10 flex flex-col gap-8"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-extrabold text-center">Log in</h2>
        <p className="text-center">
          Log in to your account. Don&apos;t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </span>
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
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <div className="flex w-full justify-between gap-9">
          <Button className={"flex-1 text-center"} type="submit">
            Start sharing
          </Button>
          <Button
            className={"flex-1 text-center"}
            onClick={handleGuestLogin}
            type="button"
          >
            Continue as guest
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
