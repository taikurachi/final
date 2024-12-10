"use client";

import Header from "./components/utils/Header";
import Main from "./components/main/Main";
export default function Home() {
  return (
    <div className="flex items-start">
      <Header />
      <Main />
    </div>
  );
}
