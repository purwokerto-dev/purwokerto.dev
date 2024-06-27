"use client";

import React, { useState } from "react";
import Logo from "../fragments/logo";
import ToggleTheme from "../fragments/toggle-theme";
import ToggleMenu from "../fragments/toggle-menu";
import NavbarMobile from "../blocks/navbar-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-2">
          <ToggleTheme />
          <ToggleMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
      <NavbarMobile isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
