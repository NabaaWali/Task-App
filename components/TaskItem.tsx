'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Priority, Task } from '../types/task';
import { formatDueDate, isOverdue } from '../lib/formatDueDate';

const priorityBadgeStyles: Record<Priority, string> = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const titleInputClassName =
  'min-w-[8rem] rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export default function TaskItem({
  id,
  title,
  completed,
  priority,
  dueDate,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const formattedDueDate = formatDueDate(dueDate);
  const overdue = isOverdue(dueDate, completed);

  const startEditing = () => {
    setEditTitle(title);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    cancelRef.current = true;
    setEditTitle(title);
    setIsEditing(false);
  };

  const saveTitle = () => {
    if (cancelRef.current) {
      cancelRef.current = false;
      return;
    }

    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== title) {
      onUpdate(id, { title: trimmed });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => onDelete(id), 300);
  };

  const animationClass = isExiting
    ? 'translate-x-8 opacity-0'
    : mounted
      ? 'translate-x-0 translate-y-0 opacity-100'
      : 'translate-y-2 opacity-0';

  return (
    <li
      className={`flex items-center justify-between rounded-lg bg-white p-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-800 dark:shadow-gray-900/50 ${animationClass}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onUpdate(id, { completed: !completed })}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
        />
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={handleKeyDown}
            autoFocus
            className={titleInputClassName}
          />
        ) : (
          <span
            onClick={startEditing}
            title="Click to edit"
            className={`cursor-pointer ${
              completed
                ? 'text-gray-400 line-through dark:text-gray-500'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            {title}
          </span>
        )}
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadgeStyles[priority]}`}
        >
          {priority}
        </span>
        {formattedDueDate && (
          <span
            className={`text-sm ${
              overdue
                ? 'font-medium text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {formattedDueDate}
          </span>
        )}
      </div>
      <button
        onClick={handleDelete}
        disabled={isExiting}
        className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
      >
        Delete
      </button>
    </li>
  );
}
