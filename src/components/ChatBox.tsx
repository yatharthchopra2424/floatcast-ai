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
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'visualization' | 'data';
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI oceanographer. I can help you explore ARGO ocean data using natural language. Try asking me something like 'Show me temperature profiles in the Pacific Ocean' or 'What's the average salinity near the equator?'",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const exampleQueries = [
    "Show me temperature profiles in the Indian Ocean for last month",
    "What's the average salinity in the Atlantic Ocean?",
    "Display ARGO float trajectories near Antarctica",
    "Find temperature anomalies in the Pacific Ocean"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputValue}". Based on the latest ARGO data, I've found relevant oceanographic information. This is a simulation - in the full system, I would query our database and generate interactive visualizations showing temperature profiles, salinity measurements, and float trajectories for your specific request.`,
        sender: 'bot',
        timestamp: new Date(),
        type: inputValue.toLowerCase().includes('show') || inputValue.toLowerCase().includes('display') ? 'visualization' : 'text'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);

      toast({
        title: "Query Processed",
        description: "AI has analyzed your ocean data request.",
      });
    }, 2000);
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
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-ocean rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-ocean-deep">Ocean AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask questions about ARGO ocean data</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-ocean-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            Online
          </Badge>
        </div>
      </div>

      {/* Example Queries */}
      {messages.length === 1 && (
        <div className="p-4 border-b border-border bg-ocean-surface">
          <h4 className="text-sm font-medium text-ocean-deep mb-3">Try these example queries:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(query)}
                className="text-left p-2 rounded-lg bg-card hover:bg-ocean-light transition-wave text-sm"
              >
                "{query}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-primary ml-3' 
                    : 'bg-gradient-ocean mr-3'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <Card className={`${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.type === 'visualization' && message.sender === 'bot' && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                          <TrendingUp className="h-3 w-3" />
                          <span>Interactive Visualization Available</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Map className="h-3 w-3 mr-1" />
                            Map View
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Charts
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Database className="h-3 w-3 mr-1" />
                            Data Table
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
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
      <div className="border-t border-border p-4 bg-card">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me about ocean data, temperatures, salinity, ARGO floats..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            variant="ocean"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send. Ask about temperature, salinity, ARGO floats, or request visualizations.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;