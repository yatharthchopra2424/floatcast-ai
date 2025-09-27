// Serverless function for Vercel to proxy requests to NVIDIA API.
// This keeps the NVIDIA API key on the server and out of the client bundle.

const fetch = globalThis.fetch || require('node-fetch');

module.exports = async (req, res) => {
  // Allow simple CORS from your front-end (adjust allowed origin in production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, use POST' });
    return;
  }

  const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
  if (!NVIDIA_API_KEY) {
    res.status(500).json({ error: 'NVIDIA_API_KEY not configured on server' });
    return;
  }

  try {
    // Forward body to NVIDIA endpoint. Adjust URL/path as needed.
    const body = req.body && Object.keys(req.body).length ? req.body : undefined;

    const nvidiaResponse = await fetch('https://api.nvidia.com/your/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const text = await nvidiaResponse.text();
    // Try to parse JSON, otherwise return text.
    try {
      const data = JSON.parse(text);
      res.status(nvidiaResponse.status).json(data);
    } catch (e) {
      res.status(nvidiaResponse.status).send(text);
    }
  } catch (err) {
    res.status(502).json({ error: 'Proxy request failed', details: err.message });
  }
};
