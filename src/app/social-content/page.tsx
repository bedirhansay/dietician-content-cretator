'use client';

import CategorySelector from '@/components/CategorySelector';
import ContentDisplay from '@/components/ContentDisplay';
import { healthCategories } from '@/data/categories';
import { fadeIn } from '@/styles/animations';
import { GeneratedContent, HealthCategory } from '@/types/health';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SocialContentPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<HealthCategory | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = async (category: HealthCategory) => {
    setSelectedCategory(category);
    setIsLoading(true);

    try {
      const contentResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category.title }),
      });

      if (!contentResponse.ok) throw new Error('İçerik oluşturulamadı');
      const generatedContent = await contentResponse.json();

      setGeneratedContent(generatedContent);
    } catch (error) {
      console.error('Content generation error:', error);
      toast.error('İçerik oluşturulurken bir hata oluştu');
      setGeneratedContent(null);
    } finally {
      setIsLoading(false);
    }
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
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                </div>
              ) : (
                <ContentDisplay category={selectedCategory} generatedContent={generatedContent} />
              )}
            </>
          )}
        </motion.section>
      </div>
    </div>
  );
}
