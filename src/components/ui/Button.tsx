import { motion } from 'framer-motion';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leadingIcon,
  trailingIcon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'relative rounded-xl font-medium transition-all duration-300 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary/10 active:scale-[0.98]',
    ghost: 'text-primary dark:text-primary-light hover:bg-primary/10 active:scale-[0.98]',
    glass: 'glassmorphism text-white hover:bg-white/40 dark:hover:bg-slate-800/50 active:scale-[0.98]'
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const buttonAnimation = {
    tap: { scale: 0.98 },
    hover: { 
      scale: 1.02,
      boxShadow: variant === 'primary' ? '0 0 15px rgba(117, 34, 230, 0.5)' : ''
    }
  };

  return (
    <motion.button
      whileTap="tap"
      whileHover="hover"
      variants={buttonAnimation}
      disabled={isLoading || props.disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyles}
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'flex items-center'}>
        {leadingIcon && <span className="mr-2">{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
      </span>
    </motion.button>
  );
}