import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Edit3, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Mohd Waqar',
    email: 'mohammedwaqar21@gmail.Com',
    bio: 'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam',
  });
  
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(userData.bio);
  const [typingBio, setTypingBio] = useState('');
  
  // Typing animation for bio
  useEffect(() => {
    if (!editingBio && userData.bio !== typingBio) {
      const timeout = setTimeout(() => {
        setTypingBio(userData.bio.substring(0, typingBio.length + 1));
      }, 20);
      
      return () => clearTimeout(timeout);
    }
  }, [typingBio, userData.bio, editingBio]);
  
  // Start typing animation when component mounts
  useEffect(() => {
    setTypingBio('');
  }, []);
  
  const handleLogout = () => {
    navigate('/');
  };
  
  const handleSaveBio = () => {
    setUserData(prev => ({ ...prev, bio: bioText }));
    setEditingBio(false);
    setTypingBio('');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-background dark:bg-background">
        <ThemeToggle />
        
        <header className="p-6 border-b border-border dark:border-border">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-text dark:text-text">Account Settings</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              leadingIcon={<LogOut size={16} />}
            >
              Logout
            </Button>
          </div>
        </header>
        
        <div className="p-6">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar src="https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174373.jpg" size="lg" editable />
            
            <div>
              <motion.h2 
                className="text-xl font-semibold text-text dark:text-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {userData.name}
              </motion.h2>
              <motion.p 
                className="text-text-muted dark:text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {userData.email}
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="glassmorphism rounded-xl p-6 mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-text dark:text-text">Bio</h3>
              
              {editingBio ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSaveBio}
                  leadingIcon={<Check size={16} className="text-success" />}
                >
                  Save
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingBio(true)}
                  leadingIcon={<Edit3 size={16} />}
                >
                  Edit
                </Button>
              )}
            </div>
            
            {editingBio ? (
              <textarea
                className="w-full bg-background dark:bg-surface border border-border dark:border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-light/50 text-text dark:text-text"
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={4}
              />
            ) : (
              <p className="text-text-muted dark:text-text-muted">
                {typingBio}
                <span className="inline-block w-0.5 h-4 bg-primary dark:bg-primary-light ml-0.5 animate-pulse"></span>
              </p>
            )}
          </motion.div>
          
          <motion.div 
            className="border-t border-border dark:border-border pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              variant="secondary" 
              size="md" 
              fullWidth
              leadingIcon={<Settings size={18} />}
            >
              More Settings
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
