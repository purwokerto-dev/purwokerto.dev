import { cn } from "@/lib/cn";
import { FC, MouseEvent } from "react";

interface ButtonPropsI {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  variant: "outline" | "bg";
  className?: string;
}

const baseStyle =
  "text-gray-600 rounded-md transition-300 uppercase font-semibold px-3 py-2";

export const buttonVariant = {
  outline: `${baseStyle} border border-gray-600 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white hover:border-white dark:border-white dark:text-white dark:hover:border-primary`,
  bg: `${baseStyle} text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500`,
  danger: `${baseStyle} bg-red-500 text-white hover:bg-red-400`,
};

const Button: FC<ButtonPropsI> = ({ onClick, text, variant, className }) => (
  <button
    onClick={onClick}
    className={cn(
      variant === "outline" && buttonVariant.outline,
      variant === "bg" && buttonVariant.bg,
      className
    )}>
    {text}
  </button>
);

export default Button;
