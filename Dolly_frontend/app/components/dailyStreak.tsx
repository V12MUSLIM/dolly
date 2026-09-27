import useTodayTodos from "@/hooks/useTodayTodos";
import { useTodos } from "@/store/TodosStore";
import { Calendar, Card } from "@heroui/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useEffect } from "react";
export default function DailyStreak() {
  const currentDay = today(getLocalTimeZone());
  const todos = useTodos((s) => s.todos);
  const todosForDate = useTodayTodos(todos);
  const completedDates = useTodos((s) => s.completedDates);
  const addSelectedDate = useTodos((s) => s.addSelectedDate);
  const completedDay =
    todosForDate.length > 0 && todosForDate.every((todo) => todo.completed);

  useEffect(() => {
    if (completedDay) {
      addSelectedDate(currentDay.toString());
    }
  }, [completedDay, currentDay, addSelectedDate]);
  const selectedDates = completedDates.map(parseDate);
  return (
    <Card variant="secondary" className="w-full">
      <Card.Header className="flex flex-row justify-between">
        <Card.Title className="text-xl">Daily Streak</Card.Title>
        <Card.Title>{selectedDates.length}&nbsp;Days</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-2 w-full">
        <Calendar
          isReadOnly
          aria-label="Daily streak"
          selectionMode="multiple"
          value={selectedDates}
          focusedValue={currentDay}
          className={"w-ful"}
        >
          <Calendar.Header>
            <Calendar.Heading />
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </Card.Content>
    </Card>
  );
}
