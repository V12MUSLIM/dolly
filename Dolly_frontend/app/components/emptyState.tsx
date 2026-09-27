import { Button, Surface } from "@heroui/react";
import { ClipboardList, Ghost, Plus, FolderOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  message?: string;
  style: "page" | "section";
  state: "fullEmpty" | "partialEmpty";
  title?: string;
  actionHref?: string;
  actionLabel?: string;
  variant?: "transparent" | "default" | "secondary" | "tertiary";
  isProject?: boolean;
  isButton?: boolean;
}

export default function EmptyState({
  message,
  style,
  state,
  title,
  actionHref = "/add-todo",
  actionLabel = "Add a todo",
  variant = "default",
  isProject,
  isButton,
  
}: EmptyStateProps) {
  const isPage = style === "page";
  const isFullEmpty = state === "fullEmpty";

  const defaultContent = isFullEmpty
    ? isPage
      ? {
          title: "Your day is a blank canvas",
          message:
            "Give future-you a tiny win. Add one task and let the momentum do the rest.",
        }
      : {
          title: "A fresh little corner",
          message:
            "Nothing has landed here yet—add a task whenever inspiration strikes.",
        }
    : isPage
      ? {
          title: "You cleared the runway",
          message:
            "No tasks are waiting in this view. Enjoy the breathing room or switch to another list.",
        }
      : {
          title: "Inbox zero energy",
          message: "This section is beautifully clear. Keep that streak going.",
        };

  const Icon =
    isFullEmpty && isProject ? FolderOpen : isFullEmpty ? Ghost : ClipboardList;

  return (
    <Surface
      className={[
        "flex w-full flex-col items-center justify-center text-center",
        "text-foreground shadow-sm ",
        isPage
          ? "min-h-[60vh] rounded-3xl px-6 py-12"
          : "rounded-2xl px-5 py-10",
      ].join(" ")}
      variant={variant}
    >
      <div
        className={[
          "mb-5 grid place-items-center rounded-full bg-accent-soft text-accent-soft-foreground",

          isPage ? "size-24" : "size-16",
        ].join(" ")}
      >
        <Icon aria-hidden="true" className={isPage ? "size-12" : "size-8"} />
      </div>

      <h2 className={isPage ? "text-2xl font-bold" : "text-lg font-semibold"}>
        {title ?? defaultContent.title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        {message ?? defaultContent.message}
      </p>

      {isFullEmpty && isButton && (
        <Link href={actionHref} className="mt-6">
          <Button>
            <Plus className="size-4" />
            {actionLabel === "Add a todo" ? "Add your first task" : actionLabel}
          </Button>
        </Link>
      )}
    </Surface>
  );
}
