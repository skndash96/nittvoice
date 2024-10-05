import { createClient as _createClient } from '@supabase/supabase-js';

export function createClient(token?: string) {
    if (token) {
        return _createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                async accessToken() {
                    return token;
                }
            }
        );
    } else {
        return _createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }
}
