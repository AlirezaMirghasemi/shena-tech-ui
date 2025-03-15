"use client";
import PrelineScript from "@/components/common/PrelineScript";
import "../styles/globals.css";
import StoreProvider from "./StoreProvider";
import {Toaster} from "sonner"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-linear-to-t from-blue-200 to-blue-400 dark:from-blue-500 dark:to-blue-900">
        <StoreProvider>
          <PrelineScript />
          <Toaster/>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
