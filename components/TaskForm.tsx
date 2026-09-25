'use client';

import { useState, FormEvent } from 'react';
import type { Priority } from '../types/task';

interface TaskFormProps {
  onAddTask: (title: string, priority: Priority, dueDate?: string) => void;
}

const inputClassName =
  'rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100';

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAddTask(trimmed, priority, dueDate || undefined);
    setTitle('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex flex-row flex-wrap gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className={`min-w-0 flex-1 ${inputClassName}`}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className={`px-3 ${inputClassName}`}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`px-3 ${inputClassName}`}
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
