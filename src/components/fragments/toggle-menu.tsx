import { FC, MouseEvent } from "react";

interface ToggleMenuPropsI {
  isOpen: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ToggleMenu: FC<ToggleMenuPropsI> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-lg relative border-primary dark:border-white bg-blue-500 hover:bg-blue-400 dark:bg-gray-700 lg:hidden">
      <div className="block w-5 absolute left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span
          className={`block absolute h-0.5 w-7 text-white bg-white transform transition-300  ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}></span>
        <span
          className={`block absolute h-0.5 w-5 text-white bg-white transform transition-300 ${
            isOpen && "opacity-0"
          }`}></span>
        <span
          className={`block absolute h-0.5 w-7 text-white bg-white transform  transition-300 ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}></span>
      </div>
    </button>
  );
};

export default ToggleMenu;
