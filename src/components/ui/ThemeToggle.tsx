import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  const iconVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-background/80 dark:bg-surface/80 backdrop-blur-sm border border-border fixed top-4 right-4 z-50 shadow-md"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'dark' ? (
        <motion.div
          key="sun"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={iconVariants}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={iconVariants}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-5 h-5 text-primary-dark" />
        </motion.div>
      )}
    </motion.button>
  );
}