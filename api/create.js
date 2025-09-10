// File location: /api/create.js

import { kv } from '@vercel/kv';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed.' });
  }
  try {
    const conversationData = request.body;
    const id = uuidv4().replace(/-/g, ''); // Create a shorter ID

    // Store the chat data in the Vercel KV database for 30 days
    await kv.set(`chat:${id}`, conversationData, { ex: 2592000 }); 

    return response.status(200).json({ id: id });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'An error occurred while creating the share link.' });
  }
}