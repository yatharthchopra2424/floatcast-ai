import fetch from 'node-fetch';

const DEFAULT_NVIDIA_BASE = 'https://integrate.api.nvidia.com/v1';

export default async function handler(req, res) {
  // CORS: Allow requests from the frontend. In production you can set
  // CORS_ORIGIN to a specific origin (e.g. https://floatcast-ai.vercel.app)
  const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    // 204 No Content
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = req.body;
    if (!body || (typeof body === 'object' && Object.keys(body).length === 0)) {
      return res.status(400).json({ error: 'Request body is empty. Provide a valid JSON payload for the chat completion.' });
    }

    const key = process.env.NVIDIA_API_KEY;
    if (!key) return res.status(500).json({ error: 'NVIDIA_API_KEY not configured on server' });

    // Enforce server-side max_tokens cap to prevent abusive requests
    const DEFAULT_CLIENT_MAX = 4096;
    const capFromEnv = Number(process.env.BACKEND_MAX_TOKENS_CAP || 0) || 65536; // default server cap
    const requestedTokens = typeof body.max_tokens === 'number' ? body.max_tokens : (Number(body.max_tokens) || DEFAULT_CLIENT_MAX);
    const finalMaxTokens = Math.min(requestedTokens, capFromEnv);

    // Prepare body forwarded to upstream (clone to avoid mutating req.body unexpectedly)
    const forwardBody = Object.assign({}, body, { max_tokens: finalMaxTokens });
    if (requestedTokens !== finalMaxTokens) {
      console.warn(`Requested max_tokens=${requestedTokens} exceeds server cap=${capFromEnv}; capping to ${finalMaxTokens}`);
    }

    // Allow overriding upstream base URL for testing/local setups
    const base = process.env.NVIDIA_BASE_URL || DEFAULT_NVIDIA_BASE;
    const upstreamUrl = `${base.replace(/\/$/, '')}/chat/completions`;

    const r = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(forwardBody),
    });

    const text = await r.text();

    // Return upstream response with status and body
    if (r.ok) {
      try {
        return res.status(r.status).json(JSON.parse(text));
      } catch (e) {
        return res.status(r.status).send(text);
      }
    }

    // Upstream returned an error (400/5xx). Include upstream body text for debugging.
    return res.status(r.status).json({
      error: `Upstream returned ${r.status} ${r.statusText}`,
      upstreamStatus: r.status,
      upstreamBody: (() => {
        try { return JSON.parse(text); } catch (e) { return text; }
      })(),
    });
  } catch (err) {
    console.error('Proxy exception:', err);
    return res.status(502).json({ error: 'proxy failed', details: String(err) });
  }
}
