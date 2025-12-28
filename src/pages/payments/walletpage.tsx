import React, { useState } from 'react';

type Transaction = {
  id: number;
  type: 'Deposit' | 'Withdraw' | 'Transfer';
  amount: number;
  status: 'Success' | 'Pending';
  to?: string;
};

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(5000);
  const [amount, setAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const handleDeposit = () => {
    if (amount <= 0) return;
    setBalance(balance + amount);
    addTransaction({
      id: Date.now(),
      type: 'Deposit',
      amount,
      status: 'Success',
    });
    setAmount(0);
  };

  const handleWithdraw = () => {
    if (amount <= 0 || amount > balance) return;
    setBalance(balance - amount);
    addTransaction({
      id: Date.now(),
      type: 'Withdraw',
      amount,
      status: 'Success',
    });
    setAmount(0);
  };

  const handleTransfer = () => {
    if (amount <= 0 || amount > balance) return;
    setBalance(balance - amount);
    addTransaction({
      id: Date.now(),
      type: 'Transfer',
      amount,
      status: 'Pending',
      to: 'Entrepreneur',
    });
    setAmount(0);
  };

  return (
    <div className="space-y-8">
      {/* Wallet Balance */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800">Wallet Balance</h2>
        <p className="text-3xl font-bold text-primary-600 mt-2">
          ${balance.toLocaleString()}
        </p>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg p-6 shadow space-y-4">
        <h3 className="text-md font-semibold text-gray-700">Wallet Actions</h3>

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <div className="flex gap-3">
          <button
            onClick={handleDeposit}
            className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm"
          >
            Deposit
          </button>

          <button
            onClick={handleWithdraw}
            className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm"
          >
            Withdraw
          </button>

          <button
            onClick={handleTransfer}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm"
          >
            Transfer
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
          Transaction History
        </h3>

        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b last:border-0">
                  <td className="py-2">{tx.type}</td>
                  <td>${tx.amount}</td>
                  <td
                    className={
                      tx.status === 'Success'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }
                  >
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
