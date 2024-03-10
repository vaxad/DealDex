import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider"
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
      <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin=""/>
     <link type="text/css" rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
     <script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin=""></script>
     	<script defer src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
      </head>
      <body id="style-2" className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <AuthChecker/> */}
            <Navbar />
            {children}
          
          </ThemeProvider></body>
    </html>
  );
}
