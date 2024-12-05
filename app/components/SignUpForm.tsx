"use client";
import { FC, useEffect, useState } from "react";
import Button from "./utils/Button";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db, doc, setDoc } from "@/app/firebase/config.js";
import { updateProfile, signInAnonymously } from "firebase/auth";

const SignUpForm: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // const saveUserToFirestore = async (
  //   userCredential: UserCredential,
  //   username: string
  // ) => {
  //   const user = userCredential.user;
  //   const userRef = doc(db, "users", user.uid);
  //   try {
  //     await setDoc(userRef, {
  //       username,
  //       email: user.email,
  //       createdAt: new Date(),
  //     });
  //   } catch {
  //     setErrorMsg("Error saving user to Firestore:");
  //   }
  // };
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleGuestLogin = async () => {
    await signInAnonymously(auth);
    router.push("/");
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      setErrorMsg("Please provide email, password, and username.");
      return;
    }

    const res = await createUserWithEmailAndPassword(email, password);
    if (res !== undefined) {
      await updateProfile(res.user, {
        displayName: username,
      });
      router.push("/");
    }

    if (res === undefined) {
      switch (error?.code) {
        case "auth/invalid-email":
          setErrorMsg("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setErrorMsg(
            "Password is too weak. Please enter a stronger password."
          );
          break;
        case "auth/email-already-in-use":
          setErrorMsg(
            "This email is already in use. Please use a different email."
          );
          break;
        case "auth/missing-email":
          setErrorMsg("Please provide an email address.");
          break;
        default:
          setErrorMsg("An error occurred while signing up. Please try again.");
      }
      if (error === undefined) setErrorMsg("There was an error.");
    }
  };

  return (
    <div className="p-10 flex justify-center items-center h-[100dvh]">
      <form className="border-black border rounded-xl p-10 flex flex-col gap-8">
        <h2 className="text-4xl font-extrabold text-center">Sign up</h2>
        <p>
          Create a free account to get started. Already have an account? Sign in
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
          {/* <p className="text-red-600">{username} is already taken</p> */}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="block border-black border rounded-md w-full p-2"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="flex w-full justify-between gap-9">
          <Button className={"flex-1 text-center"} onClick={handleSignUp}>
            Start sharing
          </Button>
          <Button className={"flex-1 text-center"} onClick={handleGuestLogin}>
            Continue as guest
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
