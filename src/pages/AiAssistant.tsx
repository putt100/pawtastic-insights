import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import LoginModal from '@/components/LoginModal';
import { SendHorizontal, Heart, ImagePlus, MicIcon, Dog, Cat, ArrowRight, Sparkle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
}

const AiAssistant = () => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: Message = {
        id: crypto.randomUUID(),
        content: user 
          ? `Hello ${user.name}! How can I help with your pet ${user.petName ? user.petName : 'companion'} today?` 
          : "Welcome to PawLingo AI Assistant! I can help answer questions about your pet's behavior, health, training and more. Sign in to save your conversation history.",
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([greeting]);
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !selectedImage) || isProcessing) return;
    
    let newMessage: Message;
    
    if (selectedImage) {
      newMessage = {
        id: crypto.randomUUID(),
        content: inputMessage.trim() || "What can you tell me about this pet?",
        sender: 'user',
        timestamp: new Date(),
        type: 'image',
        imageUrl: imagePreview || ''
      };
    } else {
      newMessage = {
        id: crypto.randomUUID(),
        content: inputMessage.trim(),
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    if (selectedImage) {
      setSelectedImage(null);
      setImagePreview(null);
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let responseContent = '';
      
      if (newMessage.type === 'image') {
        responseContent = generateImageAnalysisResponse(newMessage.content);
      } else {
        responseContent = generateTextResponse(newMessage.content);
      }
      
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      toast.error('Sorry, there was an error processing your request.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateTextResponse = (userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('bark') || userMessageLower.includes('barking')) {
      return "Barking is your dog's way of communicating! Dogs bark for many reasons, including alerting to danger, expressing excitement, seeking attention, or responding to anxiety. If the barking is excessive, try to identify the trigger and work on training methods like desensitization or providing mental stimulation.";
    } else if (userMessageLower.includes('eat') || userMessageLower.includes('food') || userMessageLower.includes('diet')) {
      return "A balanced diet is crucial for your pet's health! Dogs and cats have different nutritional needs. Make sure to provide high-quality pet food appropriate for their age, size, and activity level. Avoid feeding them human foods like chocolate, grapes, onions, and xylitol, which can be toxic. If you're concerned about your pet's eating habits, consult with your veterinarian.";
    } else if (userMessageLower.includes('train') || userMessageLower.includes('training')) {
      return "Training is a wonderful way to bond with your pet while teaching good behavior! Start with basic commands using positive reinforcement—reward good behavior with treats, praise, or play. Consistency is key, so establish clear rules and stick to them. Keep training sessions short and fun. For specific behavioral issues, consider working with a professional trainer.";
    } else if (userMessageLower.includes('meow') || userMessageLower.includes('purr')) {
      return "Cats communicate through vocalizations like meowing and purring! Meowing is often directed at humans rather than other cats, and can indicate hunger, greeting, or attention-seeking. Purring usually signals contentment, but cats may also purr when anxious or in pain as a self-soothing mechanism. Pay attention to the context and your cat's body language to better understand what they're trying to tell you.";
    } else if (userMessageLower.includes('sleep') || userMessageLower.includes('sleeping')) {
      return "Pets need plenty of sleep! Dogs typically sleep 12-14 hours daily, while cats can sleep 15-20 hours. Your pet's sleeping patterns depend on age, health, and activity level. If you notice sudden changes in sleeping habits, it might indicate health issues. Provide comfortable, quiet sleeping spaces for your pet to rest undisturbed.";
    } else {
      return "That's an interesting question about your pet! Understanding pet behavior involves observing patterns, body language, and contextual cues. If you're concerned about specific behaviors, consulting with a veterinarian or animal behaviorist can provide personalized guidance. Would you like to know more about any particular aspect of pet care or behavior?";
    }
  };

  const generateImageAnalysisResponse = (userPrompt: string): string => {
    const responses = [
      "Based on this image, your pet appears to be displaying playful behavior! Their relaxed body posture and bright eyes suggest they're content and comfortable in their environment. This is typical happy body language for a healthy pet.",
      
      "I notice your pet has a curious expression! They seem to be exploring or investigating something interesting. This natural curiosity is a sign of an engaged and mentally active pet. Providing enrichment activities can help satisfy this curiosity and prevent boredom.",
      
      "Your pet looks very relaxed in this image. The comfortable posture indicates they feel safe and secure in their environment. Creating safe spaces where your pet can relax is important for their emotional well-being.",
      
      "From what I can see in this image, your pet appears to be displaying some signs of alertness - perhaps they heard or noticed something interesting! This attentive behavior is normal and shows good environmental awareness.",
      
      "What a beautiful pet! They appear to be in good condition with clear eyes and a healthy coat. Regular grooming, proper nutrition, and veterinary check-ups help maintain this healthy appearance."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-display font-bold text-gradient mb-4">PawLingo AI Assistant</h1>
        <p className="text-lg text-pawlingo-muted max-w-3xl mx-auto">
          Ask questions about your pet's behavior, health, or training needs. Our AI assistant is here to help you understand your furry friend better.
        </p>
      </motion.div>

      <Tabs defaultValue="chat" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="chat" className="rounded-full">
            <Heart className="mr-2 h-4 w-4" />
            Chat with AI
          </TabsTrigger>
          <TabsTrigger value="guide" className="rounded-full">
            <Sparkle className="mr-2 h-4 w-4" />
            Conversation Guide
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4">
          <div className="glass-card min-h-[500px] max-h-[600px] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white' 
                        : 'bg-pawlingo-light border border-pawlingo-border'
                    }`}
                  >
                    {message.type === 'image' && message.imageUrl && (
                      <div className="mb-3">
                        <img 
                          src={message.imageUrl} 
                          alt="Pet" 
                          className="rounded-lg max-h-64 mx-auto"
                        />
                      </div>
                    )}
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-pawlingo-border">
              {imagePreview && (
                <div className="mb-3 relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-20 rounded-lg border border-pawlingo-border"
                  />
                  <button 
                    onClick={clearImage}
                    className="absolute top-1 right-1 bg-pawlingo-dark text-white rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Ask about your pet's behavior, health, or training..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[80px] resize-none"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={triggerImageUpload}
                    title="Upload pet image"
                  >
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={isProcessing || (!inputMessage.trim() && !selectedImage)}
                  >
                    {isProcessing ? 'Thinking...' : 'Send'}
                    <SendHorizontal className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {!isAuthenticated && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-pawlingo-muted mb-2">
                    Sign in to save your conversation history
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-xs"
                  >
                    Sign in
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="guide" className="mt-4">
          <div className="glass-card p-6">
            <h3 className="text-xl font-display font-semibold mb-4">Tips for Chatting with PawLingo AI</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-pawlingo-border rounded-xl p-4 hover-lift">
                <div className="flex items-center mb-3">
                  <Dog className="text-pawlingo-primary h-5 w-5 mr-2" />
                  <h4 className="font-medium">About Dog Behavior</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• "Why does my dog bark at strangers?"</li>
                  <li>• "How can I stop my puppy from chewing furniture?"</li>
                  <li>• "What does tail wagging really mean?"</li>
                  <li>• "Why does my dog follow me everywhere?"</li>
                </ul>
              </div>
              
              <div className="border border-pawlingo-border rounded-xl p-4 hover-lift">
                <div className="flex items-center mb-3">
                  <Cat className="text-pawlingo-secondary h-5 w-5 mr-2" />
                  <h4 className="font-medium">About Cat Behavior</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• "Why does my cat knead on soft surfaces?"</li>
                  <li>• "What does it mean when my cat's tail is twitching?"</li>
                  <li>• "How can I tell if my cat is happy?"</li>
                  <li>• "Why does my cat bring me 'gifts'?"</li>
                </ul>
              </div>
              
              <div className="border border-pawlingo-border rounded-xl p-4 hover-lift">
                <div className="flex items-center mb-3">
                  <svg className="text-pawlingo-tertiary h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="currentColor" />
                    <path d="M11.2929 13.2929C11.6834 12.9024 12.3166 12.9024 12.7071 13.2929L14.7071 15.2929C15.0976 15.6834 15.0976 16.3166 14.7071 16.7071C14.3166 17.0976 13.6834 17.0976 13.2929 16.7071L12 15.4142L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L11.2929 13.2929Z" fill="currentColor" />
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h4 className="font-medium">Pet Health Questions</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• "How much exercise does my pet need?"</li>
                  <li>• "What human foods are safe for my pet?"</li>
                  <li>• "How can I help my pet maintain a healthy weight?"</li>
                  <li>• "What signs indicate my pet might be ill?"</li>
                </ul>
              </div>
              
              <div className="border border-pawlingo-border rounded-xl p-4 hover-lift">
                <div className="flex items-center mb-3">
                  <MicIcon className="text-pawlingo-accent h-5 w-5 mr-2" />
                  <h4 className="font-medium">Try Image Analysis</h4>
                </div>
                <p className="text-sm mb-3">Upload a photo of your pet and ask:</p>
                <ul className="space-y-2 text-sm">
                  <li>• "What is my pet trying to communicate?"</li>
                  <li>• "Does my pet look healthy in this image?"</li>
                  <li>• "What breed traits can you identify?"</li>
                  <li>• "Is this body language normal?"</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-pawlingo-muted">
              <p>Remember, while PawLingo AI provides helpful insights, consult with a veterinarian for medical advice.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default AiAssistant;
