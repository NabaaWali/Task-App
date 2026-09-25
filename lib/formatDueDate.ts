function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDueDate(dueDate: string): Date | null {
  const parsed = new Date(`${dueDate}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDueDate(dueDate?: string | null): string | null {
  if (!dueDate?.trim()) return null;

  const due = parseDueDate(dueDate);
  if (!due) return null;

  const today = startOfDay(new Date());
  const diffDays = Math.round(
    (startOfDay(due).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return `In ${diffDays} days`;
}

export function isOverdue(
  dueDate: string | null | undefined,
  completed: boolean
): boolean {
  if (!dueDate?.trim() || completed) return false;

  const due = parseDueDate(dueDate);
  if (!due) return false;

  return startOfDay(due).getTime() < startOfDay(new Date()).getTime();
}
