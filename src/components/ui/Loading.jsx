import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading...", type = "spinner" }) => {
  if (type === "skeleton") {
    return (
      <div className="space-y-4 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded w-3/4"></div>
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded w-1/2"></div>
                <div className="flex justify-between">
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 rounded w-20"></div>
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse"></div>
        <ApperIcon 
          name="Loader2" 
          className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" 
        />
      </div>
      <p className="mt-6 text-gray-600 font-medium">{message}</p>
      <div className="mt-4 flex space-x-2">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  );
};

export default Loading;