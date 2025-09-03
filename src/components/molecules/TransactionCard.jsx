import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { formatCurrency } from "@/utils/currency";
import { format } from "date-fns";

const TransactionCard = ({ transaction }) => {
  const getPaymentMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case "cash":
        return "Banknote";
      case "credit card":
        return "CreditCard";
      case "debit card":
        return "CreditCard";
      case "mobile payment":
        return "Smartphone";
      default:
        return "DollarSign";
    }
  };

  return (
    <Card hover className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 font-display">
            Transaction #{transaction.Id}
          </h3>
          <p className="text-sm text-gray-600">
            {format(new Date(transaction.timestamp), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold gradient-text">
            {formatCurrency(transaction.total)}
          </div>
          <Badge variant="success" size="sm">
            {transaction.status}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {transaction.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.quantity}x {item.name}
            </span>
            <span className="text-gray-900 font-medium">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-gray-600">
          <ApperIcon 
            name={getPaymentMethodIcon(transaction.paymentMethod)} 
            className="w-4 h-4" 
          />
          <span className="text-sm">{transaction.paymentMethod}</span>
        </div>
        
        <div className="text-sm text-gray-600">
          {transaction.items.length} item{transaction.items.length !== 1 ? 's' : ''}
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;