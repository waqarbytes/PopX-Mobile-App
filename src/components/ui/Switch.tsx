import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}

export default function Switch({ label, checked, onChange, required = false }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);
  
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  
  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center my-4">
      <span className="mr-3 text-text dark:text-text">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      
      <div 
        onClick={handleToggle}
        className="relative inline-flex cursor-pointer"
      >
        <motion.div 
          className={`w-14 h-7 rounded-full p-1 ${
            isChecked 
              ? 'bg-gradient-to-r from-primary to-primary-light neon-glow' 
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          <motion.div 
            className={`w-5 h-5 rounded-full bg-white shadow-md`}
            animate={{ 
              x: isChecked ? 28 : 0,
              scale: isChecked ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.div>
        
        <div className="ml-3 flex items-center">
          <motion.span 
            className={`text-sm font-medium ${isChecked ? 'text-primary dark:text-primary-light' : 'text-gray-500 dark:text-gray-400'}`}
            animate={{ opacity: isChecked ? 1 : 0.6 }}
          >
            {isChecked ? 'Yes' : 'No'}
          </motion.span>
        </div>
      </div>
    </div>
  );
}