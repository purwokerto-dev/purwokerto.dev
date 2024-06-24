"use client";

import React, { useState } from "react";
import Logo from "../fragments/Logo";
import NavItems from "../blocks/NavItems";
import NavToggle from "../blocks/NavToggle";
import ToggleTheme from "../fragments/toggle-theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex py-2 items-center justify-between w-full">
      <Logo />
      <ToggleTheme />
      <NavToggle onClick={handleToggle} />
      <div className={`nav-menu ${isOpen ? "open" : ""} hidden`}>
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
