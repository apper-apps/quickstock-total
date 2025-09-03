import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import { useCart } from "@/hooks/useCart";

const Layout = () => {
  const { getItemCount } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-20">
      <Outlet />
      <BottomNavigation cartItemCount={getItemCount()} />
    </div>
  );
};

export default Layout;