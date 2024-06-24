import { FC, MouseEvent } from "react";

interface ButtonPropsI {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

const Button: FC<ButtonPropsI> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="text-white uppercase text-base font-semibold border-2 px-3 py-1 border-darkhover hover:bg-yellow-500">
    {text}
  </button>
);

export default Button;
