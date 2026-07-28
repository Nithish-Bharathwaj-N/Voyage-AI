'use client';

import React from 'react';
import type { Collection } from '@/lib/collections/types/collections.types';
import { CollectionCard } from '../cards/CollectionCard';
import { motion, AnimatePresence } from 'framer-motion';

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {collections.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <CollectionCard collection={collection} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
