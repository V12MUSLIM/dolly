import { useTodos } from "@/store/TodosStore";
import { Button, ErrorMessage, Input, Label, Modal } from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";
import { colors } from "@/app/constants/colors";
export default function ProjectModal() {
  const [projectName, setProjectName] = React.useState("");
  const [color, setColor] = React.useState(colors[0]);
  const isProjectModalOpen = useTodos((s) => s.isProjectModalOpen);
  const setProjectModalOpen = useTodos((s) => s.setProjectModalOpen);
  const setProjects = useTodos((s) => s.setProjects);
  return (
    <Modal isOpen={isProjectModalOpen} onOpenChange={setProjectModalOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon>
                <Plus className="size-7 text-accent bg-accent-soft p-1 rounded-full " />
              </Modal.Icon>
              <Modal.Heading>Add a new project</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-4">
              <div>
                <Input
                  fullWidth
                  placeholder="Project Name"
                  variant="secondary"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />
                {projectName.length >= 50 && (
                  <ErrorMessage>Max project name is 50</ErrorMessage>
                )}
              </div>
              <div className="grid grid-cols-5 gap-y-5 place-items-center">
                <Label className="col-span-5 place-self-start">
                  Choose color
                </Label>

                {colors.map((buttonColor) => {
                  const isSelected = color === buttonColor;

                  return (
                    <Button
                      key={buttonColor}
                      isIconOnly
                      aria-label={`Choose ${buttonColor}`}
                      aria-pressed={isSelected}
                      onPress={() => {
                        setColor(buttonColor);
                      }}
                      className={`
          size-5 min-w-0 rounded-full p-0
          ${buttonColor}
          ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900" : ""}
        `}
                    />
                  );
                })}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                slot={projectName.trim() ? "close" : ""}
                onPress={() => {
                  if (projectName.trim() === "") return;
                  setProjects({
                    id: crypto.getRandomValues(new Uint8Array(5))?.toString(),
                    name: projectName,
                    slug: projectName.trim().replace(/\s+/g, "-").toLowerCase(),
                    color: color,
                  });
                  setProjectName("");
                  setColor(colors[0]);
                }}
                isDisabled={projectName.length >= 50}
              >
                Add Project
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
