Local Setup Reminder – Files not included in Git

These are files and folders required for local development that are normally excluded from version control:

1. Environment Variables
   - .env.local
     - NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=<your-anon-key>

2. Next.js Build Cache
   - .next/

3. Node Modules
   - node_modules/


Notes:
- Always restart the dev server after updating .env.local.