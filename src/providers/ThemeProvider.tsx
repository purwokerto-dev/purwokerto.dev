import { ThemeProvider as NextThemeProvider } from "next-themes";
import { FC } from "react";

interface ThemeProviderI {
  children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderI> = ({ children }) => {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
};

export default ThemeProvider;
