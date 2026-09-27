import { useTodos } from "@/store/TodosStore";
import { Button, Card, Modal, Tooltip } from "@heroui/react";
import { FileDown, ListCheck, ListX, Trash } from "lucide-react";


interface QuickActionsProps {
  className?: "" | string;
}
interface QuiclActionButtonProps {
  label: string;
  onPress?: () => void;
  children: React.ReactNode;
}
function QuickActionButton({
  label,
  onPress,
  children,
}: QuiclActionButtonProps) {
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <Button variant="secondary" isIconOnly onPress={onPress}>
          {children}
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Content showArrow placement="bottom end">
        <Tooltip.Arrow />
        <p>{label}</p>
      </Tooltip.Content>
    </Tooltip>
  );
}

export default function QuickActions({ className }: QuickActionsProps) {
  const deleteAll = useTodos((s) => s.deleteAll);
  const markAllCompleted = useTodos((s) => s.markAllCompleted);
  const markAllUncompleted = useTodos((s) => s.markAllUncompleted);
  return (
    <Card variant="secondary" className={className}>
      <Card.Header>
        <Card.Title className="text-xl">Quick Actions</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-row justify-between gap-4">
        <QuickActionButton onPress={markAllCompleted} label="Check All">
         <ListCheck/>
        </QuickActionButton>
        <QuickActionButton onPress={markAllUncompleted} label="Uncheck All">
          <ListX />
        </QuickActionButton>
        <QuickActionButton label="Download as a PDF">
          <FileDown className="size-4" />
        </QuickActionButton>
        <Modal>
          <QuickActionButton label="Delete All">
            <Trash />
          </QuickActionButton>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-90">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-accent-soft">
                    <Trash className="size-5 text-accent" strokeWidth={3} />
                  </Modal.Icon>
                  <Modal.Heading>Delete All Todos</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>This action can&apos;t be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button slot="close" onPress={deleteAll}>
                    <Trash className="size-4" /> Clear All
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </Card.Content>
    </Card>
  );
}
