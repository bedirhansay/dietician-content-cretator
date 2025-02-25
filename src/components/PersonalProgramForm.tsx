'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface PersonalInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'moderate' | 'high';
  healthConditions: string[];
  dietaryPreferences: string[];
  goal: string;
}

const HEALTH_CONDITIONS = ['Diyabet', 'Hipertansiyon', 'Kalp Hastalığı', 'Çölyak', 'Laktoz İntoleransı'];

const DIETARY_PREFERENCES = ['Vegan', 'Vejetaryen', 'Glutensiz', 'Laktozsuz', 'Ketojenik'];

const GOALS = ['Kilo Verme', 'Kas Geliştirme', 'Sağlıklı Yaşam', 'Performans Artırma'];

export default function PersonalProgramForm({ onSubmit }: { onSubmit: (data: PersonalInfo) => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    age: 0,
    gender: 'other',
    height: 0,
    weight: 0,
    activityLevel: 'moderate',
    healthConditions: [],
    dietaryPreferences: [],
    goal: '',
  });

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.age)) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }
    if (step === 2 && (!formData.height || !formData.weight)) {
      toast.error('Lütfen boy ve kilo bilgilerinizi girin');
      return;
    }
    if (step === 3 && !formData.goal) {
      toast.error('Lütfen hedefinizi seçin');
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-1/3 h-2 rounded-full ${s <= step ? 'bg-green-500' : 'bg-gray-200'}`} />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {step === 1 && 'Kişisel Bilgiler'}
          {step === 2 && 'Fiziksel Ölçümler'}
          {step === 3 && 'Hedefler ve Tercihler'}
        </h2>
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">İsim</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yaş</label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cinsiyet</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'other' })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            >
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
              <option value="other">Diğer</option>
            </select>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Boy (cm)</label>
            <input
              type="number"
              value={formData.height || ''}
              onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilo (kg)</label>
            <input
              type="number"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aktivite Seviyesi</label>
            <select
              value={formData.activityLevel}
              onChange={(e) =>
                setFormData({ ...formData, activityLevel: e.target.value as 'sedentary' | 'moderate' | 'high' })
              }
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            >
              <option value="sedentary">Sedanter (Az Hareketli)</option>
              <option value="moderate">Orta Düzey Aktif</option>
              <option value="high">Çok Aktif</option>
            </select>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sağlık Durumu</label>
            <div className="grid grid-cols-2 gap-2">
              {HEALTH_CONDITIONS.map((condition) => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.healthConditions.includes(condition)}
                    onChange={(e) => {
                      const newConditions = e.target.checked
                        ? [...formData.healthConditions, condition]
                        : formData.healthConditions.filter((c) => c !== condition);
                      setFormData({ ...formData, healthConditions: newConditions });
                    }}
                    className="rounded text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diyet Tercihleri</label>
            <div className="grid grid-cols-2 gap-2">
              {DIETARY_PREFERENCES.map((pref) => (
                <label key={pref} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.dietaryPreferences.includes(pref)}
                    onChange={(e) => {
                      const newPrefs = e.target.checked
                        ? [...formData.dietaryPreferences, pref]
                        : formData.dietaryPreferences.filter((p) => p !== pref);
                      setFormData({ ...formData, dietaryPreferences: newPrefs });
                    }}
                    className="rounded text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm">{pref}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hedef</label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
            >
              <option value="">Hedef Seçin</option>
              {GOALS.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="px-6 py-2 text-gray-600 hover:text-gray-800">
            Geri
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-auto"
        >
          {step === 3 ? 'Program Oluştur' : 'Devam Et'}
        </button>
      </div>
    </motion.div>
  );
}
