"use client";

import React, { useState, useEffect } from "react";
import Logo from "../fragments/logo";
import ToggleTheme from "../fragments/toggle-theme";
import ToggleMenu from "../fragments/toggle-menu";
import NavbarMobileMenu from "../blocks/navbar-mobile";
import NavbarDekstopMenu from "../blocks/navbar-dekstop";
import Button from "../fragments/button";
import { signIn, useSession } from "next-auth/react";
import ProfileMenu from "../blocks/profile-menu";
import { axiosInstance } from "@/lib/axiosInstance";
import Cookie from 'js-cookie';
import { AxiosRequestHeaders } from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status }: any = useSession();

  useEffect(() => {
    async function setCookie() {
      if (status === "authenticated") {
        await axiosInstance.get(
          `/api/httpcookies?op=login`,
          { headers: { cookie: Cookie.get() } as unknown as AxiosRequestHeaders }
        );
      }
    }
    setCookie();
  }, [status]);

  return (
    <nav className="container-base">
      <div className="grid grid-cols-2 lg:grid-cols-3">
        <NavbarDekstopMenu />
        <div className="lg:justify-self-center">
          <Logo />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <ToggleTheme />

          {status === "loading" && "Loading ..."}

          {status === "authenticated" ? (
            <ProfileMenu
              isAdmin={session?.user?.isAdmin}
              name={session?.user?.name}
              profileImg={session?.user?.image}
            />
          ) : null}
          <ToggleMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          {status === "unauthenticated" ? (
            <Button
              onClick={() => signIn("google")}
              text="masuk"
              variant="outline"
              className="hidden mr-2 rounded-none lg:block"
            />
          ) : null}
        </div>
      </div>
      <NavbarMobileMenu isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </nav>
  );
};

export default Navbar;
