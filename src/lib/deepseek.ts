import { GeneratedContent } from '@/types/health';
import OpenAI from 'openai';

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('DEEPSEEK_API_KEY is not defined');
}

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function generateContent(category: string): Promise<GeneratedContent> {
  const prompt = `Sen bir sağlık ve diyet içerik üreticisisin.

  Şu kategori için sosyal medyada paylaşılacak bir içerik oluştur: ${category}

  İçerik formatı:
  1. Emoji içeren dikkat çekici bir başlık
  2. Konuyu özetleyen 1-2 cümle
  3. 5 maddelik bilgilendirici içerik (her madde için emoji kullan)
  4. Etkileşim için soru içeren bir kapanış cümlesi

  Önemli Notlar:
  - İçerik bilimsel ama anlaşılır olmalı
  - Güncel sağlık araştırmalarına dayalı bilgiler kullan
  - Emojilerle destekle
  - Motivasyon verici bir ton kullan
  - Maksimum 500 kelime
  - Türkçe olarak yanıt ver`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'Sen bir sağlık ve diyet uzmanısın. Bilimsel ama anlaşılır içerikler üretiyorsun.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content;

    return {
      title: `${category} İçin Öneriler`,
      content: content || 'İçerik oluşturulamadı',
      imageUrl: '/carrot.png',
    };
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('İçerik oluşturulurken bir hata oluştu');
  }
}

export async function generateImage(category: string): Promise<string> {
  // Şimdilik varsayılan görsel döndürüyoruz
  return '/carrot.png';
}
