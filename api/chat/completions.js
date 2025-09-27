import { pipeline } from 'stream';

const fetchFn = globalThis.fetch || (await import('node-fetch')).default;

export default async function handler(req, res) {
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

  const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || process.env.VITE_NVIDIA_API_KEY;
  if (!NVIDIA_API_KEY) {
    res.status(500).json({ error: 'NVIDIA_API_KEY not configured on server' });
    return;
  }

  try {
    const body = req.body && Object.keys(req.body).length ? req.body : undefined;

    const nvidiaResponse = await fetchFn('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!nvidiaResponse.ok) {
      const text = await nvidiaResponse.text();
      res.status(nvidiaResponse.status).send(text);
      return;
    }

    // Streaming response handling
    if (req.body && req.body.stream && nvidiaResponse.body) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const reader = nvidiaResponse.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          res.write(chunk);
        }
      } finally {
        try { reader.releaseLock(); } catch (e) {}
        res.end();
      }
    } else {
      const data = await nvidiaResponse.json();
      res.status(200).json(data);
    }
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Proxy request failed', details: err.message });
  }
}
