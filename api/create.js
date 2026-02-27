// File location: /api/create.js

import { kv } from '@vercel/kv';

const allowedOrigins = [
  'https://eyux.vercel.app',
  'https://eyux.netlify.app',
];

export default async function handler(request, response) {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }

  // --- START: CORS Preflight Request Handling ---
  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response.status(200).end();
  }
  // --- END: CORS Preflight Request Handling ---

  // Handle the actual POST request
  if (request.method === 'POST') {
    try {
      const conversationData = request.body;
      const id = conversationData.id;

      if (!id) {
        return response.status(400).json({ message: 'Conversation ID is missing.' });
      }

      await kv.set(`chat:${id}`, conversationData, { ex: 2592000 });

      return response.status(200).json({ id });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: 'An error occurred while creating the share link.' });
    }
  }

  return response.status(405).json({ message: 'Method not allowed.' });
}
