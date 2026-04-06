import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ACCESS_KEY = 'portfolio_access_token';

export function useAccessToken() {
  const [searchParams] = useSearchParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const validate = async () => {
      // Check URL param first, then localStorage
      const urlToken = searchParams.get('access');
      const storedToken = localStorage.getItem(ACCESS_KEY);
      const token = urlToken || storedToken;

      if (!token) {
        setChecking(false);
        return;
      }

      // Validate token via the database function
      const { data, error } = await supabase.rpc('log_token_view', {
        p_token: token,
        p_viewer_info: { referrer: document.referrer, timestamp: new Date().toISOString() },
      });

      if (!error && data === true) {
        setHasAccess(true);
        localStorage.setItem(ACCESS_KEY, token);
      } else {
        localStorage.removeItem(ACCESS_KEY);
      }

      setChecking(false);
    };

    validate();
  }, [searchParams]);

  return { hasAccess, checking };
}
