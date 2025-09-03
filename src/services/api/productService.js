import productsData from "@/services/mockData/products.json";

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.products];
  }

  async getById(id) {
    await this.delay(200);
    const product = this.products.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  }

  async searchProducts(query) {
    await this.delay(250);
    if (!query || query.trim() === "") {
      return [...this.products];
    }
    
    const searchQuery = query.toLowerCase().trim();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.sku.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
  }

  async getByCategory(category) {
    await this.delay(300);
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getLowStockProducts() {
    await this.delay(300);
    return this.products.filter(product => product.stock <= product.lowStockThreshold);
  }

  async create(productData) {
    await this.delay(400);
    const newId = Math.max(...this.products.map(p => p.Id)) + 1;
    const newProduct = {
      Id: newId,
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      lowStockThreshold: parseInt(productData.lowStockThreshold || 5)
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, productData) {
    await this.delay(350);
    const index = this.products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    this.products[index] = {
      ...this.products[index],
      ...productData,
      Id: parseInt(id),
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      lowStockThreshold: parseInt(productData.lowStockThreshold || 5)
    };
    return { ...this.products[index] };
  }

  async updateStock(id, newStock) {
    await this.delay(200);
    const index = this.products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    this.products[index].stock = parseInt(newStock);
    return { ...this.products[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    this.products.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ProductService();