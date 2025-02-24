import { generateImage } from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { category } = await req.json();

    if (!category) {
      return NextResponse.json({ error: 'Kategori belirtilmedi' }, { status: 400 });
    }

    const imageUrl = await generateImage(category);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Görsel oluşturulurken bir hata oluştu' }, { status: 500 });
  }
}
