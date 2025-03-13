import Header from "@/components/layout/shenatech/header/Header";
import Footer from "@/components/layout/shenatech/Footer";
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
