import { execSync } from 'child_process';

const projectId = process.env.VITE_SUPABASE_PROJECT_ID;

if (!projectId) process.exit(1);

try {
  execSync(`npx supabase gen types typescript --project-id ${projectId} > src/types/db.ts`, { stdio: 'inherit' });
} catch (err) {
  console.error('Error:', JSON.stringify(err))
}