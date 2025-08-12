import { motion } from "framer-motion";

export default function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating shapes */}
      <motion.div
        className="absolute w-16 h-16 bg-white bg-opacity-10 rounded-full"
        style={{ top: "20%", left: "20%" }}
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full"
        style={{ top: "60%", right: "20%" }}
        animate={{
          y: [20, -20, 20],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      <motion.div
        className="absolute w-12 h-12 bg-white bg-opacity-5 rounded-full"
        style={{ top: "10%", right: "30%" }}
        animate={{
          y: [-15, 15, -15],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute w-24 h-24 bg-white bg-opacity-5 rounded-full"
        style={{ bottom: "20%", left: "10%" }}
        animate={{
          y: [15, -15, 15],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
