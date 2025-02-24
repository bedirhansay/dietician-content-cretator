'use client';

import { scaleUp } from '@/styles/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

interface ContentDisplayProps {
  content: string;
  imageUrl: string;
  onShare?: () => void;
  onDownload?: () => void;
}

const ContentDisplay: FC<ContentDisplayProps> = ({ content, imageUrl, onShare, onDownload }) => {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-lg"
    >
      {imageUrl && (
        <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md">
          <Image src={imageUrl} alt="Generated content image" fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap">{content}</div>
      </div>

      <div className="flex gap-4 pt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShare}
          className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <span>Paylaş</span>
          <span className="text-xl">📤</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDownload}
          className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <span>İndir</span>
          <span className="text-xl">💾</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ContentDisplay;
