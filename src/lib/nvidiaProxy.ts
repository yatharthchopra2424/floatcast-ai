// Client helper to call the serverless proxy for NVIDIA chat completions
export async function createChatCompletion(payload: any) {
  const resp = await fetch('/api/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Proxy error ${resp.status}: ${text}`);
  }

  // If the response is event-stream/text, the caller should handle streaming separately.
  const contentType = resp.headers.get('content-type') || '';
  if (contentType.includes('text/event-stream') || contentType.includes('text/plain')) {
    return resp.body; // caller can getReader() and stream
  }

  return resp.json();
}
