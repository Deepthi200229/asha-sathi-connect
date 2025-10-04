import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eykxikjqpocklmdkgdxp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5a3hpa2pxcG9ja2xtZGtnZHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDA0MTcsImV4cCI6MjA3NTE3NjQxN30.7-JtuLeA_2lixnpnp7K1-oopQpKRwSs8fYaYU8AZ7n0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
