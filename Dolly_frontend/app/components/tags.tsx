import { useTodos } from "@/store/TodosStore";
import { Select, Label, ListBox, Card, Button } from "@heroui/react";

import { Calendar, DateField, DatePicker } from "@heroui/react";
import type { DateValue } from "@internationalized/date";
import { X } from "lucide-react";

const selectItems = [
  { style: "Pomodoro", isPomodoro: "on" },
  { style: "Normal", isPomodoro: "off" },
];

const noProject = "no project";
const noPiority = "no piority";
const priorities = ["P1", "P2", "P3", "P4"];
export default function Tags({
  datePickerValue,
  setDatePickerValue,
}: {
  datePickerValue: DateValue | null;
  setDatePickerValue: (value: DateValue | null) => void;
}) {
  const setProjectName = useTodos((s) => s.setProjectName);
  const projects = useTodos((s) => s.projects);
  const pomodoro = useTodos((s) => s.selectPomodoro);
  const setPomodoro = useTodos((s) => s.setPomodoro);
  const selectPiority = useTodos((s) => s.selectPiority);
  const setpiority = useTodos((s) => s.setPiority);
  return (
    <Card className="w-full space-y-4 max-w-3xl" variant="secondary">
      <Card.Content className=" grid grid-cols-1 gap-y-4 place-items-center md:grid-cols-2">
        <Select
          className="max-w-[256px] w-full "
          placeholder="Select one"
          value={pomodoro}
          onChange={(value) => {
            if (value == "on") setPomodoro("on");
            if (value == "off") setPomodoro("off");
          }}
          isDisabled={datePickerValue != null}
        >
          <Label>Style</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {selectItems.map((item, index) => (
                <ListBox.Item
                  key={index}
                  id={item.isPomodoro}
                  textValue={item.style}
                >
                  {item.style}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

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
        >
          <Label>Project</Label>
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
        <Select
          value={selectPiority}
          onChange={(value) => {
            if (value === noPiority) {
              setpiority(null);
              return;
            }
            if (
              value === null ||
              value === "P1" ||
              value === "P2" ||
              value === "P3" ||
              value === "P4"
            ) {
              setpiority(value);
            }
          }}
          placeholder="No Piority"
          className="max-w-[256px] w-full"
        >
          <Label>Priority</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {priorities.map((item, index) => (
                <ListBox.Item key={index + 1} id={item} textValue={item}>
                  {item}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
              <ListBox.Item id={noPiority} textValue={noPiority}>
                No priority
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <div className="w-full flex justify-center items-center ">
          <DatePicker
            className="max-w-[256px] w-full "
            name="date"
            value={datePickerValue}
            onChange={setDatePickerValue}
            isDisabled={pomodoro === "on"}
          >
            <Label>Due Date</Label>

            <DateField.Group fullWidth>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateField.Suffix>
                <DatePicker.Trigger>
                  <DatePicker.TriggerIndicator />
                </DatePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>
            <DatePicker.Popover>
              <Calendar aria-label="Event date">
                <Calendar.Header>
                  <Calendar.YearPickerTrigger>
                    <Calendar.YearPickerTriggerHeading />
                    <Calendar.YearPickerTriggerIndicator />
                  </Calendar.YearPickerTrigger>
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
                <Calendar.YearPickerGrid>
                  <Calendar.YearPickerGridBody>
                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                  </Calendar.YearPickerGridBody>
                </Calendar.YearPickerGrid>
              </Calendar>
            </DatePicker.Popover>
          </DatePicker>
          {datePickerValue != null && (
            <Button
              onPress={() => setDatePickerValue(null)}
              isIconOnly
              className={"self-end"}
            >
              <X />
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
