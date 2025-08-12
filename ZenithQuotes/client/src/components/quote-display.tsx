import { motion } from "framer-motion";
import { RefreshCw, Quote as QuoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Quote, Emotion } from "@shared/schema";

interface QuoteDisplayProps {
  quote: Quote;
  emotion?: Emotion;
  onNewQuote: () => void;
}

export default function QuoteDisplay({ quote, emotion, onNewQuote }: QuoteDisplayProps) {
  return (
    <motion.div
      key={quote.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl"
    >
      {/* Emotion Header */}
      <div className="text-center mb-6">
        <motion.span 
          className="text-5xl inline-block"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {emotion?.icon}
        </motion.span>
        <h3 className="text-xl font-semibold text-gray-700 mt-2 capitalize">
          {emotion?.displayName}
        </h3>
      </div>
      
      {/* Quote Content */}
      <blockquote className="text-center">
        <QuoteIcon className="text-2xl text-blue-400 mb-4 mx-auto" size={32} />
        <motion.p 
          className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6 italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {quote.text}
        </motion.p>
        <motion.footer 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>—</span>
          <cite className="font-medium ml-2">{quote.author}</cite>
        </motion.footer>
      </blockquote>

      {/* New Quote Button */}
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={onNewQuote}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <RefreshCw className="mr-2" size={16} />
          Get Another Quote
        </Button>
      </motion.div>
    </motion.div>
  );
}
