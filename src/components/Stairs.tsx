import { motion } from 'framer-motion'

const stairAnimation = {
    initial: {
        top: "0%",
    },
    animate: {
        top: "100%",
    },
    exit: {
        top: ["100%", "0%"],
    },
};

const reverseIndex = (index: number) => {
    const totalSteps = 8;
    return totalSteps - index - 1;
}

export default function Stairs() {
    const letters = "SWIFTYMO".split("");
  return <>
    {letters.map((letter, index) => (
        <motion.div 
        key={index}
        variants={stairAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: 0.1 * reverseIndex(index),
        }}
        className='h-full w-full bg-accent relative'>
            <div className='container mx-auto flex text-center items-center h-full text-9xl'>{letter}</div>
        </motion.div>
    ))}
  </>
}
