import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  TrendingUp, 
  Map, 
  Database,
  Sparkles,
  AlertCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { streamChatCompletion, OCEAN_EXPERT_PROMPT, ChatMessage } from "@/lib/openaiClient";
import { trimConversationHistory, calculateConversationTokens } from "@/lib/tokenManager";
import MessageContent from "./MessageContent";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'visualization' | 'data';
  isStreaming?: boolean;
  error?: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI oceanographer with expertise in ARGO float data and marine science. I can provide detailed analysis with specific numeric values, depth profiles, temperature/salinity measurements, and oceanographic insights. Ask me about ocean conditions, ARGO data, or any marine phenomena!",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([
    { role: 'system', content: OCEAN_EXPERT_PROMPT }
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const exampleQueries = [
    "What's the current temperature profile at 2000m depth in the North Atlantic?",
    "Show me salinity measurements between 30-35 PSU in the Indian Ocean",
    "What are the specific ARGO float readings near the Antarctic Circumpolar Current?",
    "Give me exact temperature anomalies with numeric values for the Pacific warm pool"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Add user message to UI
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Create streaming bot message placeholder
    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMessageId,
      content: "",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      isStreaming: true
    };

    setMessages(prev => [...prev, botMessage]);

    try {
      // Add user message to conversation history
      const updatedHistory: ChatMessage[] = [...conversationHistory, { role: 'user', content: userInput }];
      
      // Trim conversation history if it exceeds token limit
      const trimmedHistory = trimConversationHistory(updatedHistory, 100000) as ChatMessage[];
      
      // Log token usage
      const tokenCount = calculateConversationTokens(trimmedHistory);
      console.log(`Conversation tokens: ${tokenCount}`);

      // Stream the response
      await streamChatCompletion(
        trimmedHistory,
        (response) => {
          if (response.error) {
            // Handle error
            setMessages(prev => prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, content: "I apologize, but I encountered an error processing your request. Please check your API key configuration and try again.", isStreaming: false, error: response.error }
                : msg
            ));
            toast({
              title: "Error",
              description: "Failed to get response from AI model",
              variant: "destructive"
            });
          } else {
            // Update streaming message
            setMessages(prev => prev.map(msg => 
              msg.id === botMessageId 
                ? { 
                    ...msg, 
                    content: response.content, 
                    isStreaming: !response.isComplete,
                    type: response.content.toLowerCase().includes('temperature') || 
                          response.content.toLowerCase().includes('salinity') || 
                          response.content.toLowerCase().includes('depth') ? 'data' : 'text'
                  }
                : msg
            ));

            if (response.isComplete) {
              // Add assistant response to conversation history
              const finalHistory: ChatMessage[] = [...trimmedHistory, { role: 'assistant', content: response.content }];
              setConversationHistory(finalHistory);
              
              toast({
                title: "Ocean Analysis Complete",
                description: "AI oceanographer has analyzed your request with numeric insights",
              });
            }
          }
        }
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: "I apologize, but I'm having trouble connecting to the AI service. Please check your internet connection and API configuration.", isStreaming: false, error: error instanceof Error ? error.message : 'Unknown error' }
          : msg
      ));
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI service",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (query: string) => {
    setInputValue(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-ocean-light/30 p-4 bg-gradient-to-r from-ocean-deep to-blue-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Oceanographer</h3>
              <p className="text-ocean-light text-sm flex items-center">
                <Database className="h-3 w-3 mr-1" />
                Real-time ARGO data • Satellite observations • Expert analysis
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="text-green-700 bg-green-100/90 border-green-200">
              <Sparkles className="h-3 w-3 mr-1" />
              Online
            </Badge>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Example Queries */}
      {messages.length === 1 && (
        <div className="p-6 border-b border-ocean-light/20 bg-gradient-to-br from-ocean-surface/50 to-white">
          <h4 className="text-sm font-semibold text-ocean-deep mb-4 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-ocean-primary" />
            Try these oceanographic queries:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(query)}
                className="text-left p-3 rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200 text-sm border border-ocean-light/30 hover:border-ocean-primary/30 group"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-ocean-primary rounded-full mt-2 group-hover:animate-pulse"></div>
                  <span className="text-ocean-deep/80 group-hover:text-ocean-deep">"{query}"</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6 bg-gradient-to-b from-white to-ocean-surface/20">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${message.sender === 'user' ? 'max-w-[70%]' : 'max-w-[95%]'} ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 ml-3' 
                    : 'bg-gradient-to-br from-ocean-primary to-ocean-deep mr-3'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                
                <Card className={`shadow-sm border ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600/20' 
                    : 'bg-gradient-to-br from-white to-ocean-surface border-ocean-light/30'
                }`}>
                  <CardContent className="p-4">
                    {message.error ? (
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm leading-relaxed text-red-700">{message.content}</p>
                          <p className="text-xs text-red-500 mt-1">Error: {message.error}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <MessageContent 
                          content={message.content} 
                          isBot={message.sender === 'bot'} 
                        />
                        {message.isStreaming && (
                          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-ocean-light/20">
                            <Loader2 className="h-4 w-4 animate-spin text-ocean-primary" />
                            <span className="text-sm text-ocean-primary font-medium">Analyzing oceanographic data...</span>
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-ocean-primary rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-ocean-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-1 bg-ocean-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {message.type === 'visualization' && message.sender === 'bot' && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                          <TrendingUp className="h-3 w-3" />
                          <span>Interactive Visualization Available</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Button className="text-xs border border-gray-300 bg-white hover:bg-gray-50">
                            <Map className="h-3 w-3 mr-1" />
                            Map View
                          </Button>
                          <Button className="text-xs border border-gray-300 bg-white hover:bg-gray-50">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Charts
                          </Button>
                          <Button className="text-xs border border-gray-300 bg-white hover:bg-gray-50">
                            <Database className="h-3 w-3 mr-1" />
                            Data Table
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-2 border-t border-ocean-light/20">
                      <p className="text-xs text-ocean-deep/60 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-card">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-ocean-primary" />
                      <span className="text-sm text-muted-foreground">AI is analyzing ocean data...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-ocean-light/30 p-4 bg-gradient-to-r from-ocean-surface to-white">
        <div className="flex space-x-3">
          <Input
            placeholder="Ask me about specific ocean measurements, ARGO data, temperature profiles..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-ocean-light/40 focus:border-ocean-primary focus:ring-ocean-primary/20 bg-white/80 backdrop-blur-sm"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-ocean-primary to-blue-600 hover:from-blue-600 hover:to-ocean-primary text-white px-4 shadow-md transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-ocean-deep/70 flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Press Enter to send • Expert oceanographic analysis with real data
          </p>
          {conversationHistory.length > 1 && (
            <p className="text-xs text-ocean-primary">
              {calculateConversationTokens(conversationHistory)} tokens
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;