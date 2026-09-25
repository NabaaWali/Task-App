'use client';

import { useEffect, useState } from 'react';

interface ToastItemProps {
  id: string;
  message: string;
  type: 'success' | 'error';
  onRemove: (id: string) => void;
}

export default function ToastItem({
  id,
  message,
  type,
  onRemove,
}: ToastItemProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <p className="flex-1 text-sm font-medium text-white">{message}</p>
      <button
        type="button"
        onClick={() => onRemove(id)}
        aria-label="Dismiss notification"
        className="text-lg leading-none text-white/80 transition-colors hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
