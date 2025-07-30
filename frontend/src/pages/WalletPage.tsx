/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, CreditCard, RefreshCw, TrendingUp, TrendingDown, DollarSign, Activity, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import walletService, { Wallet } from '../services/walletService';

const WalletPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(null);

  // Static transactions for display (can be replaced with real transaction history later)
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', description: 'Venue Booking', amount: -350.00, type: 'debit', category: 'booking' },
    { id: 2, date: '2024-01-10', description: 'Membership Credits', amount: 6000.00, type: 'credit', category: 'membership' },
    { id: 3, date: '2024-01-05', description: 'Event Ticket', amount: -200.00, type: 'debit', category: 'ticket' },
    { id: 4, date: '2024-01-03', description: 'Cashback Reward', amount: 25.00, type: 'credit', category: 'reward' },
  ]);

  // Fetch wallet data
  const fetchWalletData = async () => {
    if (!user?.id || !isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await walletService.getUserWallet(user.id);
      if (response.success && response.data) {
        setWallet(response.data);
        setBalance(response.data.balance); // Balance is already in rupees
      } else {
        // No wallet found, set balance to 0
        setBalance(0);
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    fetchWalletData();
     // eslint-disable-next-line
  }, [user?.id, isAuthenticated]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchWalletData();
    setIsRefreshing(false);
  };

  const getTransactionIcon = (type: string, category: string) => {
    if (type === 'credit') return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />;
    return <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden mt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-60 sm:h-60 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className={`relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl transform hover:rotate-12 transition-transform duration-300">
                <WalletIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1 text-cyan-400 text-xs sm:text-sm">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium tracking-wide uppercase">Financial Hub</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  My Wallet
                </h1>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="group p-3 sm:p-4 hover:bg-gray-800/50 bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-gray-700/50 hover:border-gray-600/50"
              title="Refresh Wallet"
            >
              <RefreshCw className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-white transition-all duration-300 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            </button>
          </div>

          {/* Stats Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            {/* Balance Card */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">Total Balance</h2>
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {loading ? (
                    <div className="animate-pulse bg-gray-700 h-12 w-32 rounded"></div>
                  ) : (
                    `₹${balance.toFixed(2)}`
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  {!isAuthenticated ? 'Please login to view balance' : 'Available credits'}
                </p>
              </div>
            </div>



            {/* Expenses Card */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-3xl relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">Total Expenses</h2>
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg sm:rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 mb-2">
                  -₹{totalExpenses.toFixed(2)}
                </div>
                <p className="text-xs sm:text-sm text-gray-400">This month</p>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/50 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg transform hover:rotate-12 transition-transform duration-300">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Transactions</h2>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                {transactions.length} transactions
              </span>
            </div>

            <div className="space-y-1">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`group p-4 sm:p-5 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-600/50 hover:bg-gray-700/30 transform ${hoveredTransaction === transaction.id ? 'scale-102 shadow-lg' : ''}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isVisible ? 'translateX(0) opacity(1)' : 'translateX(-20px) opacity(0)'
                  }}
                  onMouseEnter={() => setHoveredTransaction(transaction.id)}
                  onMouseLeave={() => setHoveredTransaction(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className={`flex-shrink-0 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${transaction.type === 'credit'
                        ? 'bg-green-600/20 group-hover:bg-green-600/30'
                        : 'bg-red-600/20 group-hover:bg-red-600/30'
                        }`}>
                        {getTransactionIcon(transaction.type, transaction.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium sm:font-semibold text-sm sm:text-base text-white group-hover:text-gray-100 transition-colors duration-300 truncate">
                          {transaction.description}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span
                        className={`font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${transaction.type === 'credit'
                            ? 'text-green-400 group-hover:text-green-300'
                            : 'text-red-400 group-hover:text-red-300'
                          }`}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      <div className={`w-2 h-2 rounded-full mt-1 ml-auto transition-all duration-300 ${transaction.type === 'credit' ? 'bg-green-400' : 'bg-red-400'
                        } ${hoveredTransaction === transaction.id ? 'scale-150' : 'scale-100'}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="text-center py-12">
                <WalletIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Please login to view your transactions</p>
                <p className="text-sm text-gray-500">Your wallet data will appear here once you're logged in</p>
              </div>
            )}

            {isAuthenticated && transactions.length === 0 && (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No transactions yet</p>
                <p className="text-sm text-gray-500">Your transactions will appear here</p>
              </div>
            )}
          </div>

          {/* Floating particles */}
          <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-32 sm:top-40 right-12 sm:right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-24 sm:bottom-32 left-12 sm:left-20 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;