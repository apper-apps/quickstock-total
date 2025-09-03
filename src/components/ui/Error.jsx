import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops!"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-error-100 to-error-200 flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error-500" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          icon="RefreshCw"
          className="mb-4"
        >
          Try Again
        </Button>
      )}
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <ApperIcon name="Clock" className="w-4 h-4" />
          <span>Please try again in a moment</span>
        </div>
      </div>
    </div>
  );
};

export default Error;