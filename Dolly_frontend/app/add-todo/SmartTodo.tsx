import React from "react";
import { Button, Surface, Tabs, TextArea } from "@heroui/react";
import { Plus } from "lucide-react";
import AddTodo from "../components/addTodo";
export default function SmartTodo() {
  return (
    <Tabs className="w-full max-w-3xl">
      <Tabs.ListContainer className="max-w-xl mx-auto">
        <Tabs.List>
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
      <div className="min-h-90">
        <Tabs.Panel id="normal">
          <AddTodo filters />
        </Tabs.Panel>
        <Tabs.Panel id="chatbot">
          <Surface className="w-full px-2 relative rounded-3xl p-0.5 max-w-3xl overflow-visible bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
            {/* The Glow Aura (Blurred layer pushed behind the surface) */}
            <div className="w-full absolute inset-0 -z-10 rounded-3xl h-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-red-500 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] blur-xl opacity-70" />

            {/* The Inner Mask Content Card */}
            <div className="relative p-4 rounded-[22px] bg-white w-full h-full">
              <TextArea
                className="w-full min-h-28 min-w-70 resize-none"
                placeholder="Just type in your todo."
                variant="secondary"
              />
              <Button
                size="lg"
                isIconOnly
                className="absolute right-5 transform -translate-x-1/2 bottom-14 translate-y-1/2"
              >
                <Plus />
              </Button>
            </div>
          </Surface>
        </Tabs.Panel>
      </div>
    </Tabs>
  );
}
