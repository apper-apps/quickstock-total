import transactionsData from "@/services/mockData/transactions.json";

class TransactionService {
  constructor() {
    this.transactions = [...transactionsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.transactions].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  }

  async getById(id) {
    await this.delay(200);
    const transaction = this.transactions.find(t => t.Id === parseInt(id));
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return { ...transaction };
  }

  async getByDateRange(startDate, endDate) {
    await this.delay(300);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.timestamp);
      return transactionDate >= start && transactionDate <= end;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getDailySummary(date) {
    await this.delay(250);
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    
    const dayTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.timestamp);
      return transactionDate >= startOfDay && transactionDate <= endOfDay;
    });
    
    return {
      date: startOfDay.toISOString().split('T')[0],
      transactionCount: dayTransactions.length,
      totalAmount: dayTransactions.reduce((sum, t) => sum + t.total, 0),
      transactions: dayTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    };
  }

  async create(transactionData) {
    await this.delay(400);
    const newId = Math.max(...this.transactions.map(t => t.Id)) + 1;
    const newTransaction = {
      Id: newId,
      items: transactionData.items.map(item => ({
        ...item,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        subtotal: parseFloat(item.subtotal)
      })),
      total: parseFloat(transactionData.total),
      paymentMethod: transactionData.paymentMethod,
      timestamp: new Date().toISOString(),
      status: "completed"
    };
    this.transactions.push(newTransaction);
    return { ...newTransaction };
  }

  async getRecentTransactions(limit = 10) {
    await this.delay(250);
    return [...this.transactions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  async getTotalSales() {
    await this.delay(200);
    return this.transactions.reduce((total, transaction) => total + transaction.total, 0);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new TransactionService();