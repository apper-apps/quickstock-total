import React, { useState, useEffect } from "react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import TransactionCard from "@/components/molecules/TransactionCard";
import StatsCard from "@/components/molecules/StatsCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import transactionService from "@/services/api/transactionService";

const SalesScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    todaysSales: 0,
    todaysTransactions: 0,
    weekSales: 0,
    monthSales: 0
  });

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await transactionService.getAll();
      setTransactions(data);
      
      // Calculate stats
      const today = new Date();
      const weekAgo = subDays(today, 7);
      const monthAgo = subDays(today, 30);
      
      const todayStart = startOfDay(today);
      const todayEnd = endOfDay(today);
      
      const todaysTransactions = data.filter(t => {
        const transactionDate = new Date(t.timestamp);
        return transactionDate >= todayStart && transactionDate <= todayEnd;
      });
      
      const weekTransactions = data.filter(t => 
        new Date(t.timestamp) >= weekAgo
      );
      
      const monthTransactions = data.filter(t => 
        new Date(t.timestamp) >= monthAgo
      );
      
      setStats({
        todaysSales: todaysTransactions.reduce((sum, t) => sum + t.total, 0),
        todaysTransactions: todaysTransactions.length,
        weekSales: weekTransactions.reduce((sum, t) => sum + t.total, 0),
        monthSales: monthTransactions.reduce((sum, t) => sum + t.total, 0)
      });
    } catch (err) {
      setError(err.message || "Failed to load sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  if (loading) {
    return <Loading message="Loading sales data..." />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadTransactions}
        title="Failed to load sales"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            Sales Report
          </h1>
          <p className="text-gray-600">Track your sales performance</p>
        </div>
      </div>

      <div className="p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Today's Sales"
            value={stats.todaysSales}
            icon="DollarSign"
            isCurrency={true}
            trend="up"
            trendValue="12"
            className="bg-gradient-to-r from-success-50 to-success-100 border-success-200"
          />
          <StatsCard
            title="Today's Orders"
            value={stats.todaysTransactions}
            icon="ShoppingBag"
            trend="up"
            trendValue="8"
            className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200"
          />
          <StatsCard
            title="This Week"
            value={stats.weekSales}
            icon="TrendingUp"
            isCurrency={true}
            className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-secondary-200"
          />
          <StatsCard
            title="This Month"
            value={stats.monthSales}
            icon="Calendar"
            isCurrency={true}
            className="bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200"
          />
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-display mb-4">
            Recent Transactions
          </h2>
          
          {transactions.length === 0 ? (
            <Empty
              icon="Receipt"
              title="No transactions yet"
              message="Start making sales to see transaction history here."
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {transactions.slice(0, 20).map((transaction) => (
                <TransactionCard 
                  key={transaction.Id} 
                  transaction={transaction} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesScreen;