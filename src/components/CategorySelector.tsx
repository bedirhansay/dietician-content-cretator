'use client';

import { fadeIn, staggerContainer } from '@/styles/animations';
import { HealthCategory } from '@/types/health';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface CategorySelectorProps {
  categories: HealthCategory[];
  onSelect: (category: HealthCategory) => void;
}

const CategorySelector: FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={fadeIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(category)}
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-left group"
        >
          <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
            {category.emoji}
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{category.title}</h2>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategorySelector;
