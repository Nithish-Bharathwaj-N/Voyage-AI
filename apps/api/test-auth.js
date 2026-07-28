const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const SUPABASE_URL = 'https://nrykcryzchumbahdgzdt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dKxfybhj44kY_JMZ7B3T4Q_hSjhKJ3P';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const email = `voyagetestuser${Date.now()}@gmail.com`;
  const password = 'Password123!';
  
  console.log(`[1] Signing up ${email}...`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error("SignUp Error:", error.message);
    return;
  }
  
  console.log("[2] Auth Success! JWT:", data.session ? data.session.access_token.substring(0, 20) : "No session created (Email confirmation required?)");
  console.log("Full auth data:", data);
}

main();
