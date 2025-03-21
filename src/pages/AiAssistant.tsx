
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send, Mic, Globe, Camera, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { analyzeWithOpenAI } from '../services/openAiService';
import { toast } from 'sonner';

interface Message {
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiAssistant = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAiKey, setOpenAiKey] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Example suggestion chips
  const suggestionChips = [
    {
      title: "What does my pet's body language mean?",
      id: "body-language",
    },
    {
      title: "What does my pet's tail movement say about their mood?",
      id: "tail-movement",
    },
    {
      title: "How can I tell if my pet is anxious?",
      id: "anxious-pet",
    },
    {
      title: "How do I know if my pet is sick or in pain?",
      id: "sick-pet",
    },
  ];

  // Check for stored API key on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('openai-api-key');
    if (storedKey) {
      setOpenAiKey(storedKey);
    }
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!userInput.trim() && !selectedFile) || isLoading) return;
    
    // Add user message to chat
    const userMessage: Message = {
      sender: 'user',
      content: userInput || (selectedFile ? `[Uploaded image: ${selectedFile.name}]` : ''),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call OpenAI API
      const response = await analyzeWithOpenAI(userInput, selectedFile || undefined, openAiKey);
      
      if (response) {
        // Add assistant response to chat
        const assistantMessage: Message = {
          sender: 'assistant',
          content: response,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      toast.error('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
      setUserInput('');
      setSelectedFile(null);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setUserInput(suggestionText);
    // Auto-send after a short delay to give user time to see what's being sent
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8 mt-4">
          <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/15fd4c01-4639-464a-9f94-2fbc4dbe1139.png" 
              alt="PawLingo AI"
              className="w-20 h-20 object-contain" 
            />
          </div>
          
          <motion.h1 
            className="text-4xl font-display mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            PawLingo AI
          </motion.h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <span>By pawlingo.xyz</span>
            <Globe className="w-4 h-4" />
          </div>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            An AI expert in pet communication and behavior analysis—upload a 
            picture of your pet and I'll decode their emotions, body language and 
            needs
          </motion.p>
        </div>
        
        {/* Messages Display Area */}
        {messages.length > 0 && (
          <div className="mb-8 bg-gray-800 rounded-xl p-4 overflow-y-auto max-h-[500px]">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {messages.length === 0 && (
          <>
            {/* Suggestion Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {suggestionChips.map((chip) => (
                <motion.div
                  key={chip.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 cursor-pointer transition-colors"
                  onClick={() => handleSuggestionClick(chip.title)}
                >
                  <p className="text-gray-300">{chip.title}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {/* Selected File Preview */}
        {selectedFile && (
          <div className="mb-4 p-2 bg-gray-800 rounded-lg inline-flex items-center">
            <img 
              src={URL.createObjectURL(selectedFile)} 
              alt="Selected pet" 
              className="h-12 w-12 object-cover rounded mr-2" 
            />
            <span className="text-sm text-gray-300">{selectedFile.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2" 
              onClick={() => setSelectedFile(null)}
            >
              ✕
            </Button>
          </div>
        )}
        
        {/* File Input (hidden) */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        
        {/* Chat Input */}
        <motion.div 
          className="bg-gray-800 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about your pet or upload a picture"
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus-visible:ring-0 pl-4 pr-24 py-6 text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading || !openAiKey}
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={handleOpenFileDialog}
                disabled={isLoading || !openAiKey}
                aria-label="Upload image"
              >
                <Camera className="w-5 h-5 text-gray-400" />
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                disabled={isLoading || !openAiKey}
                aria-label="Voice input"
              >
                <Mic className="w-5 h-5 text-gray-400" />
              </Button>
              
              <Button
                size="icon"
                className="rounded-full bg-white text-black hover:bg-gray-200"
                onClick={handleSendMessage}
                disabled={isLoading || !openAiKey}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AiAssistant;
