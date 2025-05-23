import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, User, Phone, KeyRound, Building } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Switch from '../components/ui/Switch';
import ProgressBar from '../components/ui/ProgressBar';
import ThemeToggle from '../components/ui/ThemeToggle';
import ParticleBackground from '../components/layout/ParticleBackground';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isAgency: checked }));
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
  
  // Calculate form progress
  const requiredFields = ['fullName', 'phone', 'email', 'password'];
  const filledRequiredFields = requiredFields.filter(field => !!formData[field as keyof typeof formData]).length;
  const formProgress = filledRequiredFields / requiredFields.length;
  
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-start p-6 relative">
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
        
        <div className="w-full max-w-md mx-auto mt-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          >
            <ProgressBar current={filledRequiredFields} total={requiredFields.length} className="mb-8" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8 text-text dark:text-text">
              Create your PopX account
            </h1>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-2"
          >
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <Input
                id="fullName"
                name="fullName"
                type="text"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                icon={<User size={18} />}
              />
            </motion.div>
            
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                icon={<Phone size={18} />}
              />
            </motion.div>
            
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                icon={<Mail size={18} />}
              />
            </motion.div>
            
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
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
            </motion.div>
            
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <Input
                id="companyName"
                name="companyName"
                type="text"
                label="Company name"
                value={formData.companyName}
                onChange={handleChange}
                icon={<Building size={18} />}
              />
            </motion.div>
            
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
              className="py-2"
            >
              <Switch
                label="Are you an Agency?"
                checked={formData.isAgency}
                onChange={handleSwitchChange}
                required
              />
            </motion.div>
            
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
              className="pt-6"
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-center text-text-muted dark:text-text-muted mt-6"
              custom={7}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary dark:text-primary-light hover:underline focus:outline-none"
              >
                Login
              </button>
            </motion.p>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
}