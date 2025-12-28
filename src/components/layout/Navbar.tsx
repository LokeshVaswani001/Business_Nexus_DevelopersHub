import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  MessageCircle,
  User,
  LogOut,
  Building2,
  CircleDollarSign,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardRoute =
    user?.role === 'entrepreneur'
      ? '/dashboard/entrepreneur'
      : '/dashboard/investor';

  const profileRoute = user
    ? `/profile/${user.role}/${user.id}`
    : '/login';

  const navLinks = [
    {
      icon:
        user?.role === 'entrepreneur'
          ? <Building2 size={18} />
          : <CircleDollarSign size={18} />,
      text: 'Dashboard',
      path: dashboardRoute,
    },
    { icon: <MessageCircle size={18} />, text: 'Messages', path: '/messages' },
    { icon: <Bell size={18} />, text: 'Notifications', path: '/notifications' },
    { icon: <User size={18} />, text: 'Profile', path: profileRoute },
  ];

  return (
    <nav className="bg-white shadow-md text-gray-900">
      {/* 👆 MOST IMPORTANT LINE */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">BN</span>
              </div>
              <span className="text-lg font-bold">
                Business Nexus
              </span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {navLinks.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(link.path)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.text}
                  </button>
                ))}

                <Button
                  variant="ghost"
                  className="!text-gray-800"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={18} />}
                >
                  Logout
                </Button>

                <button
                  onClick={() => navigate(profileRoute)}
                  className="flex items-center space-x-2 ml-2"
                >
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? 'online' : 'offline'}
                  />
                  <span className="text-sm font-medium">
                    {user.name}
                  </span>
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="!text-gray-800"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>

                <Button
                  className="!text-white"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:text-primary-600 hover:bg-gray-50"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
