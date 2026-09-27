"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card } from "@heroui/react"

const priorityData = [
  { priority: "P1", tasks: 8, color: "var(--danger)" },
  { priority: "P2", tasks: 14, color: "var(--warning)" },
  { priority: "P3", tasks: 21, color: "var(--accent)" },
  { priority: "P4", tasks: 11, color: "var(--success)" },
]

export default function PriorityChart() {
  return (
    <Card>
      <Card.Header>
        <div className="flex flex-col gap-1">
          <Card.Title>Tasks by Priority</Card.Title>

          <Card.Description>
            Distribution of your tasks by priority
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priorityData}
              layout="vertical"
              margin={{
                top: 8,
                right: 12,
                bottom: 8,
                left: 0,
              }}
            >
              <XAxis
                type="number"
                hide
              />

              <YAxis
                type="category"
                dataKey="priority"
                axisLine={false}
                tickLine={false}
                width={40}
                tick={{
                  fill: "var(--foreground)",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "var(--surface-secondary)",
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) {
                    return null
                  }

                  const data = payload[0]

                  return (
                    <div className="border border-default bg-overlay px-3 py-2 shadow-sm">
                      <p className="text-sm font-medium text-overlay-foreground">
                        {data.payload.priority}
                      </p>

                      <p className="text-xs text-muted">
                        {data.value} tasks
                      </p>
                    </div>
                  )
                }}
              />

              <Bar
                dataKey="tasks"
                radius={4}
                barSize={28}
                fill="var(--accent)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>

      <Card.Footer>
        <div className="text-sm text-muted">
          54 tasks across all priority levels
        </div>
      </Card.Footer>
    </Card>
  )
}