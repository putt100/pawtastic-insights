
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage, useOpenAiService } from "@/services/openAiService";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, Settings, MessageCircle, ArrowUp, Image, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar"; // This import is correct since we're back to the original code
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AiAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content: "You are PawLingo AI, a friendly and helpful pet communication assistant. Your goal is to help users understand their pets' behaviors, emotions, and needs. Provide personalized, practical advice for pet owners.",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useOpenAiService();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    // Add user message to chat
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare messages for API (excluding system message for display)
      const apiMessages = [...messages, userMessage];
      
      // Get AI response
      const response = await sendMessage(apiMessages, apiKey);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestions = [
    "Why does my cat knead blankets?",
    "How do I know if my dog is happy?",
    "What does it mean when my bird fluffs up?",
    "My pet isn't eating, what should I do?",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const saveApiKey = () => {
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved",
    });
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pawlingo-light/20">
      <Navbar />
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-pawlingo-primary/10 p-2 rounded-full">
                <Bot className="h-6 w-6 text-pawlingo-primary" />
              </div>
              <h1 className="text-2xl font-bold text-pawlingo-dark">PawLingo AI Assistant</h1>
            </div>
            
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Assistant Settings</DialogTitle>
                  <DialogDescription>
                    Configure your OpenAI integration
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">OpenAI API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your OpenAI API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your API key is stored locally and never sent to our servers.
                    </p>
                  </div>
                  <Button onClick={saveApiKey} className="w-full">Save Settings</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Chat messages */}
          <div className="bg-white rounded-lg shadow-md p-4 h-[500px] overflow-y-auto space-y-4 border border-gray-100">
            {messages.slice(1).map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === 'user'
                      ? 'bg-pawlingo-primary text-white rounded-tr-none'
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  {message.content.split('\n').map((text, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl p-4 bg-muted rounded-tl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-white border border-pawlingo-primary/20 hover:border-pawlingo-primary/50 rounded-full px-4 py-2 text-sm text-pawlingo-dark transition-all hover:bg-pawlingo-primary/5"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="flex items-start space-x-2">
            <div className="relative flex-1">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your pet's behavior..."
                rows={1}
                className="resize-none pr-14 py-3 min-h-[56px] rounded-full"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ''}
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-pawlingo-primary hover:bg-pawlingo-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {!apiKey && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                <button 
                  onClick={() => setShowSettings(true)} 
                  className="text-pawlingo-primary hover:underline"
                >
                  Set your OpenAI API key
                </button> to start chatting with PawLingo AI
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
