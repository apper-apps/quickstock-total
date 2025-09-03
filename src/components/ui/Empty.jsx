import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "Package",
  title = "No items found",
  message = "There are no items to display at the moment.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
          <ApperIcon name={icon} className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {onAction && actionLabel && (
        <Button 
          onClick={onAction}
          variant="primary"
          icon="Plus"
          className="mb-4"
        >
          {actionLabel}
        </Button>
      )}
      
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Search" className="w-4 h-4" />
          <span>Try adjusting your search</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" className="w-4 h-4" />
          <span>Check your filters</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;