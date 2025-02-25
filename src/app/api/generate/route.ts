import { generateContent } from '@/lib/deepseek';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { category } = await request.json();
    const content = await generateContent(category);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json({ error: 'İçerik oluşturulurken bir hata oluştu' }, { status: 500 });
  }
}
