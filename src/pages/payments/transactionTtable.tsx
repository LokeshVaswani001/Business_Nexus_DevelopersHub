import React from 'react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  sender: string;
  receiver: string;
  status: string;
  date: string;
}

const TransactionTable: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <div className="bg-white rounded shadow">
      <div className="p-4 border-b font-medium">Transaction History</div>

      {transactions.length === 0 ? (
        <p className="p-4 text-gray-500 text-sm">No transactions yet</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t">
                <td className="p-3">{tx.date}</td>
                <td className="p-3">{tx.type}</td>
                <td className="p-3">Rs. {tx.amount}</td>
                <td className="p-3">{tx.sender}</td>
                <td className="p-3">{tx.receiver}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
