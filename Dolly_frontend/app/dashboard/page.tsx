import { Card } from "@heroui/react";
import { ChartArea } from "lucide-react";
import TodoStatusChart from "../components/charts/ChartPieDonut";
import WeeklyProductivityChart from "../components/charts/WeeklyProductivityChart";
import PriorityChart from "../components/charts/PriorityChart";

export default function Dashboard() {
  return (
    <div className="px-4 py-2 h-screen overflow-y-auto">
      <Card
        className="bg-accent-soft/30 min-h-0 l w-full rounded-2xl"
        variant="secondary"
      >
        <Card.Header className="mb-2 mt-2 px-2 sm:mb-3 sm:mt-3 sm:px-3 space-y-4">
          <Card.Title className="text-2xl sm:text-3xl">Dashboard</Card.Title>
          <Card.Description className="flex flex-row text-sm gap-1">
            <ChartArea className="size-5 text-muted" />
            See and manage your stats.
          </Card.Description>
        </Card.Header>

        <Card.Content className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="w-full grid grid-cols-3  items-center">
              <Card.Header className="mb-2 mt-2 px-2 col-span-2 sm:mb-3 sm:mt-3 sm:px-3 space-y-4">
                <Card.Title>Todos (All)</Card.Title>
              </Card.Header>
              <Card.Content className="flex items-end text-xl">
                <div>2245</div>
              </Card.Content>
            </Card>

            <Card className="w-full grid grid-cols-3  items-center">
              <Card.Header className="mb-2 mt-2 px-2 col-span-2 sm:mb-3 sm:mt-3 sm:px-3 space-y-4">
                <Card.Title>Completed (All)</Card.Title>
              </Card.Header>
              <Card.Content className="flex items-end text-xl">
                <div>2200</div>
              </Card.Content>
            </Card>

            <Card className="w-full grid grid-cols-3  items-center">
              <Card.Header className="mb-2 mt-2 px-2 col-span-2 sm:mb-3 sm:mt-3 sm:px-3 space-y-4">
                <Card.Title>Missed (All)</Card.Title>
              </Card.Header>
              <Card.Content className="flex items-end text-xl">
                <div>45</div>
              </Card.Content>
            </Card>
          </div>

          {/* Charts section */}
          <div className="col-span-1 md:col-span-2">
            <TodoStatusChart />
          </div>
          <div className="col-span-1 md:col-span-2">
            <PriorityChart />
          </div>
          <div className="col-span-1 md:col-span-4">
            <WeeklyProductivityChart />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
