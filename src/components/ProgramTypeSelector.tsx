'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ProgramTypeSelector() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Kişiye Özel Program Kutusu */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => router.push('/personal-program')}
          className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Kişiye Özel Program</h2>
          <p className="text-gray-600">
            Danışanın kişisel bilgilerini alarak, özel beslenme ve egzersiz programı oluşturun.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Detaylı form ile veri toplama
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Kişiselleştirilmiş öneriler
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Sağlık durumuna özel yaklaşım
            </li>
          </ul>
          <button className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Program Oluştur
          </button>
        </motion.div>

        {/* Sosyal Medya İçeriği Kutusu */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          onClick={() => router.push('/social-content')}
          className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">📱</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Sosyal Medya İçeriği</h2>
          <p className="text-gray-600">
            Farklı sağlık kategorilerinde, paylaşıma hazır sosyal medya içerikleri oluşturun.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Hazır içerik şablonları
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Görsel ve metin içerikleri
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Kolay paylaşım seçenekleri
            </li>
          </ul>
          <button className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            İçerik Oluştur
          </button>
        </motion.div>
      </div>
    </div>
  );
}
