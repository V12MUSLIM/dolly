import { Card, Label, Switch, Select, ListBox } from "@heroui/react";
import AddTodo from "./addTodo";
import { useTodos } from "@/store/TodosStore";
import { today, getLocalTimeZone } from "@internationalized/date";
export default function QuickAdd() {
  const todayDatae = today(getLocalTimeZone());
  const setProjectName = useTodos((s) => s.setProjectName);

  const projects = useTodos((s) => s.projects);

  const noProject = "no project";
  const setDatePickerValue = useTodos((s) => s.setDatePickerValue);
  const DatePickerValue = useTodos((s) => s.datePickerValue) ?? "";

  const pomodoro = useTodos((s) => s.selectPomodoro);
  const setPomodoro = useTodos((s) => s.setPomodoro);
  console.log(DatePickerValue);
  return (
    <Card>
      <AddTodo variant="secondary" />
      <Card.Footer className="flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-2">
          <Switch
            value={pomodoro}
            onChange={(value) =>
              value === true ? setPomodoro("on") : setPomodoro("off")
            }
            aria-label="Enable Pomodoro"
          >
            <Switch.Content>
              <Label>Pomodoro</Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
          <Switch
            value={DatePickerValue}
            onChange={(value) =>
              value === true
                ? setDatePickerValue(todayDatae.toString())
                : setDatePickerValue(null)
            }
            aria-label="Enable notifications"
          >
            <Switch.Content>
              <Label>Today</Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        </div>
        <Select
          className="max-w-[256px] w-full text-accent"
          placeholder="No Project"
          onChange={(value) => {
            if (value === noProject) {
              setProjectName(null);
              return;
            }
            const selectedProject = projects.find(
              (project) => project?.id === value,
            );

            setProjectName(selectedProject ?? null);
          }}
          defaultValue={noProject}
          variant="secondary"
        >
          <Select.Trigger className={"text-accent font-semibold"}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {projects.map((project) => (
                <ListBox.Item
                  key={project?.id}
                  id={project?.id}
                  textValue={project?.name}
                >
                  {project?.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
              <ListBox.Item id={noProject} textValue={noProject}>
                No Project
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </Card.Footer>
    </Card>
  );
}
