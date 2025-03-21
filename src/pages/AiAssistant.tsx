
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send, Mic, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AiAssistant = () => {
  const [userInput, setUserInput] = useState('');
  
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

  const handleSendMessage = () => {
    if (userInput.trim()) {
      console.log('Sending message:', userInput);
      // In a real implementation, this would send the message to an API
      setUserInput('');
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    console.log('Suggestion clicked:', suggestionText);
    // In a real implementation, this would process the suggestion
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 mt-8">
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
          
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
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
        
        {/* Suggestion Chips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
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
              placeholder="Ask anything"
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus-visible:ring-0 pl-4 pr-24 py-6 text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                aria-label="Add attachment"
              >
                <Plus className="w-5 h-5 text-gray-400" />
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                aria-label="Voice input"
              >
                <Mic className="w-5 h-5 text-gray-400" />
              </Button>
              
              <Button
                size="icon"
                className="rounded-full bg-white text-black hover:bg-gray-200"
                onClick={handleSendMessage}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
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
