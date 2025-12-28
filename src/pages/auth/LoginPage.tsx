import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  CircleDollarSign,
  Building2,
  LogIn,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(
        role === 'entrepreneur'
          ? '/dashboard/entrepreneur'
          : '/dashboard/investor',
        { replace: true }
      );
    }
  }, [isAuthenticated, isLoading, navigate, role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFormLoading(true);

    try {
      await login(email, password, role);
    } catch (err) {
      setError((err as Error).message);
      setFormLoading(false);
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    setEmail(
      userRole === 'entrepreneur'
        ? 'sarah@techwave.io'
        : 'michael@vcinnovate.com'
    );
    setPassword('password123');
    setRole(userRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to Business Nexus
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connect investors & entrepreneurs in one platform
        </p>

        {error && (
          <div className="mt-4 bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('entrepreneur')}
              className={`py-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium ${
                role === 'entrepreneur'
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building2 size={18} />
              Entrepreneur
            </button>

            <button
              type="button"
              onClick={() => setRole('investor')}
              className={`py-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium ${
                role === 'investor'
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CircleDollarSign size={18} />
              Investor
            </button>
          </div>

          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            startAdornment={<User size={18} />}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            isLoading={formLoading || isLoading}
            leftIcon={<LogIn size={18} />}
          >
            Sign in
          </Button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => fillDemoCredentials('entrepreneur')}
          >
            Entrepreneur Demo
          </Button>
          <Button
            variant="outline"
            onClick={() => fillDemoCredentials('investor')}
          >
            Investor Demo
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-primary-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
