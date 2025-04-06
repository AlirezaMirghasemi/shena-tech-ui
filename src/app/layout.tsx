"use client";
import "../styles/globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import PrelineScriptWrapper from "@/components/common/PrelineScriptWrapper";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>..::Shenatech::..</title>
        <link rel="icon" type="image/x-icon" href="/shenatech_logo_icon.png" />
      </head>
      <body className="bg-linear-to-t from-blue-200 to-blue-400 dark:from-blue-500 dark:to-blue-900">
        <StoreProvider>
          <Toaster />
          <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
        </StoreProvider>
      </body>
      <PrelineScriptWrapper />
    </html>
  );
}
