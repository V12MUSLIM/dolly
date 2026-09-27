"use client";

import { useTodos } from "@/store/TodosStore";
import { Button, Drawer, Separator } from "@heroui/react";
import {
  Inbox,
  CalendarDays,
  ListTodo,
  CheckCircle2,
  Plus,
  Settings,
  Folder,
  ChevronLeft,
  Trash2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EmptyState from "./emptyState";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { iconColors } from "../constants/colors";
export default function MobileNavigation() {
  const pathname = usePathname();
  const projects = useTodos((s) => s.projects);
  const setProjectModalOpen = useTodos((s) => s.setProjectModalOpen);
  const isProjectModalOpen = useTodos((s) => s.isProjectModalOpen);
  const navigation = [
    { label: "Inbox", href: "/", Icon: Inbox },
    { label: "Today", href: "/today-todos", Icon: CalendarDays },
    { label: "Upcoming", href: "/upcoming", Icon: ListTodo },
    { label: "Completed", href: "/completed", Icon: CheckCircle2 },
    { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
    { label: "Settings", href: "/settings", Icon: Settings },
  ];
  const deleteProject = useTodos((s) => s.deleteProject);
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"main" | "project">(
    "main",
  );
  console.log(isProjectModalOpen);
  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Drawer
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);

          if (!open) {
            setCurrentScreen("main");
          }
        }}
      >
        <Drawer.Trigger
          aria-label="Open menu"
          className="h-6 border bg-accent/5 backdrop-blur-2xl  flex items-center border-accent/20 w-48 rounded-(--radius) px-3 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="block h-1.5 w-full rounded-full bg-accent/80 transition-colors hover:bg-accent/50" />
        </Drawer.Trigger>

        <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm">
          {currentScreen === "main" ? (
            <Drawer.Content placement="bottom">
              <Drawer.Dialog className="rounded-t-base bg-background/80 backdrop-blur-2xl border-t border-white/10 shadow-2xl m-0">
                <Drawer.CloseTrigger />

                <Drawer.Header className="flex flex-col items-center pt-4 pb-2 border-b-0">
                  <div className="w-12 h-1.5 bg-foreground/20 rounded-full mb-4" />
                  <Drawer.Heading className="text-xl font-bold tracking-tight">
                    Menu
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="pb-10 px-6">
                  <div className="flex flex-col gap-2">
                    <Link href="/add-todo" className="w-full">
                      <Button
                        fullWidth
                        variant="primary"
                        className="justify-start gap-3 mb-4 h-14 rounded-2xl text-base font-semibold shadow-md"
                      >
                        <Plus className="size-5" />
                        <span>Add new task</span>
                      </Button>
                    </Link>

                    <div className="flex flex-col gap-1">
                      {navigation.map(({ label, href, Icon }) => {
                        const active = pathname === href;
                        return (
                          <Link key={href} href={href} className="w-full">
                            <Button
                              fullWidth
                              variant={active ? "secondary" : "ghost"}
                              className="justify-start gap-4 h-14 rounded-2xl text-base transition-all"
                            >
                              <Icon
                                className={`size-6 ${
                                  active ? "text-primary" : "text-muted"
                                }`}
                              />
                              <span className={active ? "font-semibold" : ""}>
                                {label}
                              </span>
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                    <Separator />

                    <Button
                      fullWidth
                      variant="ghost"
                      className="justify-start gap-4 h-14 rounded-2xl text-base transition-all"
                      onClick={() => setCurrentScreen("project")}
                    >
                      <Folder className={`size-6 text-muted`} />
                      <span className={"font-semibold"}>Projects</span>
                    </Button>
                  </div>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          ) : (
            <Drawer.Content placement="bottom">
              <Drawer.Dialog className="rounded-t-base bg-background/80 backdrop-blur-2xl border-t border-white/10 shadow-2xl m-0">
                <Button
                  isIconOnly
                  variant="secondary"
                  onPress={() => setCurrentScreen("main")}
                  aria-label="Back to menu"
                >
                  <ChevronLeft className="size-5" />
                </Button>

                <Drawer.Header className="flex flex-col items-center pt-4 pb-2 border-b-0 relative">
                  <div className="w-12 h-1.5 bg-foreground/20 rounded-full mb-4" />
                  <div className="flex items-center justify-center w-full relative">
                    <Drawer.Heading className="text-xl font-bold tracking-tight">
                      Projects
                    </Drawer.Heading>
                  </div>
                </Drawer.Header>

                <Drawer.Body className="pb-10 px-6 space-y-4 ">
                  {projects.length > 0 ? (
                    <AnimatePresence mode="wait">
                      {projects.length > 0 && (
                        <motion.div
                          key="projects"
                          initial={{ x: 8, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -8, opacity: 0 }}
                          className="flex flex-col gap-1"
                        >
                          <AnimatePresence>
                            {projects.map((project) => {
                              const isActive =
                                pathname === `/projects/${project.name}`;

                              return (
                                <motion.div
                                  key={project.id}
                                  layout
                                  initial={{ x: 8, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  exit={{ x: -8, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex items-center gap-4"
                                >
                                  <Link
                                    href={`/projects/${project.name}`}
                                    className="w-full"
                                  >
                                    <Button
                                      fullWidth
                                      variant={isActive ? "secondary" : "ghost"}
                                      className="justify-start gap-4 h-14 rounded-2xl text-base transition-all"
                                    >
                                      <Folder
                                        className={`size-6
                                        
                                        ${isActive ? "text-primary" : iconColors[project.color]}
                                       
                                        `}
                                      />

                                      <span
                                        className={
                                          isActive ? "font-semibold" : ""
                                        }
                                      >
                                        {project.name}
                                      </span>
                                    </Button>
                                  </Link>

                                  <Button
                                    isIconOnly
                                    onPress={() => deleteProject(project.id)}
                                    className={"shrink-0"}
                                    aria-label={`delete ${project.name}`}
                                    variant="secondary"
                                  >
                                    <Trash2 />
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ) : (
                    <EmptyState
                      state="fullEmpty"
                      style="section"
                      title="No projects yet"
                      message="Create your first project to get started."
                      variant="transparent"
                      isProject
                    />
                  )}

                  <Button
                    fullWidth
                    variant="primary"
                    className=" justify-start gap-3 mb-4 h-14 rounded-2xl text-base font-semibold shadow-md"
                    onPress={() => setProjectModalOpen(!isProjectModalOpen)}
                  >
                    <Plus className="size-5" />
                    <span className="capitalize">add new project</span>
                  </Button>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          )}
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}
