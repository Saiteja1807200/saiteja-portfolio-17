import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Mail, Building, Calendar, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface AccessRequest {
  id: string;
  name: string;
  email: string;
  message: string | null;
  status: string;
  created_at: string;
}

const AccessRequestManager = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([]);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from('access_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setRequests(data);
  };

  useEffect(() => { fetchRequests(); }, []);

  const approveRequest = async (req: AccessRequest) => {
    // Generate access token with requester's name as label
    const expires_at = new Date(Date.now() + 30 * 86400000).toISOString(); // 30 days
    const { error: tokenError } = await supabase.from('access_tokens').insert({
      label: `${req.name} (${req.email})`,
      expires_at,
    });

    if (tokenError) {
      toast.error('Failed to generate access token');
      return;
    }

    // Update request status
    const { error } = await supabase
      .from('access_requests')
      .update({ status: 'approved' })
      .eq('id', req.id);

    if (error) {
      toast.error('Failed to update request status');
    } else {
      toast.success(`Approved request from ${req.name}. Access token created!`);
      fetchRequests();
    }
  };

  const rejectRequest = async (id: string) => {
    const { error } = await supabase
      .from('access_requests')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) {
      toast.error('Failed to reject request');
    } else {
      toast.success('Request rejected');
      fetchRequests();
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const statusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Access Requests</h2>
        {pendingCount > 0 && (
          <Badge className="bg-primary/20 text-primary border-primary/30 ml-2">
            {pendingCount} pending
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Review and manage portfolio access requests from visitors.
      </p>

      <div className="space-y-3">
        {requests.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No access requests yet.</p>
        )}
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex flex-col gap-3 p-4 border border-white/10 rounded-xl bg-background/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-muted-foreground" />
                    {req.name}
                  </span>
                  {statusBadge(req.status)}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {req.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {format(new Date(req.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                {req.message && (
                  <p className="text-sm text-foreground/70 flex items-start gap-1.5 mt-2">
                    <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    {req.message}
                  </p>
                )}
              </div>
              {req.status === 'pending' && (
                <div className="flex items-center gap-2 shrink-0">
                  <Button size="sm" onClick={() => approveRequest(req)} className="gap-1.5">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => rejectRequest(req.id)} className="text-destructive hover:text-destructive gap-1.5">
                    <X className="h-3.5 w-3.5" /> Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessRequestManager;
