"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Icon, type IconName } from '@/components/icons/Icon';

interface ActionItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
  color: string;
}

const actions: ActionItem[] = [
  { id: '1', label: 'New Trip', icon: 'Plus', href: '/app/planner/new', color: 'bg-primary/10 text-primary' },
  { id: '2', label: 'Explore', icon: 'Globe2', href: '/app/explore', color: 'bg-blue-500/10 text-blue-500' },
  { id: '3', label: 'Saved Places', icon: 'Bookmark', href: '/app/collections', color: 'bg-yellow-500/10 text-yellow-600' },
  { id: '4', label: 'Import', icon: 'UploadCloud', href: '/app/import', color: 'bg-green-500/10 text-green-600' },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {actions.map((action, index) => (
        <motion.a
          key={action.id}
          href={action.href}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-sm hover:border-border transition-colors"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${action.color}`}>
            <Icon name={action.icon} size={20} />
          </div>
          <span className="text-sm font-medium">{action.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
