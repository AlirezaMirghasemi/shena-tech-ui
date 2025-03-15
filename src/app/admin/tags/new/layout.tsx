export default function NewTagLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-blue-300 rounded-xl shadow-xs p-4 sm:p-7 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
}
