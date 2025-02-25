'use client';

import { HealthCategory } from '@/types/health';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import { FaCopy, FaShare } from 'react-icons/fa';

interface ContentDisplayProps {
  category: HealthCategory;
}

const ContentDisplay: FC<ContentDisplayProps> = ({ category }) => {
  // Kategori bazlı örnek içerik
  const defaultContent = {
    title: `${category.emoji} ${category.title} İçin Öneriler`,
    content: `✨ ${category.title} hakkında bilmeniz gerekenler:

🎯 Temel Bilgiler:
${category.description}

🔑 Önemli İpuçları:
• ${getRandomTip(category.id)}
• ${getRandomTip(category.id)}
• ${getRandomTip(category.id)}
• ${getRandomTip(category.id)}
• ${getRandomTip(category.id)}

💡 Günlük Öneriler:
${getDailyAdvice(category.id)}

❓ Siz de ${category.title.toLowerCase()} konusunda deneyimlerinizi paylaşın! Hangi yöntemler sizin için daha etkili oluyor?

#SağlıklıYaşam #${category.title.replace(/\s+/g, '')} #Sağlık #Beslenme`,
    imageUrl: '/carrot.png',
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(defaultContent.content);
    toast.success('İçerik kopyalandı!', {
      icon: '📋',
      duration: 2000,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: defaultContent.title,
        text: defaultContent.content,
        url: window.location.href,
      });
    } catch (err) {
      toast.error('Paylaşım yapılırken bir hata oluştu');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol taraf - İçerik */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{defaultContent.title}</h2>
            <div className="prose prose-lg">
              <div className="whitespace-pre-wrap text-gray-600">{defaultContent.content}</div>
            </div>
            <div className="flex gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyContent}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                <FaCopy />
                <span>Kopyala</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <FaShare />
                <span>Paylaş</span>
              </motion.button>
            </div>
          </div>

          {/* Sağ taraf - Görsel */}
          <div className="w-full md:w-1/3">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md">
              <Image
                src={defaultContent.imageUrl}
                alt={category.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Kategori bazlı ipuçları
function getRandomTip(categoryId: string): string {
  const tips: Record<string, string[]> = {
    'healthy-eating': [
      '🥗 Günde en az 5 porsiyon sebze ve meyve tüketin',
      '🍳 Kahvaltıyı asla atlamayın',
      '🥩 Protein kaynaklarını çeşitlendirin',
      '🌰 Sağlıklı yağları ihmal etmeyin',
      '🚰 Günde 2-3 litre su için',
    ],
    'weight-muscle': [
      '💪 Düzenli direnç egzersizleri yapın',
      '🏃‍♂️ Kardiyo ve ağırlık dengesini koruyun',
      '🥚 Yeterli protein alımına dikkat edin',
      '⚖️ Kalori dengenizi kontrol edin',
      '😴 Kas gelişimi için yeterli uyuyun',
    ],
    'mental-health': [
      '🧘‍♀️ Günlük meditasyon yapın',
      '📝 Günlük tutun',
      '🌳 Doğada vakit geçirin',
      '🎯 Küçük hedefler belirleyin',
      '👥 Sosyal bağlantılarınızı güçlendirin',
    ],
    'vegan-vegetarian': [
      '🌱 B12 takviyesini ihmal etmeyin',
      '🥜 Protein kaynaklarını çeşitlendirin',
      '🍠 Demir açısından zengin besinler tüketin',
      '🥑 Sağlıklı yağları ihmal etmeyin',
      '🌿 Yeşil yapraklı sebzeleri artırın',
    ],
  };

  const defaultTips = [
    '✅ Düzenli check-up yaptırın',
    '🎯 Hedeflerinizi gerçekçi tutun',
    '📊 İlerleyişinizi takip edin',
    '🤝 Uzman desteği alın',
    '📱 Sağlık uygulamalarından faydalanın',
  ];

  const categoryTips = tips[categoryId] || defaultTips;
  return categoryTips[Math.floor(Math.random() * categoryTips.length)];
}

// Kategori bazlı günlük öneriler
function getDailyAdvice(categoryId: string): string {
  const advice: Record<string, string> = {
    'healthy-eating': '🍽️ Öğünlerinizi küçük porsiyonlara bölerek, günde 5-6 öğün beslenmeyi deneyin.',
    'weight-muscle': '💪 Haftada en az 3-4 gün düzenli egzersiz yapın ve protein alımınızı artırın.',
    'mental-health': '🧘‍♀️ Her gün 10-15 dakika kendinize ayırın ve mindfulness pratikleri yapın.',
    'vegan-vegetarian': '🌱 Günlük protein ihtiyacınızı karşılamak için baklagilleri menünüze ekleyin.',
  };

  return (
    advice[categoryId] ||
    '📌 Her gün küçük adımlarla başlayın ve tutarlı bir şekilde devam edin. Unutmayın, küçük değişiklikler büyük sonuçlar doğurur!'
  );
}

export default ContentDisplay;
