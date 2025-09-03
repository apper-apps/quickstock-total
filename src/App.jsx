import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import POSScreen from "@/components/pages/POSScreen";
import InventoryScreen from "@/components/pages/InventoryScreen";
import SalesScreen from "@/components/pages/SalesScreen";
import SettingsScreen from "@/components/pages/SettingsScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<POSScreen />} />
            <Route path="/pos" element={<POSScreen />} />
            <Route path="/inventory" element={<InventoryScreen />} />
            <Route path="/sales" element={<SalesScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;