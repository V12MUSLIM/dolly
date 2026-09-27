export default function useDueDate(dueDate?: string | null) {
  if (!dueDate) return { label: null };
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const dayDif = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (dayDif < 0)
    return {
      label: `Overdue  ${Math.abs(dayDif)}d`,
      isMissed: true,
      dayDif,
    };
  if (dayDif === 0) return { label: "today", isMissed: false, dayDif };
  if (dayDif === 1) return { label: "tomorrow", isMissed: false, dayDif };
  return { label: `in ${dayDif}d`, isMissed: false, dayDif };
}
