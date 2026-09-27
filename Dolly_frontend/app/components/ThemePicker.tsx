"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { useTheme } from "next-themes";

const themes = [
  {
    id: "default",
    label: "default",
    color: "",
  },
  { id: "ocean", label: "Focus", color: "bg-sky-600" },
  { id: "violet", label: "Plan", color: "bg-violet-700" },
  { id: "emerald", label: "Fresh Start", color: "bg-emerald-600" },
  { id: "coral", label: "Priorities", color: "bg-[#e85d3f]" },
  { id: "rose", label: "Goals", color: "bg-rose-600" },
  {
    id: "calm",
    label: "Calm",
    color: "border-2 border-black bg-white",
  },

  {
    id: "midnight",
    label: "Night Shift",
    color: "bg-sky-900 border border-sky-400/80",
  },

  {
    id: "dark-violet",
    label: "Deep Work",
    color: "bg-violet-950 border border-violet-400/80",
  },
  {
    id: "forest",
    label: "Calm Focus",
    color: "bg-green-900 border border-lime-400/80",
  },
  {
    id: "dark-coral",
    label: "Deadline",
    color: "bg-[#431c1a] border border-orange-300/80",
  },
  {
    id: "dark-rose",
    label: "After Hours",
    color: "bg-rose-950 border border-rose-300/80",
  },

  { id: "mono", label: "Minimal", color: "bg-black border border-white/30" },
];
export function ThemePicker() {
  const { setTheme } = useTheme();

  return (
    <Select onChange={(key) => setTheme(String(key))}>
      <Label>Theme</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover >
        <ListBox aria-label="Choose theme" >
          {themes.map((item) => (
            <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
              <Label>{item.label}</Label>
              <ListBox.ItemIndicator>
                 <span className={`size-3 rounded-full ${item.color}`} />
              </ListBox.ItemIndicator>
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
