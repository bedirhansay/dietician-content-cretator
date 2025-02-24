'use client';

import { HealthCategory } from '@/types/health';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface CategoryBubblesProps {
  categories: HealthCategory[];
  onSelect: (category: HealthCategory) => void;
}

const CategoryBubbles: FC<CategoryBubblesProps> = ({ categories, onSelect }) => {
  // Kategorileri dairesel olarak yerleştirmek için hesaplamalar
  const totalCategories = categories.length;
  const radius = 300; // Dairenin yarıçapı
  const angleStep = (2 * Math.PI) / totalCategories;

  return (
    <div className="relative w-[700px] h-[700px] mx-auto">
      {/* Merkezdeki ana buton */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-1 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-blue-600 text-center px-4">
              İçerik Üretmeye Başla
            </span>
          </div>
        </div>
      </motion.button>

      {/* Kategori baloncukları */}
      {categories.map((category, index) => {
        // Her baloncuğun pozisyonunu hesapla
        const angle = angleStep * index;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.button
            key={category.id}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: 1,
              x: x,
              y: y,
              transition: {
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              },
            }}
            whileHover={{ scale: 1.2, zIndex: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(category)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className=" w-32 h-32 rounded-full bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-2 shadow-lg hover:shadow-xl transition-all border border-white/20">
              <span className="text-2xl mb-1">{category.emoji}</span>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{category.title}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryBubbles;
