import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SearchBar from "@/components/molecules/SearchBar";
import ProductGrid from "@/components/organisms/ProductGrid";
import CartSidebar from "@/components/organisms/CartSidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import productService from "@/services/api/productService";
import transactionService from "@/services/api/transactionService";

const POSScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const {
    cartItems,
    isOpen: cartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    openCart,
    closeCart
  } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    try {
      const results = await productService.searchProducts(query);
      setFilteredProducts(results);
    } catch (err) {
      toast.error("Search failed: " + err.message);
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }
    
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setCheckoutLoading(true);
      
      const transactionData = {
        items: cartItems,
        total: getTotal(),
        paymentMethod: "Cash" // Default payment method
      };

      await transactionService.create(transactionData);
      
      // Update product stock (simplified - in real app would be handled by backend)
      for (const item of cartItems) {
        const product = products.find(p => p.Id.toString() === item.productId);
        if (product) {
          await productService.updateStock(product.Id, product.stock - item.quantity);
        }
      }

      clearCart();
      closeCart();
      toast.success("Transaction completed successfully!");
      
      // Reload products to reflect updated stock
      loadProducts();
      
    } catch (err) {
      toast.error("Checkout failed: " + err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Point of Sale
              </h1>
              <p className="text-gray-600">Search and add products to cart</p>
            </div>
            
            <Button
              onClick={openCart}
              variant="primary"
              icon="ShoppingCart"
              className="relative"
            >
              Cart
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-error-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
          </div>
          
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search products by name, SKU, or category..."
            className="mb-4"
          />
        </div>
      </div>

      {/* Products */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
        onAddToCart={handleAddToCart}
        onEditProduct={(product) => console.log("Edit:", product)}
        onDeleteProduct={(product) => console.log("Delete:", product)}
        onRetry={loadProducts}
      />

      {/* Floating Cart Button for Mobile */}
      {getItemCount() > 0 && (
        <div className="fixed bottom-24 right-4 z-30 lg:hidden">
          <Button
            onClick={openCart}
            variant="primary"
            size="lg"
            icon="ShoppingCart"
            className="rounded-full w-16 h-16 shadow-lg relative"
          >
            <span className="sr-only">Open cart</span>
            <span className="absolute -top-2 -right-2 bg-error-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getItemCount()}
            </span>
          </Button>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        total={getTotal()}
        checkoutLoading={checkoutLoading}
      />
    </div>
  );
};

export default POSScreen;