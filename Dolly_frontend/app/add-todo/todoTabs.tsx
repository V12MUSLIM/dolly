import { Tabs } from "@heroui/react";
import AddTodo from "./addTodo";
import { motion } from "motion/react";
import SmartTodo from "./SmartTodo";

export default function TodoTabs() {
  return (
    <Tabs className="w-full max-w-3xl">
      <Tabs.ListContainer className="max-w-xl mx-auto ">
        <Tabs.List className="**:data-[slot=tabs-indicator]:bg-accent">
          <Tabs.Tab id="normal">
            Normal
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="chatbot">
            Chatbot
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="min-h-90"
      >
        <Tabs.Panel id="normal">
          <AddTodo filters subtask />
        </Tabs.Panel>
        <Tabs.Panel id="chatbot">
          <SmartTodo />
        </Tabs.Panel>
      </motion.div>
    </Tabs>
  );
}
