"use client";

import NeatBackground from "../components/neatBackground";
import useGreetings from "@/hooks/useGreetings";
import SmartTodo from "./SmartTodo";
import { Card } from "@heroui/react";
// Mock users data
const mockUsers = [
  {
    id: "U001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    currentOrders: [
      {
        id: "O001",
        product: "Wireless Earbuds",
        quantity: 2,
        total: 89.99,
        status: "shipped",
        createdAt: new Date("2024-04-15T10:30:00Z"),
        updatedAt: new Date("2024-04-15T11:45:00Z"),
      },
      {
        id: "O002",
        product: "Smart Watch",
        quantity: 1,
        total: 199.99,
        status: "pending",
        createdAt: new Date("2024-04-16T09:15:00Z"),
        updatedAt: new Date("2024-04-16T09:15:00Z"),
      },
    ],
  },
  {
    id: "U002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    currentOrders: [
      {
        id: "O003",
        product: "Bluetooth Speaker",
        quantity: 1,
        total: 79.99,
        status: "delivered",
        createdAt: new Date("2024-04-14T14:20:00Z"),
        updatedAt: new Date("2024-04-14T15:30:00Z"),
      },
    ],
  },
  {
    id: "U003",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 345-6789",
    currentOrders: [
      {
        id: "O004",
        product: "Laptop Stand",
        quantity: 3,
        total: 149.97,
        status: "pending",
        createdAt: new Date("2024-04-17T08:00:00Z"),
        updatedAt: new Date("2024-04-17T08:00:00Z"),
      },
    ],
  },
  {
    id: "U004",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1 (555) 456-7890",
    currentOrders: [
      {
        id: "O005",
        product: "USB-C Hub",
        quantity: 1,
        total: 45.0,
        status: "shipped",
        createdAt: new Date("2024-04-13T16:45:00Z"),
        updatedAt: new Date("2024-04-13T17:10:00Z"),
      },
      {
        id: "O006",
        product: "Mouse Pad",
        quantity: 2,
        total: 39.98,
        status: "pending",
        createdAt: new Date("2024-04-18T10:20:00Z"),
        updatedAt: new Date("2024-04-18T10:20:00Z"),
      },
    ],
  },
  {
    id: "U005",
    name: "Eva Brown",
    email: "eva.brown@example.com",
    phone: "+1 (555) 567-8901",
    currentOrders: [
      {
        id: "O007",
        product: "Gaming Mouse",
        quantity: 1,
        total: 129.99,
        status: "delivered",
        createdAt: new Date("2024-04-12T13:10:00Z"),
        updatedAt: new Date("2024-04-12T14:00:00Z"),
      },
    ],
  },
  {
    id: "U006",
    name: "Frank Lee",
    email: "frank.lee@example.com",
    phone: "+1 (555) 678-9012",
    currentOrders: [
      {
        id: "O008",
        product: "Phone Case",
        quantity: 5,
        total: 29.95,
        status: "pending",
        createdAt: new Date("2024-04-19T11:30:00Z"),
        updatedAt: new Date("2024-04-19T11:30:00Z"),
      },
    ],
  },
  {
    id: "U007",
    name: "Grace Wilson",
    email: "grace.wilson@example.com",
    phone: "+1 (555) 789-0123",
    currentOrders: [
      {
        id: "O009",
        product: "Headphones",
        quantity: 1,
        total: 159.99,
        status: "shipped",
        createdAt: new Date("2024-04-10T18:00:00Z"),
        updatedAt: new Date("2024-04-10T19:15:00Z"),
      },
    ],
  },
  {
    id: "U008",
    name: "Henry Taylor",
    email: "henry.taylor@example.com",
    phone: "+1 (555) 890-1234",
    currentOrders: [
      {
        id: "O010",
        product: "Keyboard",
        quantity: 1,
        total: 189.99,
        status: "pending",
        createdAt: new Date("2024-04-18T15:00:00Z"),
        updatedAt: new Date("2024-04-18T15:00:00Z"),
      },
    ],
  },
  {
    id: "U009",
    name: "Isla Morgan",
    email: "isla.morgan@example.com",
    phone: "+1 (555) 901-2345",
    currentOrders: [
      {
        id: "O011",
        product: "Monitor Stand",
        quantity: 2,
        total: 139.98,
        status: "delivered",
        createdAt: new Date("2024-04-09T12:30:00Z"),
        updatedAt: new Date("2024-04-09T13:20:00Z"),
      },
    ],
  },
  {
    id: "U010",
    name: "Jack Reed",
    email: "jack.reed@example.com",
    phone: "+1 (555) 012-3456",
    currentOrders: [
      {
        id: "O012",
        product: "Phone Charger",
        quantity: 4,
        total: 34.99,
        status: "shipped",
        createdAt: new Date("2024-04-16T14:00:00Z"),
        updatedAt: new Date("2024-04-16T14:30:00Z"),
      },
    ],
  },
];

export default function AddTodoPage() {
  const { greeting, randomGreetingPhrase } = useGreetings();

  return (
    <div className="relative grid  overflow-y-auto h-screen grid-rows-[1fr_auto] overflow-hidden px-2 py-4">
      <NeatBackground />

      <div className="relative z-10  flex flex-col items-center justify-center gap-2">
        <h1 className="text-center   rounded-full max-w-3xl py-2  text-2xl w-full sm:text-3xl font-semibold md:text-4xl leading-tight tracking-tight">
          {greeting}, {randomGreetingPhrase || ""}
        </h1>
        <SmartTodo />
      </div>
    </div>
  );
}
