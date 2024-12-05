import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <p
      onClick={onClick}
      className={`p-4 bg-black text-white rounded-lg w-fit btn-hover ${className}`}
    >
      {children}
    </p>
  );
};

export default Button;
