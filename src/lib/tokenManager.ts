// Simple token estimation function (approximation: 1 token ≈ 4 characters for GPT models)
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// Calculate total tokens in a conversation history
export function calculateConversationTokens(messages: Array<{role: string, content: string}>): number {
  return messages.reduce((total, message) => {
    return total + estimateTokens(message.content);
  }, 0);
}

// Trim conversation history to keep it under token limit
export function trimConversationHistory(
  messages: Array<{role: string, content: string}>, 
  maxTokens: number = 100000
): Array<{role: string, content: string}> {
  const currentTokens = calculateConversationTokens(messages);
  
  if (currentTokens <= maxTokens) {
    return messages;
  }

  // Remove oldest 50% of tokens (50k tokens)
  const targetTokens = maxTokens / 2;
  let trimmedMessages = [...messages];
  let currentTrimmedTokens = currentTokens;

  // Always keep the system message (first message) if it exists
  const systemMessageIndex = messages.findIndex(msg => msg.role === 'system');
  const systemMessage = systemMessageIndex >= 0 ? messages[systemMessageIndex] : null;
  
  // Start removing from the oldest user/assistant messages (skip system message)
  let startIndex = systemMessage ? 1 : 0;
  
  while (currentTrimmedTokens > targetTokens && startIndex < trimmedMessages.length - 1) {
    const messageToRemove = trimmedMessages[startIndex];
    currentTrimmedTokens -= estimateTokens(messageToRemove.content);
    trimmedMessages.splice(startIndex, 1);
    
    // Don't increment startIndex since we removed an element
    // But make sure we don't remove the last message
    if (startIndex >= trimmedMessages.length - 1) {
      break;
    }
  }

  console.log(`Trimmed conversation: ${currentTokens} -> ${currentTrimmedTokens} tokens`);
  return trimmedMessages;
}