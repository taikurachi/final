import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button";
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 bg-black text-white rounded-lg w-fit btn-hover ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
