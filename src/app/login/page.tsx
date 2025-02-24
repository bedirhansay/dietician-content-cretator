'use client';

import { users } from '@/data/users';
import { scaleUp } from '@/styles/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Kullanıcı kontrolü
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: user.email,
          name: user.name,
        })
      );

      // Auth durumunu cookie'ye kaydet (middleware için)
      document.cookie = 'isLoggedIn=true; path=/';

      // Ana sayfaya yönlendir
      router.push('/');
    } else {
      setError('Geçersiz email veya şifre');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <motion.div variants={scaleUp} initial="hidden" animate="visible" className="w-full max-w-md relative">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-24 h-24 mx-auto relative mb-6"
            >
              <Image src="/logo.png" alt="Logo" fill className="object-contain drop-shadow-lg" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            >
              Sağlıklı Yaşam
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-gray-600"
            >
              İçerik üreticisine hoş geldiniz
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleLogin}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 text-white font-medium rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Giriş yapılıyor...</span>
                </div>
              ) : (
                'Giriş Yap'
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-center text-gray-500 bg-white/50 p-4 rounded-xl backdrop-blur-sm"
            >
              <p className="font-medium mb-2">Demo Hesap Bilgileri</p>
              <p>Email: demo@example.com</p>
              <p>Şifre: demo123</p>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
