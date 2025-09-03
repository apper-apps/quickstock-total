import React from "react";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onAddToCart, 
  onEditProduct, 
  onDeleteProduct,
  onRetry 
}) => {
  if (loading) {
    return <Loading type="skeleton" message="Loading products..." />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={onRetry}
        title="Failed to load products"
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        icon="Package"
        title="No products found"
        message="No products match your current search or filter criteria."
        actionLabel="Add Product"
        onAction={() => console.log("Add new product")}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.Id}
          product={product}
          onAddToCart={onAddToCart}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
        />
      ))}
    </div>
  );
};

export default ProductGrid;