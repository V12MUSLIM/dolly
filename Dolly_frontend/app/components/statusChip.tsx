import { Chip } from "@heroui/react";
import React from "react";
const variants = {
  danger: "bg-danger-soft text-danger-soft-foreground border border-danger/20",

  warning:
    "bg-warning-soft text-warning-soft-foreground border border-warning/20",

  success:
    "bg-success-soft text-success-soft-foreground border border-success/20",
  default: "bg-accent-soft text-accent-soft-foreground border border-accent/15",
};
export default function StatusChip({
  children,
  variant = "default",
  size,
}: {
  children: React.ReactNode;
  variant?: "danger" | "warning" | "success" | "default";
  size?: "lg" | "md" | "sm";
}) {
  return (
    <Chip  size={size} className={variants[variant]}>
      {children}
    </Chip>
  );
}
