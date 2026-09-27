"use client";
import { Tabs } from "@heroui/react";
import { TodosStoreTypes, useTodos } from "@/store/TodosStore";
export default function Filters() {
  const filter = useTodos((s) => s.filter);
  const setFilter = useTodos((s) => s.setFilter);
  return (
    <Tabs
      selectedKey={filter}
      onSelectionChange={(key) => setFilter(key as TodosStoreTypes["filter"])}
      className="w-full max-w-xl  px-1"
    >
      <Tabs.ListContainer>
        <Tabs.List>
          <Tabs.Tab id="all">
            All <Tabs.Indicator className="bg-accent" />
          </Tabs.Tab>
          <Tabs.Tab id="completed">
            Completed <Tabs.Indicator className="bg-accent"/>
          </Tabs.Tab>
          <Tabs.Tab id="uncompleted">
            Uncompleted <Tabs.Indicator className="bg-accent"/>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
