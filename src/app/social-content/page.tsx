'use client';

import CategorySelector from '@/components/CategorySelector';
import ContentDisplay from '@/components/ContentDisplay';
import { healthCategories } from '@/data/categories';
import { fadeIn } from '@/styles/animations';
import { GeneratedContent, HealthCategory } from '@/types/health';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SocialContentPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<HealthCategory | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (category: HealthCategory) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
        >
          <span>←</span>
          <span>Geri Dön</span>
        </button>

        <motion.section variants={fadeIn} initial="hidden" animate="visible">
          {!selectedCategory ? (
            <CategorySelector categories={healthCategories} onSelect={handleCategorySelect} />
          ) : (
            <ContentDisplay category={selectedCategory} />
          )}
        </motion.section>
      </div>
    </div>
  );
}
