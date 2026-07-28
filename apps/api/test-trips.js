const axios = require('axios');
const crypto = require('crypto');
function signJwt(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodeBase64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const encodedHeader = encodeBase64Url(header);
  const encodedPayload = encodeBase64Url(payload);
  const signature = crypto.createHmac('sha256', secret).update(`${encodedHeader}.${encodedPayload}`).digest('base64url');
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
const API_URL = 'http://localhost:3001/api/v1';
const token = signJwt({ sub: 'b43fc3b9-28b3-41d3-8d35-1355f172247f', email: 'test@example.com' }, 'super-secret-jwt-key-that-should-be-replaced');
axios.get(`${API_URL}/trips`, { headers: { Authorization: `Bearer ${token}` } })
  .then(res => console.log('Trips:', res.data.length))
  .catch(err => console.error('Trips Error:', err.response?.data || err.message));
