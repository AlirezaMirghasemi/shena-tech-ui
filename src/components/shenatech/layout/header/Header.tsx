"use client";
import MobileMenuHeader from "./MobileHeader";
import BlogLinkHeader from "./BlogLinkHeader";
import UserActionHeader from "./UserActionHeader";
export default function Header() {
  return (
    <>
      <header>
        <UserActionHeader />
        <BlogLinkHeader />
        <MobileMenuHeader />
      </header>
    </>
  );
}
