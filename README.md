# FloatCast AI - Real-time Ocean Expert Chat

A real-time chat application with an AI oceanographer that provides detailed ocean data analysis and insights using NVIDIA's API.

## Features

- **Real-time Streaming Chat**: Live responses with streaming text
- **Ocean Expert AI**: Specialized oceanography assistant with numeric insights
- **Conversation Memory**: Maintains context across conversations
- **Token Management**: Automatically trims conversation history when reaching 100k tokens
- **Error Handling**: Robust error handling with user feedback

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Key (server-side)**
   - Get your NVIDIA API key from [https://build.nvidia.com/](https://build.nvidia.com/)
   - For local development, create a `.env` file with the server-only variable:
   ```
   NVIDIA_API_KEY=your_nvidia_api_key_here
   ```
   - On Vercel, add `NVIDIA_API_KEY` in Project → Settings → Environment Variables (do NOT use `VITE_` prefix for server-only values).

3. **Run the Application**
   
   **Option 1: Run both frontend and proxy together (Recommended)**
   ```bash
   npm run start:full
   ```
   
   **Option 2: Run separately**
   ```bash
   # Terminal 1: Start the proxy server
   npm run proxy
   
   # Terminal 2: Start the frontend
   npm run dev
   ```

## Architecture Note

This application now uses a **proxy server architecture** to handle CORS issues and keep API keys secure:

- **Frontend**: React app running on port 8081 (or 8080)
- **Proxy Server**: Express.js server running on port 3001
- **API Calls**: Frontend → Proxy → NVIDIA API
- **Security**: API keys are kept on the server side and not exposed to the browser
- **CORS**: Proxy server handles CORS headers to allow browser requests

## How It Works

### Conversation Flow
1. **System Prompt**: Ocean expert persona with detailed scientific knowledge
2. **User Input**: Your question about ocean data
3. **Context Building**: Previous inputs + new input are combined
4. **AI Response**: Streaming response with numeric values and scientific insights
5. **Memory Management**: Keeps conversation under 100k tokens by removing oldest messages

### Token Management
- Monitors conversation length in tokens (≈4 characters per token)
- When reaching 100k tokens, removes oldest 50k tokens worth of messages
- Always preserves the system prompt and recent context

### Example Queries
- "What's the current temperature profile at 2000m depth in the North Atlantic?"
- "Show me salinity measurements between 30-35 PSU in the Indian Ocean"
- "What are the specific ARGO float readings near the Antarctic Circumpolar Current?"
- "Give me exact temperature anomalies with numeric values for the Pacific warm pool"

## Technical Implementation

### Architecture
- **Frontend**: React + TypeScript + Tailwind CSS
- **AI Integration**: OpenAI SDK with NVIDIA base URL
- **Streaming**: Real-time response streaming with chunk processing
- **State Management**: React hooks for conversation and UI state

### Key Components
- `ChatBox.tsx`: Main chat interface with streaming support
- `openaiClient.ts`: API integration and streaming logic
- `tokenManager.ts`: Conversation memory and token counting
- Custom UI components for professional chat experience

### API Configuration (use server proxy)
Client code should not include the API key. Instead, POST to the serverless proxy endpoint:

```js
// Example client-side call
const resp = await fetch('/api/chat/completions', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ model: 'openai/gpt-oss-20b', prompt: 'Hello', stream: false }),
});
const data = await resp.json();
```

The serverless function (deployed on Vercel) forwards the request to NVIDIA using the server-side `NVIDIA_API_KEY`.

### Model Settings
- Model: `openai/gpt-oss-20b`
- Temperature: 0.7 (balanced creativity/consistency)
- Max Tokens: 4096
- Stream: true (real-time responses)

## Troubleshooting

### Common Issues
1. **API Key Error**: Ensure your NVIDIA API key is correctly set in `.env`
2. **Connection Error**: Check your internet connection and API key validity
3. **Slow Responses**: NVIDIA API may have rate limits during peak usage

### Development
- Check browser console for detailed error logs
- Token usage is logged to console for monitoring
- Error messages are displayed in the chat interface

## Ocean Expert Capabilities

The AI acts as a professional oceanographer with expertise in:
- Physical oceanography (temperature, salinity, density)
- ARGO float data analysis
- Ocean circulation patterns
- Climate-ocean interactions
- Marine ecosystem dynamics
- Satellite oceanography
- Deep water formation and mixing

All responses include specific numeric values, measurements, and scientific context as if accessing real oceanographic databases.