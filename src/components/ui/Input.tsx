import { useState, ComponentPropsWithoutRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  icon?: ReactNode;
  required?: boolean;
}

export default function Input({ 
  label, 
  error, 
  icon, 
  required = false,
  className = '',
  ...props 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };
  
  // Animation variants
  const labelVariants = {
    unfocused: { 
      y: hasValue || isFocused ? -22 : 0, 
      scale: hasValue || isFocused ? 0.85 : 1,
      color: isFocused 
        ? 'rgb(var(--color-primary))' 
        : hasValue 
          ? 'rgb(var(--color-text-muted))' 
          : 'rgb(var(--color-text-muted))'
    },
    focused: { 
      y: -22, 
      scale: 0.85, 
      color: 'rgb(var(--color-primary))'
    }
  };

  return (
    <div className={`relative mb-5 ${className}`}>
      <div className="relative">
        <motion.label
          htmlFor={props.id}
          animate={isFocused ? 'focused' : 'unfocused'}
          variants={labelVariants}
          transition={{ duration: 0.2 }}
          className="absolute left-4 cursor-text origin-left transform transition-all duration-200"
        >
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </motion.label>
        
        <motion.input
          className={`input-field ${error ? 'border-error focus:ring-error/50' : ''}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}