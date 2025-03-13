import Header from "@/components/layout/admin/header/Header";
import Sidebar from "@/components/layout/admin/sidebar/Sidebar";

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">{children}</div>
      </div>
    </>
  );
}
