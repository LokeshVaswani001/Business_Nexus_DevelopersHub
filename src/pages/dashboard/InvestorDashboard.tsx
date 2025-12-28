import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  if (!user) return null;

  const sentRequests = getRequestsFromInvestor(user.id);

  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch =
      searchQuery === '' ||
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(entrepreneur.industry);

    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with entrepreneurs</p>
        </div>

        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>
            View All
          </Button>
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search startups..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          startAdornment={<Search size={18} />}
          fullWidth
        />

        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={18} className="text-gray-500" />
          {industries.map(industry => (
            <button
              key={industry}
              type="button"
              onClick={() => toggleIndustry(industry)}
            >
              <Badge
                variant={
                  selectedIndustries.includes(industry)
                    ? 'primary'
                    : 'gray'
                }
              >
                {industry}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="flex items-center gap-4">
            <Users />
            <div>
              <p className="text-sm text-gray-600">Total Startups</p>
              <h3 className="text-xl font-semibold">{entrepreneurs.length}</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <PieChart />
            <div>
              <p className="text-sm text-gray-600">Industries</p>
              <h3 className="text-xl font-semibold">{industries.length}</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <Users />
            <div>
              <p className="text-sm text-gray-600">Connections</p>
              <h3 className="text-xl font-semibold">
                {sentRequests.filter(r => r.status === 'accepted').length}
              </h3>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Entrepreneurs */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Featured Startups</h2>
        </CardHeader>

        <CardBody>
          {filteredEntrepreneurs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntrepreneurs.map(e => (
                <EntrepreneurCard key={e.id} entrepreneur={e} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No results found</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
