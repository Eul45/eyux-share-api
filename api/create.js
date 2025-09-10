// File location: /api/create.js
// --- CORRECTED VERSION ---

import { kv } from '@vercel/kv';
// uuid is no longer needed here, so we can remove it.

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed.' });
  }
  try {
    const conversationData = request.body;
    
    // --- THIS IS THE KEY CHANGE ---
    // We will now use the conversation's OWN ID from the app.
    const id = conversationData.id; 

    if (!id) {
        return response.status(400).json({ message: 'Conversation ID is missing.' });
    }

    // Store the chat data using its original ID for 30 days
    await kv.set(`chat:${id}`, conversationData, { ex: 2592000 }); 

    // Send back the ID that was used.
    return response.status(200).json({ id: id });
  } catch (error)
  {
    console.error(error);
    return response.status(500).json({ message: 'An error occurred while creating the share link.' });
  }
}
