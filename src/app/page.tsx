'use client';

import ProgramTypeSelector from '@/components/ProgramTypeSelector';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
        <ProgramTypeSelector />
      </div>
    </main>
  );
}
