
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, LineChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Pet Media",
      description: "Take a photo or video of your pet, or upload existing media to start the analysis.",
      delay: 0,
      color: "bg-pawlingo-primary"
    },
    {
      id: 2,
      icon: <Brain className="w-6 h-6" />,
      title: "AI Analyzes Behavior",
      description: "Our advanced AI identifies patterns, emotions, and behaviors in your pet's activity.",
      delay: 0.2,
      color: "bg-pawlingo-secondary"
    },
    {
      id: 3,
      icon: <LineChart className="w-6 h-6" />,
      title: "Get Detailed Insights",
      description: "Receive detailed analysis and recommendations to better understand your pet's needs.",
      delay: 0.4,
      color: "bg-pawlingo-tertiary"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pawlingo-light/50"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-pawlingo-primary/10 text-pawlingo-primary text-sm font-medium">
              Simple Process
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display text-pawlingo-dark">
              How PawLingo <span className="text-gradient">Works</span>
            </h2>
            <p className="mt-4 text-pawlingo-muted max-w-2xl mx-auto">
              Understanding your pet's emotions and needs has never been easier. Our sophisticated AI does all the heavy lifting.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: step.delay }}
              className="glass-card p-8 relative overflow-hidden group hover-lift"
            >
              {/* Step Number */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full flex items-center justify-center text-6xl font-display text-pawlingo-light opacity-10 group-hover:opacity-20 transition-opacity">
                {step.id}
              </div>

              <div className="relative z-10">
                <div className={`${step.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-display text-pawlingo-dark mb-3">{step.title}</h3>
                <p className="text-pawlingo-muted">{step.description}</p>
              </div>

              {/* Connector Line - Only for non-last items on desktop */}
              {step.id !== steps.length && (
                <div className="hidden md:block absolute top-1/2 -right-4 h-0.5 w-8 bg-gradient-to-r from-transparent to-pawlingo-primary/30"></div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-pawlingo-light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-pawlingo-secondary/10 text-pawlingo-secondary text-sm font-medium">
                Real-time Analysis
              </span>
              <h3 className="text-2xl md:text-3xl font-display text-pawlingo-dark mb-4">
                Our AI Does The Hard Work For You
              </h3>
              <p className="text-pawlingo-muted mb-6">
                PawLingo's advanced machine learning algorithms analyze subtle cues in your pet's behavior that humans might miss. By processing data from thousands of pet interactions, our AI can identify patterns that indicate:
              </p>
              
              <ul className="space-y-3">
                {[
                  "Emotional states like happiness, anxiety, or boredom",
                  "Physical needs including hunger, thirst, or discomfort",
                  "Behavioral trends that develop over time",
                  "Potential health concerns that require attention"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pawlingo-secondary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-pawlingo-secondary"></div>
                    </div>
                    <span className="text-pawlingo-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-72 md:h-96 rounded-xl bg-gradient-to-b from-pawlingo-light to-white overflow-hidden border border-pawlingo-light relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-70">
                  <div className="w-full max-w-[80%] aspect-video">
                    <img
                      src="https://images.unsplash.com/photo-1587559070350-9a5678118c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Dog being analyzed"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                
                {/* Analysis Overlay Elements */}
                <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full border-2 border-pawlingo-primary animate-pulse-soft"></div>
                <div className="absolute bottom-1/3 right-1/3 w-8 h-8 rounded-full border-2 border-pawlingo-secondary animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
                
                {/* Analysis Data Points */}
                <div className="absolute top-[30%] right-[30%] glass-card px-3 py-1 text-xs font-medium shadow-lg">
                  Tail wagging: Happy
                </div>
                <div className="absolute bottom-[20%] left-[25%] glass-card px-3 py-1 text-xs font-medium shadow-lg">
                  Ear position: Alert
                </div>
                
                {/* Radial Element */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-64 h-64 rounded-full border border-pawlingo-primary/30 animate-spin-slow"></div>
                  <div className="absolute w-48 h-48 rounded-full border border-pawlingo-secondary/30 animate-spin-slow" style={{ animationDuration: "15s" }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
