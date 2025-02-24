import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = openai.chat.completions.create({
  model: 'gpt-4o-mini',
  store: true,
  messages: [{ role: 'user', content: 'write a haiku about ai' }],
});

completion.then((result) => console.log(result.choices[0].message));

export type ContentGenerationParams = {
  category: string;
  title?: string;
  tone?: 'professional' | 'casual' | 'motivational';
};

// Kategori bazlı görsel prompt şablonları
const categoryImagePrompts: Record<string, string> = {
  'weight-muscle': `Create a modern fitness infographic showing:
    - A balanced plate with macro nutrients (protein, carbs, healthy fats)
    - Simple exercise illustrations
    - Progress tracking elements
    Style: Clean, minimalist, using soft green and blue tones`,

  'mental-health': `Create a calming mental wellness illustration showing:
    - Meditation or mindfulness symbols
    - Stress-relief techniques visualization
    - Nature elements (leaves, water)
    Style: Gentle, soothing colors, using soft blues and lavenders`,

  'healthy-eating': `Create a healthy eating infographic with:
    - Colorful fruits and vegetables arrangement
    - Portion size guide
    - Rainbow diet concept
    Style: Vibrant but professional, using fresh natural colors`,

  'baby-child': `Create a child-friendly nutrition illustration with:
    - Fun and colorful healthy food characters
    - Age-appropriate portion sizes
    - Growth-supporting foods
    Style: Playful, cheerful, using bright but soft colors`,

  'vegan-vegetarian': `Create a plant-based diet infographic showing:
    - Variety of plant protein sources
    - Colorful vegetables and legumes
    - Essential nutrients guide
    Style: Natural, organic feel, using earth tones and greens`,

  'detox-immunity': `Create a wellness infographic featuring:
    - Immune-boosting foods
    - Detox drinks and ingredients
    - Body cleansing concepts
    Style: Clean, refreshing look, using purifying blues and greens`,
};

export async function generateImage(category: string) {
  try {
    // Kategori için özel prompt al veya varsayılan kullan
    const basePrompt = categoryImagePrompts[category] || `Create a health and wellness image about: ${category}`;
    const prompt = `${basePrompt}
      Common Style Guidelines:
      - Modern and minimalist design
      - Professional medical/health aesthetic
      - Clear visual hierarchy
      - Soft, calming color palette
      - Include relevant icons or symbols
      - Avoid text-heavy elements
      - Keep it social media friendly`;

    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural',
    });

    return response.data[0].url;
  } catch (error) {
    console.error('OpenAI Image API Error:', error);
    throw new Error('Görsel oluşturulurken bir hata oluştu');
  }
}

export async function generateContent({ category, tone = 'casual' }: ContentGenerationParams) {
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

  Ton: ${tone}
  Dil: Türkçe
  Hedef Kitle: Sağlıklı yaşam konusunda bilgi arayan sosyal medya kullanıcıları`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Sen bir sağlık ve diyet uzmanısın. Bilimsel ama anlaşılır içerikler üretiyorsun.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('İçerik oluşturulurken bir hata oluştu');
  }
}
