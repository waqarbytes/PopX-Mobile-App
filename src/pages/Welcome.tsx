import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import ParticleBackground from '../components/layout/ParticleBackground';
import { LogIn, UserPlus } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center relative p-6">
        <ParticleBackground />
        <ThemeToggle />
        
        <motion.div 
          className="relative z-10 flex flex-col items-center w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-6 gradient-bg p-5 rounded-full neon-glow"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-16 h-16 text-white"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold mb-2 text-text dark:text-text"
            variants={itemVariants}
          >
            Welcome to PopX
          </motion.h1>
          
          <motion.p 
            className="text-text-muted dark:text-text-muted text-center mb-12"
            variants={itemVariants}
          >
            Your futuristic mobile platform for managing digital experiences
          </motion.p>
          
          <motion.div 
            className="space-y-4 w-full"
            variants={itemVariants}
          >
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              onClick={() => navigate('/create-account')}
              leadingIcon={<UserPlus size={20} />}
            >
              Create Account
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg" 
              fullWidth 
              onClick={() => navigate('/login')}
              leadingIcon={<LogIn size={20} />}
            >
              Already Registered? Login
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}