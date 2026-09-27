import {
  Avatar,
  Card,
  Label,
  Surface,
  Select,
  ListBox,
  Switch,
  Button,
  Separator,
} from "@heroui/react";
import { ThemePicker } from "../components/ThemePicker";

export default function settings() {
  const durations = ["5", "10", "15", "25", "30", "45", "60"];
  return (
    <Surface
      variant="secondary"
      className="flex flex-col overflow-y-auto h-screen lg:items-center lg:justify-start px-4 py-8  space-y-4 "
    >
      <h1 className="font-semibold text-4xl self-start">Settings</h1>
      <Separator />
      <Card className="max-w-4xl w-full">
        <Card.Header>
          <Card.Title className="text-xl">Your Acoount</Card.Title>
        </Card.Header>
        <Card.Content className="flex flex-row items-center gap-4 ">
          <Avatar className="size-25 shrink-0">
            <Avatar.Image
              className=""
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31AJgnafBIYpzoU5HsFTTn4zf4luRt2oPD4PJp_foew&s=10"
              }
            />
            <Avatar.Fallback>AM</Avatar.Fallback>
          </Avatar>
          <div>
            <p className="text-3xl font-medium">Mostafa Qasem</p>
            <p className="text-lg text-muted">@myacccountemaol.com</p>
          </div>
        </Card.Content>
      </Card>
      <Card className="max-w-4xl w-full">
        <Card.Header>
          <Card.Title className="text-xl"> App settings</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <ThemePicker />

          <Select>
            <Label>Background</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {durations.map((item, index) => (
                  <ListBox.Item key={index + 1} id={item} textValue={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <div className="flex flex-row justify-between w-full">
            <Label>Moving Background</Label>
            <Switch aria-label="Enable Pomodoro">
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </div>
          <Separator />
          <div className="flex flex-row justify-between w-full">
            <Label>Notifcations</Label>
            <Switch aria-label="Enable Pomodoro">
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </div>
          <Separator />
          <div className="flex flex-row justify-between w-full">
            <Label>Agent Support</Label>
            <Switch aria-label="Enable Pomodoro">
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </div>
        </Card.Content>
      </Card>
      <Card className="max-w-4xl w-full">
        <Card.Header>
          <Card.Title className="text-xl"> Todo settings</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-2">
          <Select>
            <Label>Pomodro Time</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {durations.map((item, index) => (
                  <ListBox.Item key={index + 1} id={item} textValue={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <Select>
            <Label>Manage Projects</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {durations.map((item, index) => (
                  <ListBox.Item key={index + 1} id={item} textValue={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <Select>
            <Label>Deletion mode</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {durations.map((item, index) => (
                  <ListBox.Item key={index + 1} id={item} textValue={item}>
                    {item}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <div className="space-y-4">
            <Label className="text-xl">Options</Label>
            <div className="flex flex-row justify-between w-full">
              <Label>Tags</Label>
              <Switch aria-label="Enable Pomodoro">
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
            <Separator />
            <div className="flex flex-row justify-between w-full">
              <Label>Due Date</Label>
              <Switch aria-label="Enable Pomodoro">
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
            <Separator />
            <div className="flex flex-row justify-between w-full">
              <Label>Priority</Label>
              <Switch aria-label="Enable Pomodoro">
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
            <Separator />
            <div className="flex flex-row justify-between w-full">
              <Label>Project</Label>
              <Switch aria-label="Enable Pomodoro">
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
          </div>
        </Card.Content>
      </Card>
      <Card className="max-w-4xl w-full">
        <Card.Header>
          <Card.Title className="text-danger">Danger Zone</Card.Title>
          <Card.Content className="space-y-2">
            <div className="flex flex-row justify-between items-center">
              <Label>Logout</Label>
              <Button variant="danger-soft">Logout</Button>
            </div>
            <Separator />
            <div className="flex flex-row justify-between items-center">
              <Label>Delete Account</Label>
              <Button variant="danger">Delete Peremenatlly</Button>
            </div>
          </Card.Content>
        </Card.Header>
      </Card>
    </Surface>
  );
}
