import settingsData from "@/services/mockData/settings.json";

class SettingsService {
  constructor() {
    this.settings = { ...settingsData };
  }

  async getSettings() {
    await this.delay(250);
    return { ...this.settings };
  }

  async updateShopInfo(shopInfo) {
    await this.delay(300);
    this.settings.shopInfo = { ...this.settings.shopInfo, ...shopInfo };
    return { ...this.settings.shopInfo };
  }

  async updateLowStockThreshold(category, threshold) {
    await this.delay(200);
    this.settings.lowStockThresholds[category] = parseInt(threshold);
    return { ...this.settings.lowStockThresholds };
  }

  async updatePreferences(preferences) {
    await this.delay(300);
    this.settings.preferences = { ...this.settings.preferences, ...preferences };
    return { ...this.settings.preferences };
  }

  async addPaymentMethod(method) {
    await this.delay(250);
    if (!this.settings.paymentMethods.includes(method)) {
      this.settings.paymentMethods.push(method);
    }
    return [...this.settings.paymentMethods];
  }

  async removePaymentMethod(method) {
    await this.delay(250);
    this.settings.paymentMethods = this.settings.paymentMethods.filter(m => m !== method);
    return [...this.settings.paymentMethods];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new SettingsService();