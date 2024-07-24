import { ReactNode,ComponentPropsWithoutRef } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  type ?: "button" | "submit" | "reset"; 
}

const Button = ({ className,type,children, ...props }: ButtonProps & ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;
