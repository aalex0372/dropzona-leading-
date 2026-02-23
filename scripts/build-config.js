#!/usr/bin/env node
/**
 * Vercel (or any CI): create config.js from env so Supabase keys are never in the repo.
 * Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel project Environment Variables.
 */
const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

const out = `// Generated at build time — do not edit
window.SUPABASE_URL = ${JSON.stringify(url)};
window.SUPABASE_ANON_KEY = ${JSON.stringify(key)};
`;

const dir = path.resolve(__dirname, '..');
fs.writeFileSync(path.join(dir, 'config.js'), out, 'utf8');
console.log('config.js written from env');
