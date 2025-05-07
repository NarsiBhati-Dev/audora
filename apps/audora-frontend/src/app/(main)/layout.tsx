import Header from "@/components/header";
import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="mt-18 text-white">{children}</main>
    </>
  );
};

export default MainLayout;
