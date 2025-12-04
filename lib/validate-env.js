/**
 * Environment variable validation
 * Ensures all required variables are set before app starts
 * Prevents silent failures in production
 */

const REQUIRED_ENV_VARS = [
  'GEMINI_API_KEY',
  'RESEND_API_KEY',
  'FROM_EMAIL',
  'STRIPE_SECRET_KEY',
];

const OPTIONAL_ENV_VARS = [
  'AI_PROVIDER', // defaults to 'gemini'
];

/**
 * Validate environment at startup
 * Call this in layout.js or early in app startup
 */
export function validateEnvironment() {
  const missing = [];
  const configured = [];

  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    } else {
      configured.push(varName);
    }
  }

  // Log configuration status
  console.log('=== Environment Configuration ===');
  console.log('✓ Configured:', configured.join(', '));

  if (missing.length > 0) {
    const message = `❌ CRITICAL: Missing required environment variables: ${missing.join(', ')}\n` +
      `These must be set in .env.local or Vercel Environment Variables before the app can run.`;
    
    console.error(message);
    
    // In production, throw error to prevent app from starting
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message);
    }
  }

  console.log('Optional:', OPTIONAL_ENV_VARS.map(v => 
    process.env[v] ? `${v}=${process.env[v]}` : `${v}=<default>`
  ).join(', '));

  console.log('===================================');

  return missing.length === 0;
}

/**
 * Validate specific environment variable
 */
export function validateEnvVar(varName) {
  if (!process.env[varName]) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
  return process.env[varName];
}
