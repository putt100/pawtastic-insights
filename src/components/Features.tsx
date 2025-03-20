
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Shield, 
  Wand2, 
  PieChart, 
  Calendar, 
  Heart, 
  MessagesSquare, 
  BarChart3, 
  Trophy 
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "Real-time AI Analysis",
      description: "Advanced machine learning algorithms decode your pet's behavior and emotional state in real-time.",
      color: "bg-pawlingo-primary"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Blockchain Pet Profiles",
      description: "Secure, immutable records of your pet's history, health data, and behavioral insights.",
      color: "bg-pawlingo-secondary"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Gamified Experience",
      description: "Earn rewards and unlock features as you learn more about your pet's unique personality.",
      color: "bg-pawlingo-tertiary"
    }
  ];

  const secondaryFeatures = [
    {
      icon: <PieChart className="w-5 h-5" />,
      title: "Emotion Tracking",
      description: "Monitor your pet's emotional states over time."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Behavior Journal",
      description: "Keep a log of your pet's changing behaviors."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Health Insights",
      description: "Get alerts about potential health concerns."
    },
    {
      icon: <MessagesSquare className="w-5 h-5" />,
      title: "Pet Community",
      description: "Connect with other owners of similar pets."
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Progress Tracking",
      description: "See how your pet develops over time."
    },
    {
      icon: <Wand2 className="w-5 h-5" />,
      title: "Custom Training",
      description: "Personalized training based on your pet's behavior."
    }
  ];

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Gradient Orb */}
      <div className="absolute top-1/3 -right-28 w-96 h-96 bg-pawlingo-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-pawlingo-primary/10 text-pawlingo-primary text-sm font-medium">
              Key Features
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display text-pawlingo-dark">
              Powerful <span className="text-gradient">Features</span> for Pet Owners
            </h2>
            <p className="mt-4 text-pawlingo-muted max-w-2xl mx-auto">
              PawLingo combines cutting-edge AI with thoughtful design to create a seamless experience for you and your pet.
            </p>
          </motion.div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureVariants}
              className="glass-card p-8 h-full hover-lift"
            >
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-display text-pawlingo-dark mb-3">{feature.title}</h3>
              <p className="text-pawlingo-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-pawlingo-light shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-pawlingo-tertiary/10 text-pawlingo-tertiary text-sm font-medium">
                  AI-Powered Insights
                </span>
                <h3 className="text-2xl md:text-3xl font-display text-pawlingo-dark mb-4">
                  Transform How You Connect With Your Pet
                </h3>
                <p className="text-pawlingo-muted mb-6">
                  PawLingo's AI platform analyzes subtle cues in your pet's behavior, helping you understand what they're trying to communicate. Get insights that go beyond basic needs and discover your pet's unique personality traits.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Decode body language and facial expressions",
                    "Understand vocalization patterns and their meanings",
                    "Track mood changes and emotional responses",
                    "Get personalized recommendations for care and play"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pawlingo-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pawlingo-primary"></div>
                      </div>
                      <span className="text-pawlingo-dark">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-3 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full"
              >
                <div className="relative w-full aspect-video bg-gradient-to-br from-pawlingo-light to-white rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1583512603806-077998240c7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Dog with analytics" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* App UI Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="glass-card p-4 w-4/5 max-w-md">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                            alt="Dog profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-pawlingo-dark">Charlie</h4>
                          <p className="text-sm text-pawlingo-muted">Golden Retriever • 3 years</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-pawlingo-muted mb-1">Current Mood</p>
                          <div className="h-2.5 bg-white/50 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary rounded-full"></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Calm</span>
                            <span className="font-medium">Excited</span>
                            <span>Anxious</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <div className="flex-1 rounded-lg bg-white/50 p-2 text-center">
                            <p className="text-xs text-pawlingo-muted mb-1">Activity</p>
                            <p className="font-medium">High</p>
                          </div>
                          <div className="flex-1 rounded-lg bg-white/50 p-2 text-center">
                            <p className="text-xs text-pawlingo-muted mb-1">Hunger</p>
                            <p className="font-medium">Low</p>
                          </div>
                          <div className="flex-1 rounded-lg bg-white/50 p-2 text-center">
                            <p className="text-xs text-pawlingo-muted mb-1">Sleep</p>
                            <p className="font-medium">Needed</p>
                          </div>
                        </div>
                        
                        <div className="glass-card p-2 text-sm">
                          <p className="font-medium mb-1">PawLingo AI Analysis:</p>
                          <p className="text-pawlingo-muted text-xs">Charlie wants to play but is showing signs of tiredness. Consider a short play session followed by rest.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureVariants}
              className="p-5 border border-pawlingo-light bg-white rounded-xl flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pawlingo-light flex items-center justify-center text-pawlingo-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-pawlingo-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-pawlingo-muted">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
