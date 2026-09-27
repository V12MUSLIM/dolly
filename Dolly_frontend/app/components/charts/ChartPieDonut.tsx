"use client";

import { CheckCircle2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@heroui/react";

const mockTodoData = [
  {
    status: "Completed",
    count: 42,
    color: "var(--success)",
  },
  {
    status: "In Progress",
    count: 18,
    color: "var(--accent)",
  },
  {
    status: "Pending",
    count: 23,
    color: "var(--warning)",
  },
  {
    status: "Overdue",
    count: 7,
    color: "var(--danger)",
  },
];

export default function TodoStatusChart() {
  const total = mockTodoData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="h-full">
      <Card.Header>
        <div className="flex flex-col gap-1">
          <Card.Title>Todo Overview</Card.Title>

          <Card.Description>Your task distribution</Card.Description>
        </div>
      </Card.Header>

      <Card.Content>
        <div className="grid place-items-center-safe gap-8 sm:grid-cols-2">
          {/* Donut chart */}
          <div className="relative mx-auto size-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) {
                      return null;
                    }

                    const data = payload[0].payload;

                    return (
                      <div className="rounded-md border border-default bg-overlay px-3 py-2 shadow-sm">
                        <p className="text-sm font-medium capitalize text-overlay-foreground">
                          {data.status}
                        </p>

                        <p className="text-xs text-muted">{data.count} tasks</p>
                      </div>
                    );
                  }}
                />

                <Pie
                  data={mockTodoData}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={2}
                  stroke="var(--surface)"
                  strokeWidth={3}
                >
                  {mockTodoData.map((item) => (
                    <Cell key={item.status} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center content */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-foreground text-3xl font-semibold tracking-tight">
                {total}
              </span>

              <span className="text-muted text-xs">Total Tasks</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-4">
            {mockTodoData.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="size-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-foreground text-sm">{item.status}</span>
                </div>

                <span className="text-muted text-sm font-medium">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
