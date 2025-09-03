import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { formatCurrency } from "@/utils/currency";

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  isCurrency = false,
  className 
}) => {
  const trendColor = trend === "up" ? "text-success-600" : trend === "down" ? "text-error-600" : "text-gray-500";
  const trendIcon = trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus";

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
            <ApperIcon name={icon} className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 font-display">
              {isCurrency ? formatCurrency(value) : value.toLocaleString()}
            </p>
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <ApperIcon name={trendIcon} className="w-4 h-4" />
            <span className="text-sm font-medium">{trendValue}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;