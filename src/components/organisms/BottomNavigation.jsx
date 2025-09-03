import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const BottomNavigation = ({ cartItemCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "pos",
      label: "POS",
      icon: "ShoppingCart",
      path: "/pos"
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: "Package",
      path: "/inventory"
    },
    {
      id: "sales",
      label: "Sales",
      icon: "TrendingUp",
      path: "/sales"
    },
    {
      id: "settings",
      label: "Settings",
      icon: "Settings",
      path: "/settings"
    }
  ];

  const isActive = (path) => {
    if (path === "/pos" && (location.pathname === "/" || location.pathname === "/pos")) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
      <div className="flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item flex-1 py-3 ${
              isActive(item.path) ? "active" : ""
            }`}
          >
            <div className="relative">
              <ApperIcon name={item.icon} className="w-6 h-6 mx-auto mb-1" />
              {item.id === "pos" && cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge variant="error" size="sm" className="min-w-[20px] h-5 text-xs">
                    {cartItemCount}
                  </Badge>
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;