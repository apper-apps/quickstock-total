import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SearchBar from "@/components/molecules/SearchBar";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatsCard from "@/components/molecules/StatsCard";
import productService from "@/services/api/productService";

const InventoryScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data);
      
      // Calculate stats
      const totalValue = data.reduce((sum, product) => sum + (product.price * product.stock), 0);
      const lowStock = data.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold);
      const outOfStock = data.filter(p => p.stock === 0);
      
      setLowStockProducts(lowStock);
      setStats({
        totalProducts: data.length,
        totalValue: totalValue,
        lowStockCount: lowStock.length,
        outOfStockCount: outOfStock.length
      });
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
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

  const handleEditProduct = (product) => {
    toast.info(`Editing ${product.name} - Feature coming soon!`);
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await productService.delete(product.Id);
        toast.success(`${product.name} deleted successfully`);
        loadProducts();
      } catch (err) {
        toast.error("Delete failed: " + err.message);
      }
    }
  };

  const handleAddProduct = () => {
    toast.info("Add product feature coming soon!");
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
                Inventory Management
              </h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>
            
            <Button
              onClick={handleAddProduct}
              variant="primary"
              icon="Plus"
            >
              Add Product
            </Button>
          </div>
          
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search inventory by name, SKU, or category..."
            className="mb-4"
          />
          
          {/* Low Stock Alert */}
          {lowStockProducts.length > 0 && (
            <div className="bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="warning" size="sm">
                  Low Stock Alert
                </Badge>
                <span className="text-warning-800 font-medium">
                  {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} running low
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon="Package"
            className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200"
          />
          <StatsCard
            title="Inventory Value"
            value={stats.totalValue}
            icon="DollarSign"
            isCurrency={true}
            className="bg-gradient-to-r from-success-50 to-success-100 border-success-200"
          />
          <StatsCard
            title="Low Stock"
            value={stats.lowStockCount}
            icon="AlertTriangle"
            className="bg-gradient-to-r from-warning-50 to-warning-100 border-warning-200"
          />
          <StatsCard
            title="Out of Stock"
            value={stats.outOfStockCount}
            icon="XCircle"
            className="bg-gradient-to-r from-error-50 to-error-100 border-error-200"
          />
        </div>
      </div>

      {/* Products */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
        onAddToCart={() => {}} // Not used in inventory screen
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onRetry={loadProducts}
      />
    </div>
  );
};

export default InventoryScreen;