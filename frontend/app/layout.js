import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import SideNav from "./components/SideNav";
import Navbar from "./components/Navbar";
import AuthChecker from "./components/AuthChecker";

const inter = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "Hackoders",
  description: "Hackoders is a community of developers and designers who are passionate about creating the best software and websites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="style-2" className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthChecker/>
            <Navbar />
            {children}
          
          </ThemeProvider></body>
    </html>
  );
}
