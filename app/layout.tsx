import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CustomThemeProvider } from "./theme-context";
import Navbar from "./components/NavBar";







export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <AppRouterCacheProvider>
          <CustomThemeProvider>

        <Navbar/>
            {children}

          


          </CustomThemeProvider>
          

        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
