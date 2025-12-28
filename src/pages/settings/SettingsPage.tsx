import React, { useState } from 'react';

const getStrength = (password: string) => {
  if (password.length < 6) return 'Weak';
  if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return 'Strong';
  return 'Medium';
};

const SettingsPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const strength = getStrength(password);

  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-xl font-semibold">Security Settings</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-3">
        <label className="text-sm font-medium">New Password</label>

        <input
          type="password"
          className="w-full border rounded px-3 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-sm">
          Strength:{' '}
          <span
            className={
              strength === 'Strong'
                ? 'text-green-600'
                : strength === 'Medium'
                ? 'text-yellow-600'
                : 'text-red-600'
            }
          >
            {strength}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
