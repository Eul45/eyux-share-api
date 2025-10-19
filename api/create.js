// File location: /api/create.js

import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // --- START: CORS Preflight Request Handling ---
  // This part is crucial for allowing requests from your web app.
  // It handles the browser's security check before the actual POST request is sent.
  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Origin', 'https://eyux.vercel.app');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response.status(200).end();
  }
  // --- END: CORS Preflight Request Handling ---

  // Set CORS header for the actual POST request
  response.setHeader('Access-Control-Allow-Origin', 'https://eyux.vercel.app');

  // Handle the actual POST request
  if (request.method === 'POST') {
    try {
      const conversationData = request.body;
      const id = conversationData.id;

      if (!id) {
          return response.status(400).json({ message: 'Conversation ID is missing.' });
      }

      // Store the chat data using its original ID for 30 days
      await kv.set(`chat:${id}`, conversationData, { ex: 2592000 }); 

      // Send back the ID that was used.
      return response.status(200).json({ id: id });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'An error occurred while creating the share link.' });
    }
  }

  // If any other method is used, deny it.
  return response.status(405).json({ message: 'Method not allowed.' });
}
