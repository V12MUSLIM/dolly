"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { Card } from "@heroui/react";

const mockProductivityData = [
  { day: "Mon", completed: 6 },
  { day: "Tue", completed: 9 },
  { day: "Wed", completed: 5 },
  { day: "Thu", completed: 11 },
  { day: "Fri", completed: 8 },
  { day: "Sat", completed: 4 },
  { day: "Sun", completed: 7 },
];

export default function WeeklyProductivityChart() {
  return (
    <Card>
      <Card.Header>
        <div className="flex flex-col gap-1">
          <Card.Title>Weekly Productivity</Card.Title>

          <Card.Description>
            Tasks completed over the last 7 days
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockProductivityData}
              margin={{
                top: 24,
                left: 20,
                right: 20,
                bottom: 4,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--separator)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                interval={0}
                stroke="var(--muted)"
                tick={{
                  fill: "var(--muted)",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "var(--separator)",
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) {
                    return null;
                  }

                  const data = payload[0];

                  return (
                    <div className="rounded-md border border-default bg-overlay px-3 py-2 shadow-sm">
                      <p className="text-sm font-medium text-overlay-foreground">
                        {data.payload.day}
                      </p>

                      <p className="text-xs text-muted">
                        {data.value} tasks completed
                      </p>
                    </div>
                  );
                }}
              />

              <Line
                type="natural"
                dataKey="completed"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "var(--accent)",
                  stroke: "var(--surface)",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "var(--accent)",
                  stroke: "var(--surface)",
                  strokeWidth: 2,
                }}
              >
                <LabelList
                  dataKey="completed"
                  position="top"
                  offset={10}
                  fill="var(--foreground)"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>

      <Card.Footer>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <TrendingUp className="size-4 text-success" />
            <span>12.5% more tasks completed</span>
          </div>

          <p className="text-muted">50 tasks completed this week</p>
        </div>
      </Card.Footer>
    </Card>
  );
}
