import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import settingsService from "@/services/api/settingsService";

const SettingsScreen = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [shopInfo, setShopInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    taxRate: 0.08
  });

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await settingsService.getSettings();
      setSettings(data);
      setShopInfo(data.shopInfo);
    } catch (err) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveShopInfo = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await settingsService.updateShopInfo(shopInfo);
      toast.success("Shop information updated successfully!");
    } catch (err) {
      toast.error("Failed to update shop information: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setShopInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (loading) {
    return <Loading message="Loading settings..." />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadSettings}
        title="Failed to load settings"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            Settings
          </h1>
          <p className="text-gray-600">Manage your shop settings and preferences</p>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Shop Information */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <ApperIcon name="Store" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 font-display">
                Shop Information
              </h2>
              <p className="text-sm text-gray-600">Update your shop details</p>
            </div>
          </div>

          <form onSubmit={handleSaveShopInfo} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Shop Name"
                value={shopInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
              
              <Input
                label="Phone Number"
                value={shopInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            
            <Input
              label="Address"
              value={shopInfo.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={shopInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
              
              <Input
                label="Tax Rate (%)"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={shopInfo.taxRate}
                onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value))}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={saving}
              icon="Save"
              className="w-full md:w-auto"
            >
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Low Stock Thresholds */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-warning-500 to-warning-600 rounded-lg">
              <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 font-display">
                Low Stock Thresholds
              </h2>
              <p className="text-sm text-gray-600">Set minimum stock levels for alerts</p>
            </div>
          </div>

          <div className="space-y-3">
            {settings?.lowStockThresholds && Object.entries(settings.lowStockThresholds).map(([category, threshold]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{category}</span>
                <Badge variant="warning" size="sm">
                  {threshold} units
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-success-500 to-success-600 rounded-lg">
              <ApperIcon name="CreditCard" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 font-display">
                Accepted Payment Methods
              </h2>
              <p className="text-sm text-gray-600">Payment options for checkout</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings?.paymentMethods?.map((method) => (
              <Badge key={method} variant="success" size="md">
                <ApperIcon name="Check" className="w-4 h-4 mr-1" />
                {method}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg">
              <ApperIcon name="Settings" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 font-display">
                Preferences
              </h2>
              <p className="text-sm text-gray-600">App behavior and notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {settings?.preferences && Object.entries(settings.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <Badge 
                  variant={typeof value === 'boolean' ? (value ? 'success' : 'default') : 'primary'} 
                  size="sm"
                >
                  {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value.toString()}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;