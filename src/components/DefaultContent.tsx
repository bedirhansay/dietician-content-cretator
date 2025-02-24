'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { toast } from 'react-hot-toast';
import { FaCopy, FaImage } from 'react-icons/fa';
interface DefaultContentProps {
  category: string;
}

const DefaultContent: FC<DefaultContentProps> = ({ category }) => {
  const defaultContent = {
    title: '💪 Sağlıklı Yaşam Rehberi',
    content: `🌟 ${category} hakkında örnek içerik:

✨ Düzenli egzersiz ve dengeli beslenme sağlıklı yaşamın temel taşlarıdır.

🔑 Önemli Noktalar:
• 🍎 Günde 5 porsiyon meyve ve sebze tüketin
• 💧 En az 2 litre su için
• 🏃‍♀️ Haftada 150 dakika orta şiddette egzersiz yapın
• 😴 7-9 saat kaliteli uyku alın
• 🧘‍♀️ Stres yönetimi için meditasyon yapın

❓ Siz de sağlıklı yaşam için hangi adımları atıyorsunuz?`,
    imageUrl: 'https://images.unsplash.com/photo-1665040932084-d37961f06f48',
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(defaultContent.content);
    toast.success('İçerik kopyalandı!', {
      icon: '📋',
      duration: 2000,
    });
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = defaultContent.imageUrl;
    link.download = 'saglikli-yasam.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Görsel indiriliyor...', {
      icon: '🖼️',
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <div className="flex justify-between items-start gap-8">
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
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaCopy />
                <span>İçeriği Kopyala</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadImage}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaImage />
                <span>Görseli İndir</span>
              </motion.button>
            </div>
          </div>

          {/* Sağ taraf - Görsel */}
          <div className="w-1/3">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="./windpw.svg"
                alt="Sağlıklı Yaşam"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DefaultContent;
