import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { formatCurrency } from "@/utils/currency";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.productId);
    } else {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 font-display">{item.name}</h4>
        <p className="text-sm text-gray-600">
          {formatCurrency(item.price)} each
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0 rounded-full"
        >
          <ApperIcon name="Minus" className="w-4 h-4" />
        </Button>
        
        <span className="font-medium text-gray-900 min-w-[2rem] text-center">
          {item.quantity}
        </span>
        
        <Button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0 rounded-full"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-gray-900">
          {formatCurrency(item.subtotal)}
        </div>
      </div>
      
      <Button
        onClick={() => onRemove(item.productId)}
        variant="ghost"
        size="sm"
        icon="Trash2"
        className="text-error-500 hover:text-error-700 hover:bg-error-50 p-2"
      />
    </div>
  );
};

export default CartItem;