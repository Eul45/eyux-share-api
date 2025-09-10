// File: /api/read/[id].js

import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    const { id } = request.query;
    const conversationData = await kv.get(`chat:${id}`);

    if (!conversationData) {
      return response.status(404).json({ message: 'This shared chat could not be found. It may have expired.' });
    }
    
    // The setHeader line was here and is now removed.
    return response.status(200).json(conversationData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'An error occurred while fetching the chat data.' });
  }
}
