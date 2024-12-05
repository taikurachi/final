import LoginForm from "@/app/components/LogInForm";
import Header from "@/app/components/utils/Header";

import { FC } from "react";
const Login: FC = () => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default Login;
