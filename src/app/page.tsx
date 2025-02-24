'use client';

import CategoryBubbles from '@/components/CategoryBubbles';
import ContentDisplay from '@/components/ContentDisplay';
import DefaultContent from '@/components/DefaultContent';
import { healthCategories } from '@/data/categories';
import { hasReachedLimit, incrementRequestCount, MAX_REQUESTS } from '@/lib/cookies';
import { fadeIn } from '@/styles/animations';
import { GeneratedContent, HealthCategory } from '@/types/health';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HealthCategory | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan al
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleCategorySelect = async (category: HealthCategory) => {
    if (hasReachedLimit()) {
      toast.error('Günlük içerik oluşturma limitinize ulaştınız! Yarın tekrar deneyebilirsiniz.', {
        duration: 5000,
        position: 'top-center',
        icon: '⚠️',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedCategory(category);

    try {
      // İçerik oluştur
      const contentResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category.title }),
      });

      if (!contentResponse.ok) throw new Error('İçerik oluşturulamadı');
      const { content } = await contentResponse.json();

      // Görsel oluştur
      const imageResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category.id }),
      });

      if (!imageResponse.ok) throw new Error('Görsel oluşturulamadı');
      const { imageUrl } = await imageResponse.json();

      setGeneratedContent({ content, imageUrl });

      // İstek sayısını artır ve kalan hakkı göster
      const requestCount = incrementRequestCount();
      const remainingRequests = MAX_REQUESTS - requestCount;

      if (remainingRequests > 0) {
        toast.success(`İçerik oluşturuldu! Kalan hakkınız: ${remainingRequests}`, {
          duration: 3000,
          position: 'top-center',
          icon: '✨',
        });
      } else {
        toast('Bu son içerik oluşturma hakkınızdı. Yarın tekrar bekleriz!', {
          duration: 5000,
          position: 'top-center',
          icon: '⏳',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      // Hata durumunda direkt DefaultContent'i göster
      setGeneratedContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (generatedContent) {
      try {
        await navigator.share({
          title: selectedCategory?.title || 'Sağlıklı Yaşam İçeriği',
          text: generatedContent.content,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Paylaşım hatası:', err);
      }
    }
  };

  const handleDownload = () => {
    if (generatedContent) {
      const element = document.createElement('a');
      const file = new Blob([generatedContent.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${selectedCategory?.title || 'content'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Toaster bileşenini ekle */}
      <Toaster />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-10"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            🌟 Sağlıklı Yaşam
          </h1>
          {user && (
            <div className="flex items-center gap-6">
              <span className="text-gray-600">Hoş geldin, {user.name}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  localStorage.removeItem('user');
                  document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  router.push('/login');
                }}
                className="px-4 py-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Çıkış Yap
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-24 min-h-screen">
        <motion.section variants={fadeIn} initial="hidden" animate="visible" className="max-w-7xl mx-auto p-4">
          {!selectedCategory ? (
            <div className="py-12">
              <CategoryBubbles categories={healthCategories} onSelect={handleCategorySelect} />
            </div>
          ) : (
            <div className="space-y-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
              >
                <span>←</span>
                <span>Kategorilere Dön</span>
              </motion.button>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                </div>
              ) : error ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">{error}</div>
                  <DefaultContent category={selectedCategory?.title || ''} />
                </motion.div>
              ) : generatedContent ? (
                <ContentDisplay
                  content={generatedContent.content}
                  imageUrl={generatedContent.imageUrl}
                  onShare={handleShare}
                  onDownload={handleDownload}
                />
              ) : null}
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}
