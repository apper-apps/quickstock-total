import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { formatCurrency } from "@/utils/currency";

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onEdit, 
  onDelete,
  showActions = true 
}) => {
  const getStockBadgeVariant = (stock, threshold) => {
    if (stock === 0) return "error";
    if (stock <= threshold) return "warning";
    return "success";
  };

  const getStockText = (stock) => {
    if (stock === 0) return "Out of Stock";
    return `${stock} in stock`;
  };

  return (
    <Card hover className="overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover bg-gradient-to-br from-gray-100 to-gray-200"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            variant={getStockBadgeVariant(product.stock, product.lowStockThreshold)}
            size="sm"
          >
            {getStockText(product.stock)}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 font-display line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold gradient-text">
            {formatCurrency(product.price)}
          </div>
          <Badge variant="default" size="sm">
            {product.category}
          </Badge>
        </div>
        
        {showActions && (
          <div className="flex space-x-2">
            <Button
              onClick={() => onAddToCart(product)}
              variant="primary"
              size="sm"
              icon="Plus"
              disabled={product.stock === 0}
              className="flex-1"
            >
              Add to Cart
            </Button>
            
            <Button
              onClick={() => onEdit(product)}
              variant="outline"
              size="sm"
              icon="Edit"
              className="px-3"
            />
            
            <Button
              onClick={() => onDelete(product)}
              variant="danger"
              size="sm"
              icon="Trash2"
              className="px-3"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;