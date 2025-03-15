import Header from "@/components/shenatech/layout/header/Header";
import Footer from "@/components/shenatech/layout/Footer";
import React from "react";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <div className="container">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
