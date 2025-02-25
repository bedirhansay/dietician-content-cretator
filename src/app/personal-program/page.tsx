'use client';

import PersonalProgramForm from '@/components/PersonalProgramForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function PersonalProgramPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      // API çağrısı ve program oluşturma işlemleri burada yapılacak
      console.log('Form data:', data);
      toast.success('Program başarıyla oluşturuldu!');
    } catch (error) {
      toast.error('Program oluşturulurken bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2"
        >
          <span>←</span>
          <span>Geri Dön</span>
        </button>
        <PersonalProgramForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
