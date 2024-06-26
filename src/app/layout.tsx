import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./Providers";
import NavBar from "./components/NavBar";
import { Suspense } from "react";
import Loading from "./loading";
import { ContextProvider } from "@/app/context/Context";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "Restaurant App for personal use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ContextProvider>
            <Suspense fallback={<Loading />}>
              <NavBar />
              {children}
              <Footer />
            </Suspense>
          </ContextProvider>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
