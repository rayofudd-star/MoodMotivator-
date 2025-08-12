import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Emotion } from "@shared/schema";

interface EmotionButtonProps {
  emotion: Emotion;
  onClick: () => void;
  isSelected?: boolean;
}

export default function EmotionButton({ emotion, onClick, isSelected }: EmotionButtonProps) {
  return (
    <motion.button
      className={cn(
        "bg-white bg-opacity-90 hover:bg-opacity-100 rounded-xl p-4 shadow-lg text-center group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl",
        isSelected && "ring-2 ring-blue-400 bg-opacity-100"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {emotion.icon}
      </motion.div>
      <span className="text-gray-700 font-medium">{emotion.displayName}</span>
    </motion.button>
  );
}
