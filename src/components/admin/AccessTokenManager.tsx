import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, Trash2, Plus, Eye, Link2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface AccessToken {
  id: string;
  token: string;
  label: string | null;
  expires_at: string | null;
  view_count: number;
  created_at: string;
}

const AccessTokenManager = () => {
  const [tokens, setTokens] = useState<AccessToken[]>([]);
  const [label, setLabel] = useState('');
  const [expiryDays, setExpiryDays] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTokens = async () => {
    const { data } = await supabase
      .from('access_tokens')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setTokens(data);
  };

  useEffect(() => { fetchTokens(); }, []);

  const createToken = async () => {
    setLoading(true);
    const expires_at = expiryDays
      ? new Date(Date.now() + parseInt(expiryDays) * 86400000).toISOString()
      : null;

    const { error } = await supabase.from('access_tokens').insert({
      label: label || null,
      expires_at,
    });

    if (error) {
      toast.error('Failed to create token');
    } else {
      toast.success('Access link created');
      setLabel('');
      setExpiryDays('');
      fetchTokens();
    }
    setLoading(false);
  };

  const deleteToken = async (id: string) => {
    await supabase.from('access_tokens').delete().eq('id', id);
    toast.success('Token deleted');
    fetchTokens();
  };

  const copyLink = (token: string) => {
    const publishedOrigin = 'https://saitejaakinepellii.lovable.app';
    const url = `${publishedOrigin}/?access=${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };

  const isExpired = (expires_at: string | null) => {
    if (!expires_at) return false;
    return new Date(expires_at) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Portfolio Access Links</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Generate unique links to share your portfolio images with recruiters. Each link tracks views.
      </p>

      {/* Create new token */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 border border-white/10 rounded-xl bg-background/50">
        <Input
          placeholder="Label (e.g. Google Recruiter)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Expires in (days, empty = never)"
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value.replace(/\D/g, ''))}
          className="w-full sm:w-40"
        />
        <Button onClick={createToken} disabled={loading} className="gap-2">
          <Plus className="h-4 w-4" /> Generate
        </Button>
      </div>

      {/* Token list */}
      <div className="space-y-3">
        {tokens.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No access links yet. Create one above.</p>
        )}
        {tokens.map((t) => (
          <div
            key={t.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-white/10 rounded-xl bg-background/50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground truncate">
                  {t.label || 'Untitled'}
                </span>
                {isExpired(t.expires_at) && (
                  <Badge variant="destructive" className="text-[10px]">Expired</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {t.view_count} views
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {format(new Date(t.created_at), 'MMM d, yyyy')}
                </span>
                {t.expires_at && (
                  <span>
                    Expires: {format(new Date(t.expires_at), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => copyLink(t.token)} className="gap-1.5">
                <Copy className="h-3.5 w-3.5" /> Copy Link
              </Button>
              <Button size="sm" variant="ghost" onClick={() => deleteToken(t.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessTokenManager;
