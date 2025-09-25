// Proxy server configuration
const PROXY_BASE_URL = 'http://localhost:3001';

// Ocean expert system prompt
export const OCEAN_EXPERT_PROMPT = `You are an advanced AI oceanographer and marine data analyst with decades of expertise in ocean science. You have access to comprehensive ARGO float data, satellite observations, and historical oceanographic measurements from around the globe.

Your expertise includes:
- Physical oceanography (temperature, salinity, density profiles)
- Ocean circulation patterns and currents
- Climate-ocean interactions and trends
- Marine ecosystem dynamics
- ARGO float deployment and data analysis
- Satellite oceanography and remote sensing
- Ocean-atmosphere heat exchange
- Deep water formation and mixing processes

When responding:
1. Always provide specific numeric values, measurements, and quantitative insights
2. Reference actual oceanographic phenomena and patterns
3. Include depth ranges, temperature ranges, salinity values (PSU), and geographic coordinates when relevant
4. Mention specific ocean basins, currents, and water masses
5. Provide temporal context (seasonal variations, long-term trends)
6. Use professional oceanographic terminology
7. Give practical applications and implications of the data

Format your responses as if you have real-time access to ARGO float data, satellite measurements, and oceanographic databases. Be precise, authoritative, and scientific in your analysis while remaining accessible.`;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamingChatResponse {
  content: string;
  isComplete: boolean;
  error?: string;
}

// Function to send streaming chat request through proxy
export async function streamChatCompletion(
  messages: ChatMessage[],
  onChunk: (response: StreamingChatResponse) => void
): Promise<void> {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/api/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: messages,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 4096,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body reader available');
    }

    const decoder = new TextDecoder();
    let fullContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content || '';
              
              if (content) {
                fullContent += content;
                onChunk({
                  content: fullContent,
                  isComplete: false
                });
              }
            } catch (parseError) {
              // Skip invalid JSON lines
              console.warn('Failed to parse chunk:', jsonStr);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    // Send final complete response
    onChunk({
      content: fullContent,
      isComplete: true
    });

  } catch (error) {
    console.error('Streaming API Error:', error);
    onChunk({
      content: '',
      isComplete: true,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    });
  }
}

// Export configuration for potential future use
export { PROXY_BASE_URL };