
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Dog Owner",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    petImg: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    petName: "Max",
    petType: "Golden Retriever",
    content: "PawLingo has completely transformed how I understand Max's needs. Before, I was constantly guessing why he was barking or acting out. Now, the AI tells me exactly what he wants—whether it's food, a walk, or just attention. It's like having a translator for my dog!",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    role: "Cat Parent",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    petImg: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    petName: "Luna",
    petType: "Siamese Cat",
    content: "As a first-time cat owner, I had no idea what Luna was trying to tell me with all her different meows and behaviors. PawLingo's analysis has been spot-on, helping me recognize when she's playful versus when she needs space. Our relationship has improved so much!",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Multiple Pet Household",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    petImg: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    petName: "Buddy & Whiskers",
    petType: "Labrador & Tabby Cat",
    content: "Managing both a dog and cat was challenging until I found PawLingo. The app helps me understand when they're stressed around each other and suggests ways to help them coexist peacefully. The blockchain profile feature also makes sharing their info with our vet super easy.",
    rating: 4
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-pawlingo-light/50">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Gradient Orb */}
      <div className="absolute bottom-1/3 -left-28 w-96 h-96 bg-pawlingo-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-pawlingo-tertiary/10 text-pawlingo-tertiary text-sm font-medium">
              Success Stories
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display text-pawlingo-dark">
              What Pet <span className="text-gradient">Owners</span> Are Saying
            </h2>
            <p className="mt-4 text-pawlingo-muted max-w-2xl mx-auto">
              Join thousands of satisfied pet owners who've deepened their connection with their furry companions.
            </p>
          </motion.div>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden glass-card p-8 md:p-12">
            <div className="relative">
              <div 
                className="transition-transform duration-500 ease-in-out flex"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Pet and Owner */}
                      <div className="flex-shrink-0 w-full md:w-1/3">
                        <div className="relative">
                          <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl mb-6">
                            <img 
                              src={testimonial.petImg} 
                              alt={testimonial.petName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 shadow-lg flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{testimonial.name}</p>
                              <p className="text-xs text-pawlingo-muted">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center mt-8">
                          <p className="font-medium">{testimonial.petName}</p>
                          <p className="text-sm text-pawlingo-muted">{testimonial.petType}</p>
                          
                          <div className="flex items-center justify-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="flex-grow">
                        <Quote className="w-12 h-12 text-pawlingo-primary/20 mb-4" />
                        <p className="text-lg text-pawlingo-dark leading-relaxed mb-6">
                          {testimonial.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {['AI Analysis', 'Behavior Tracking', 'Blockchain Profile'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-pawlingo-primary/10 text-pawlingo-primary text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeIndex ? 'bg-pawlingo-primary scale-110' : 'bg-pawlingo-primary/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full hover:bg-pawlingo-primary/10 hover:text-pawlingo-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full hover:bg-pawlingo-primary/10 hover:text-pawlingo-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { number: "10K+", label: "Pet Owners", icon: "🏠" },
            { number: "25K+", label: "Pets Analyzed", icon: "🐾" },
            { number: "95%", label: "Satisfaction Rate", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center hover-lift"
            >
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <h3 className="text-3xl font-display text-pawlingo-dark mb-1">{stat.number}</h3>
              <p className="text-pawlingo-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
