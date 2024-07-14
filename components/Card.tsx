import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Card = ({ imageSrc, title, description }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white relative"
    >
      <div
        className="relative h-64 overflow-hidden rounded-t"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" className="rounded-t" />
        {showDetails && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300">
            <div className="text-center">
              <div className="font-bold text-xl mb-2">{title}</div>
              <p className="text-gray-300">{description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent p-4"
        >
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full">
            View Details
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
