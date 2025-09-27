// Minimal serverless function without extra type deps.
// Avoids `@vercel/node` and `node-fetch` to keep build simple.
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */

const fetchFn: typeof fetch = globalThis.fetch;

// Use loose types compatible with Vercel/Node runtime
export default async function handler(req: Request & { body?: any }, res: any) {
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
  if (body && (body as any).stream && nvidiaResponse.body) {
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
          // Node-compatible res.write
          if (typeof res.write === 'function') res.write(chunk);
        }
      } catch (streamErr) {
        // Propagate stream error
        console.error('Stream error:', streamErr);
      } finally {
        res.end();
      }
    } else {
      const data = await nvidiaResponse.json();
      res.status(200).json(data);
    }
  } catch (err) {
    // err may not be Error in some runtimes
    const message = err && (err as any).message ? (err as any).message : String(err);
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Proxy request failed', details: message });
  }
}