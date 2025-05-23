import { Camera } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  onImageChange?: (file: File) => void;
}

export default function Avatar({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  editable = false,
  onImageChange 
}: AvatarProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };
  
  return (
    <motion.div 
      className={`relative rounded-full overflow-hidden ${sizeClasses[size]}`}
      whileHover={{ scale: editable ? 1.05 : 1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img 
        src={src || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
      
      {editable && (
        <>
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Camera className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} />
          </motion.div>
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleFileChange}
          />
        </>
      )}
    </motion.div>
  );
}