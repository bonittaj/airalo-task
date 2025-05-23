import { request } from '@playwright/test';

async function generateAccessToken() {
  const requestContext = await request.newContext();
  const tokenResponse = await requestContext.post(`${process.env.API_URL}/token`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
  });

  if (!tokenResponse.ok()) {
    throw new Error("Token Generation failed");
  }

  const body = await tokenResponse.json();
  return body.data.access_token;
}

module.exports = { generateAccessToken };
