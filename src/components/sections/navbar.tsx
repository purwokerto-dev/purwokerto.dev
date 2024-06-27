"use client";

import React, { useState } from "react";
import Logo from "../fragments/logo";
import ToggleTheme from "../fragments/toggle-theme";
import ToggleMenu from "../fragments/toggle-menu";
import NavbarMobileMenu from "../blocks/navbar-mobile";
import NavbarDekstopMenu from "../blocks/navbar-dekstop";
import Button from "../fragments/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="grid grid-cols-2 lg:grid-cols-3">
        <NavbarDekstopMenu />
        <div className="lg:justify-self-center">
          <Logo />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <ToggleTheme />
          <ToggleMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          <Button
            text="masuk"
            variant="outline"
            className="hidden mr-2 rounded-none lg:block"
          />
          <Button
            text="daftar"
            variant="bg"
            className="hidden rounded-none lg:block"
          />
        </div>
      </div>
      <NavbarMobileMenu isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
