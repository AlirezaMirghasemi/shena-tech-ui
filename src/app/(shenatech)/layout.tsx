import Header from "@/components/layout/shenatech/Header";
import Footer from "@/components/layout/shenatech/Footer";
import React from "react";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container mx-auto">
        <div className="">
          <Header />
          {children}
          <Footer/>
        </div>
      </div>
    </>
  );
}
