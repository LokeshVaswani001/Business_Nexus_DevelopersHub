import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TwoFactor: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const verifyOtp = () => {
    if (otp.length === 6) {
      navigate('/dashboard/entrepreneur');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow w-80 space-y-4">
        <h2 className="text-lg font-semibold text-center">2FA Verification</h2>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          className="w-full border rounded px-3 py-2 text-center tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-primary-600 text-white py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default TwoFactor;
