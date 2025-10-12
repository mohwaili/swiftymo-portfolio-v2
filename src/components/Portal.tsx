import { motion } from 'framer-motion';

const portalVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [0, 1.5, 30],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: [30, 1.5, 0],
    opacity: [1, 1, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

export default function Portal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <motion.div
        variants={portalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-20 h-20 rounded-full relative"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, var(--accent-hover) 100%)',
          boxShadow: '0 0 50px var(--accent)',
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, var(--accent-hover) 360deg)',
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </div>
  );
}