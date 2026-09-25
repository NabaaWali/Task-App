import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  emptyMessage?: string;
}

export default function TaskList({
  tasks,
  onDelete,
  onUpdate,
  emptyMessage = 'No tasks yet. Add one above!',
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="mt-6 py-12 text-center text-gray-400 dark:text-gray-500">
        <span className="mb-2 block text-3xl">📝</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          priority={task.priority}
          dueDate={task.dueDate}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
