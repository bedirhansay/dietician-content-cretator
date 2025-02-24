'use client';

import Image from 'next/image';
import { useState } from 'react';

type GeneratedContent = {
  content: string;
  imageUrl: string;
};

export default function ContentGenerator({ category }: { category: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      if (!response.ok) throw new Error('İçerik oluşturulamadı');

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={generateContent}
        disabled={isLoading}
        className="w-full mb-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
      >
        {isLoading ? 'İçerik Oluşturuluyor...' : 'İçerik Oluştur'}
      </button>

      {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {content && (
        <div className="space-y-6">
          {content.imageUrl && (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src={content.imageUrl} alt="Generated content image" fill className="object-cover" />
            </div>
          )}
          <div className="whitespace-pre-wrap">{content.content}</div>
        </div>
      )}
    </div>
  );
}
