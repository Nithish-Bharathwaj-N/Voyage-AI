import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp up to 100 users
    { duration: '1m', target: 100 },  // Stay at 100
    { duration: '30s', target: 500 }, // Ramp up to 500
    { duration: '1m', target: 500 },  // Stay at 500
    { duration: '30s', target: 1000 }, // Ramp up to 1000
    { duration: '1m', target: 1000 },  // Stay at 1000
    { duration: '30s', target: 0 },   // Scale down
  ],
};

const BASE_URL = __ENV.API_URL || 'http://localhost:4000/api/v1';

export default function () {
  // Check health endpoint
  const res = http.get(`${BASE_URL}/health/ready`);
  
  check(res, {
    'is status 200': (r) => r.status === 200,
    'health check passes': (r) => r.json().status === 'ok',
  });

  sleep(1);
}
