'use client';

import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';
import ToastContainer from '../components/ToastContainer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Task } from '../types/task';
import type { Toast } from '../types/toast';

type Filter = 'All' | 'Active' | 'Completed';

const FILTERS: Filter[] = ['All', 'Active', 'Completed'];

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<Filter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (message: string, type: Toast['type']) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const addTask = (
    title: string,
    priority: Task['priority'],
    dueDate?: string
  ) => {
    try {
      setTasks((prev) => [
        ...prev,
        { id: crypto.randomUUID(), title, completed: false, priority, dueDate },
      ]);
      addToast('Task added', 'success');
    } catch {
      addToast('Something went wrong', 'error');
    }
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    try {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
      addToast('Task updated', 'success');
    } catch {
      addToast('Something went wrong', 'error');
    }
  };

  const deleteTask = (id: string) => {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      addToast('Task deleted', 'success');
    } catch {
      addToast('Something went wrong', 'error');
    }
  };

  const statusFilteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const filteredTasks = statusFilteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Add one above!'
      : statusFilteredTasks.length === 0
        ? 'No tasks match this filter.'
        : searchQuery.trim()
          ? 'No tasks match your search.'
          : 'No tasks match this filter.';

  return (
    <>
      <main className="mx-auto max-w-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Task Manager
          </h1>
          <ThemeToggle />
        </div>

        <TaskForm onAddTask={addTask} />

        <div className="mt-6 flex justify-evenly">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? 'rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700'
                  : 'rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }
            >
              {f}
            </button>
          ))}
        </div>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onUpdate={updateTask}
          emptyMessage={emptyMessage}
        />
      </main>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
