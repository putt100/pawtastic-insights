
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, PawPrint } from "lucide-react";
import { claudeAiService, ClaudeMessage } from "@/services/claudeAiService";
import { useToast } from "@/hooks/use-toast";
import UploadButton from "@/components/UploadButton";

const AiAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ClaudeMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm PawLingo AI, your pet communication assistant. How can I help you understand your furry friend today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() && !uploadedImage) return;
    
    let userContent = input;
    
    // Add image description if an image was uploaded
    if (uploadedImage) {
      userContent = userContent ? 
        `${userContent}\n\n[Uploaded a pet image for analysis]` : 
        "[Uploaded a pet image for analysis]";
    }
    
    const userMessage: ClaudeMessage = {
      role: "user",
      content: userContent
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setUploadedImage(null);
    setIsLoading(true);
    
    try {
      const allMessages = [...messages, userMessage];
      const response = await claudeAiService.sendMessage(allMessages);
      
      const assistantMessage: ClaudeMessage = {
        role: "assistant",
        content: response.content
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get a response from our AI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
        toast({
          title: "Image uploaded",
          description: "Your pet image is ready for analysis!",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const suggestions = [
    "Why does my dog bark at strangers?",
    "What does it mean when my cat kneads?",
    "How can I tell if my pet is happy?",
    "Why does my dog tilt its head when I speak?"
  ];

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center mb-6">
          <PawPrint className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-gradient">PawLingo AI Assistant</h1>
        </div>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <p className="text-lg text-muted-foreground">
                I can analyze your pet's behavior and help you understand what they're trying to communicate.
                Ask me about body language, vocalizations, or any behavioral patterns you've noticed!
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm hover-lift"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
            
            <Card className="border mb-4">
              <ScrollArea className="h-[400px] p-4">
                <div className="flex flex-col space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-xl ${
                          message.role === "assistant"
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.role === "user" && message.content.includes("[Uploaded a pet image") && uploadedImage && (
                          <div className="mt-2">
                            <img 
                              src={uploadedImage} 
                              alt="Uploaded pet" 
                              className="max-h-48 rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] px-4 py-2 rounded-xl bg-muted text-foreground">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </Card>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              {uploadedImage && (
                <div className="relative w-full">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded pet" 
                    className="h-32 object-contain mx-auto rounded-md" 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-1 right-1"
                    onClick={() => setUploadedImage(null)}
                  >
                    Clear
                  </Button>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your pet's behavior..."
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || (!input.trim() && !uploadedImage)}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <UploadButton 
                  onUpload={handleImageUpload} 
                  isLoading={isLoading} 
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiAssistant;
