import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] =
    useState<CollaborationRequest[]>([]);

  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);

  const handleRequestStatusUpdate = (
    requestId: string,
    status: 'accepted' | 'rejected'
  ) => {
    setCollaborationRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(
    req => req.status === 'pending'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your startup today
          </p>
        </div>

        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>
            Find Investors
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="flex items-center gap-4">
            <Bell />
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <h3 className="text-xl font-semibold">
                {pendingRequests.length}
              </h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <Users />
            <div>
              <p className="text-sm text-gray-600">Connections</p>
              <h3 className="text-xl font-semibold">
                {collaborationRequests.filter(r => r.status === 'accepted').length}
              </h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <Calendar />
            <div>
              <p className="text-sm text-gray-600">Upcoming Meetings</p>
              <h3 className="text-xl font-semibold">2</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <TrendingUp />
            <div>
              <p className="text-sm text-gray-600">Profile Views</p>
              <h3 className="text-xl font-semibold">24</h3>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Collaboration Requests */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Collaboration Requests</h2>
          <Badge variant="primary">{pendingRequests.length} pending</Badge>
        </CardHeader>

        <CardBody>
          {collaborationRequests.length > 0 ? (
            <div className="space-y-4">
              {collaborationRequests.map(request => (
                <CollaborationRequestCard
                  key={request.id}
                  request={request}
                  onStatusUpdate={handleRequestStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">
                No collaboration requests yet
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
