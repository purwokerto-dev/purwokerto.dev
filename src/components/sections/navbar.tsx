"use client";

import React, { useState } from "react";
import Logo from "../fragments/logo";
import ToggleTheme from "../fragments/toggle-theme";
import ToggleMenu from "../fragments/toggle-menu";
import NavbarMobileMenu from "../blocks/navbar-mobile";
import NavbarDekstopMenu from "../blocks/navbar-dekstop";
import Button from "../fragments/button";
import { signIn } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="container-base">
      <div className="grid grid-cols-2 lg:grid-cols-3">
        <NavbarDekstopMenu />
        <div className="lg:justify-self-center">
          <Logo />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <ToggleTheme />
          <ToggleMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          <Button
            onClick={() => signIn("google")}
            text="masuk"
            variant="outline"
            className="hidden mr-2 rounded-none lg:block"
          />
        </div>
      </div>
      <NavbarMobileMenu isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </nav>
  );
};

export default Navbar;
