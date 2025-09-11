# EyuX Share API

This repository contains the serverless backend for the **EyuX AI Assistant** Android app. Its purpose is to provide a simple, secure, and reliable way for users to share their conversations via a unique web link.
 
 ![Demo](assets/Demo.gif) 
 
## How It Works

This API is built on the Vercel serverless platform and leverages Vercel KV (powered by Upstash Redis) for temporary data storage.

The service consists of two primary API endpoints:

1.  **/api/create**: An endpoint that accepts a `POST` request containing the JSON data of a conversation from the EyuX app. It stores this data in the KV store with a unique ID and a 30-day expiration.
2.  **/api/read/[id]**: A dynamic endpoint that accepts a `GET` request. It retrieves the conversation data corresponding to the provided ID from the KV store and returns it.

This allows a separate, static web viewer (like the one hosted on GitHub Pages) to fetch and render the conversation for anyone with the link.

### Technology Stack

-   **Hosting & Functions:** [Vercel](https://vercel.com/)
-   **Database:** [Vercel KV (Upstash Redis)](https://vercel.com/storage/kv)
-   **Language:** JavaScript (Node.js)
