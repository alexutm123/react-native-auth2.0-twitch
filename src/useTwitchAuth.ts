// useTwitchAuth.ts
import { useEffect, useState, useCallback, useRef } from 'react';
import { Linking } from 'react-native';
import Auth20Twitch from './NativeAuth20Twitch';

interface AuthOptions {
  clientId: string;
  redirectUri: string;
  scopes?: string[];
  onSuccess?: (code: string) => void;
  onError?: (error: Error) => void;
}

export function useTwitchAuth({
  clientId,
  redirectUri,
  scopes = ['user:read:email'],
  onSuccess,
  onError,
}: AuthOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stateRef = useRef('');

  function parseQuery(query: string): Record<string, string> {
    return query
      .split('&')
      .map(param => param.split('='))
      .reduce<Record<string, string>>((acc, [key, value]) => {
        if (key !== undefined) {
          acc[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
        }
        return acc;
      }, {});      
  }

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      const query = url.split('?')[1];
      if (!query) return;

      const params = parseQuery(query);
      const code = params['code'];
      const returnedState = params['state'];

      if (!code) {
        const err = new Error('No code in URL');
        setError(err.message);
        onError?.(err);
        return;
      }

      if (stateRef.current !== returnedState) {
        const err = new Error('Invalid state');
        setError(err.message);
        onError?.(err);
        return;
      }

      onSuccess?.(code);
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, [onSuccess, onError]);

  const startAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    const state = Math.random().toString(36).substring(2);
    stateRef.current = state;

    const url =
      `https://id.twitch.tv/oauth2/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scopes.join(' '))}` +
      `&state=${encodeURIComponent(state)}`;

    try {
      const opened = await Auth20Twitch.open(url);
      if (!opened) {
        throw new Error('Could not open auth window');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [clientId, redirectUri, scopes]);

  return { startAuth, loading, error };
}
