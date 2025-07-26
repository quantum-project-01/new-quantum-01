import React, { useState } from 'react';
import { Wallet as WalletIcon, CreditCard, RefreshCw } from 'lucide-react';

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(1250.75);
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', description: 'Venue Booking', amount: -350.00, type: 'debit' },
    { id: 2, date: '2024-01-10', description: 'Refund', amount: 50.00, type: 'credit' },
    { id: 3, date: '2024-01-05', description: 'Event Ticket', amount: -200.00, type: 'debit' },
  ]);

  const handleRefresh = () => {
    // Simulate fetching latest balance and transactions
    console.log('Refreshing wallet data...');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <WalletIcon className="h-10 w-10 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Wallet
            </h1>
          </div>
          <button 
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Refresh Wallet"
          >
            <RefreshCw className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-300">Total Balance</h2>
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ${balance.toFixed(2)}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                Add Funds
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Recent Transactions</h2>
          <div className="divide-y divide-gray-700">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
                <span 
                  className={`font-bold ${
                    transaction.type === 'credit' 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage; 