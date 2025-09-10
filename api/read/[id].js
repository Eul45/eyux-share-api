// File location: /api/read/[id].js

import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    const { id } = request.query; // Get the ID from the URL
    const conversationData = await kv.get(`chat:${id}`);

    if (!conversationData) {
      return response.status(404).json({ message: 'This shared chat could not be found. It may have expired.' });
    }
    
    // Add a header to allow your viewer.html page to access this data
    response.setHeader('Access-Control-Allow-Origin', '*');
    return response.status(200).json(conversationData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'An error occurred while fetching the chat data.' });
  }
}
