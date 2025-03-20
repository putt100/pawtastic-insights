
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqItems = [
    {
      question: "How accurate is the AI in analyzing pet behavior?",
      answer: "PawLingo's AI has been trained on millions of pet behavior samples and achieves an accuracy rate of over 90% for common behaviors and emotions. The system continuously improves as it learns from more interactions with your specific pet."
    },
    {
      question: "What type of media can I upload for analysis?",
      answer: "You can upload photos, videos (up to 30 seconds), and audio recordings. For the best results, we recommend videos that clearly show your pet's face, body posture, and environment."
    },
    {
      question: "How does the blockchain pet profile work?",
      answer: "Your pet's profile is stored on a secure blockchain, creating an immutable record of their history, health data, and behavioral patterns. This provides a trusted source of information that can be shared with veterinarians, pet sitters, or future adoptive families if needed."
    },
    {
      question: "Can PawLingo analyze multiple pets at once?",
      answer: "Yes! PawLingo can identify and analyze multiple pets in the same media. The AI will provide individual insights for each pet detected and also analyze their interactions with each other."
    },
    {
      question: "Is my pet's data private and secure?",
      answer: "Absolutely. We take privacy seriously. Your pet's data is encrypted and only accessible to you. You control who can view your pet's profile and what information is shared. Our blockchain implementation ensures data integrity without compromising privacy."
    },
    {
      question: "How do I connect my MetaMask wallet for Web3 features?",
      answer: "In your account settings, select 'Connect Wallet' and choose MetaMask from the provider options. Follow the prompts in your MetaMask extension to complete the connection. Once connected, you'll have access to all Web3 features like blockchain-secured pet profiles."
    }
  ];

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-pawlingo-primary/10 text-pawlingo-primary text-sm font-medium">
              Questions & Answers
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display text-pawlingo-dark">
              Frequently <span className="text-gradient">Asked</span> Questions
            </h2>
            <p className="mt-4 text-pawlingo-muted max-w-2xl mx-auto">
              Find answers to common questions about PawLingo's features, technology, and pet analysis capabilities.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border border-pawlingo-light rounded-xl overflow-hidden bg-white shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:bg-pawlingo-light/30 transition-colors text-pawlingo-dark font-medium text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-pawlingo-muted">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-pawlingo-primary/10 blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-pawlingo-secondary/10 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-pawlingo-tertiary/10 text-pawlingo-tertiary text-sm font-medium">
                    Need More Help?
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-pawlingo-dark mb-4">
                    Still Have Questions?
                  </h3>
                  <p className="text-pawlingo-muted mb-6">
                    Our pet behavior experts and technical support team are ready to help you get the most out of PawLingo. Reach out anytime.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    
                    <Button variant="outline" className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Visit Help Center
                    </Button>
                  </div>
                </motion.div>
              </div>
              
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="aspect-square max-w-xs mx-auto relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border-4 border-pawlingo-primary/20 animate-spin-slow"></div>
                      <div className="absolute w-3/4 h-3/4 rounded-full border-4 border-pawlingo-secondary/20 animate-spin-slow" style={{ animationDuration: "15s", animationDirection: "reverse" }}></div>
                    </div>
                    
                    <div className="absolute top-0 left-1/4 glass-card p-3 shadow-lg animate-floating">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-pawlingo-primary/20 flex items-center justify-center text-2xl">
                          🐱
                        </div>
                        <div>
                          <p className="font-medium text-sm">Meow Meow</p>
                          <p className="text-xs text-pawlingo-muted">Hungry + Playful</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 right-1/4 glass-card p-3 shadow-lg animate-floating" style={{ animationDelay: "1s" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-pawlingo-tertiary/20 flex items-center justify-center text-2xl">
                          🐶
                        </div>
                        <div>
                          <p className="font-medium text-sm">Woof Woof</p>
                          <p className="text-xs text-pawlingo-muted">Excited + Alert</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 glass-card p-3 shadow-lg animate-floating" style={{ animationDelay: "1.5s" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-pawlingo-secondary/20 flex items-center justify-center text-2xl">
                          🐰
                        </div>
                        <div>
                          <p className="font-medium text-sm">Thump Thump</p>
                          <p className="text-xs text-pawlingo-muted">Curious + Calm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
