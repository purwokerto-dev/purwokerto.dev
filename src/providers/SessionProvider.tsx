"use client";

import { SessionProvider as SessionWrapper } from "next-auth/react";
import { FC, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const SessionProvider: FC<ProviderProps> = ({ children }) => {
  return <SessionWrapper>{children}</SessionWrapper>;
};

export default SessionProvider;
