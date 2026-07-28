const { Client } = require('pg');
const regions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2', 'eu-west-1', 'eu-west-2', 'eu-central-1', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'sa-east-1', 'ca-central-1'];
async function test() {
  for (const region of regions) {
    const url = `postgresql://postgres.nrykcryzchumbahdgzdt:Nithish2008*@aws-0-${region}.pooler.supabase.com:6543/postgres?sslmode=require`;
    const client = new Client({ connectionString: url });
    try {
      await client.connect();
      console.log(`Success: ${region}`);
      client.end();
      return;
    } catch (e) {
      if (e.message.includes('password authentication failed')) {
        console.log(`Found region (auth failed): ${region}`);
        return;
      }
      if (!e.message.includes('not found')) {
         console.log(`${region}: ${e.message}`);
      }
    }
  }
}
test();
