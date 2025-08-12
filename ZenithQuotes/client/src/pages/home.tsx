import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import EmotionButton from "@/components/emotion-button";
import QuoteDisplay from "@/components/quote-display";
import FloatingBackground from "@/components/floating-background";
import { Heart, Sparkles } from "lucide-react";
import type { Emotion, Quote } from "@shared/schema";

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [usedQuoteIds, setUsedQuoteIds] = useState<string[]>([]);

  const { data: emotions, isLoading: emotionsLoading } = useQuery<Emotion[]>({
    queryKey: ["/api/emotions"],
  });

  const handleEmotionClick = async (emotion: string) => {
    setSelectedEmotion(emotion);
    await fetchRandomQuote(emotion);
  };

  const fetchRandomQuote = async (emotion: string) => {
    try {
      const response = await fetch(`/api/quotes/${emotion}/random`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ excludeIds: usedQuoteIds }),
      });

      if (response.ok) {
        const quote = await response.json();
        setCurrentQuote(quote);
        setUsedQuoteIds(prev => [...prev, quote.id]);
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  const handleNewQuote = () => {
    if (selectedEmotion) {
      fetchRandomQuote(selectedEmotion);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      <FloatingBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Heart className="text-pink-300" size={48} />
            Emotional Quotes
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            Find the perfect quote for every feeling
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-blue-300 mx-auto mt-6 rounded-full"></div>
        </motion.header>

        {/* Emotion Buttons */}
        <section className="mb-12">
          <motion.h2 
            className="text-2xl font-semibold text-white text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            How are you feeling today?
          </motion.h2>
          
          {emotionsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white bg-opacity-20 rounded-xl p-4 h-20 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {emotions?.map((emotion, index) => (
                <motion.div
                  key={emotion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EmotionButton
                    emotion={emotion}
                    onClick={() => handleEmotionClick(emotion.name)}
                    isSelected={selectedEmotion === emotion.name}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Quote Display */}
        <section className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!currentQuote ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl text-center"
              >
                <div className="mb-6">
                  <Sparkles className="text-5xl text-blue-400 mb-4 mx-auto" size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  Welcome to Your Daily Inspiration
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Choose an emotion above to discover a motivational quote that speaks to your current feelings. 
                  Each click brings you a new perspective and fresh inspiration.
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </motion.div>
            ) : (
              <QuoteDisplay
                quote={currentQuote}
                emotion={emotions?.find(e => e.name === selectedEmotion)}
                onNewQuote={handleNewQuote}
              />
            )}
          </AnimatePresence>
        </section>

        {/* Footer */}
        <motion.footer 
          className="text-center mt-16 pt-8 border-t border-white border-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white text-opacity-80 text-sm flex items-center justify-center gap-2">
            <Heart className="text-pink-300" size={16} />
            Spreading positivity, one quote at a time
          </p>
          <p className="text-white text-opacity-60 text-xs mt-2">
            Built with love for emotional wellness
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
