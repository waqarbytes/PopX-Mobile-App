import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ThemeToggle from '../components/ui/ThemeToggle';
import ParticleBackground from '../components/layout/ParticleBackground';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile');
    }, 1500);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center p-6 relative">
        <ParticleBackground />
        <ThemeToggle />
        
        <motion.button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 p-2 rounded-full bg-background/80 dark:bg-surface/80 backdrop-blur-sm border border-border"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5 text-text dark:text-text" />
        </motion.button>
        
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 text-text dark:text-text">
              Signin to your PopX account
            </h1>
            <p className="text-text-muted dark:text-text-muted mb-8">
              Enter your credentials to access your account
            </p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                icon={<Mail size={18} />}
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={<KeyRound size={18} />}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Login
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-center text-text-muted dark:text-text-muted mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/create-account')}
                className="text-primary dark:text-primary-light hover:underline focus:outline-none"
              >
                Create one now
              </button>
            </motion.p>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
}