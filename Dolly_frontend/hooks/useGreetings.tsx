"use client";

import { useEffect, useState } from "react";

const phrases = {
  morning: [
    "What's on today's plan?",
    "Ready to get things done?",
    "Start with something small.",
    "Make today count.",
    "What are you working on?",
    "Your day starts here.",
    "Today's priorities",
    "One task at a time.",
    "What's on the agenda?",
    "Let's make today productive.",
  ],

  afternoon: [
    "How's your day going?",
    "Keep the momentum going.",
    "What's next?",
    "Time to tackle the list.",
    "A few things to get done.",
    "Stay on top of things.",
    "What needs your attention?",
    "Keep making progress.",
    "Focus on what matters.",
    "Your next task awaits.",
  ],

  evening: [
    "Time to wrap things up.",
    "What still needs to get done?",
    "Finish strong.",
    "Make the most of what's left.",
    "What's left on your list?",
    "A little more progress?",
    "Bring today to a close.",
    "One last push.",
    "Review your day.",
    "End the day on a good note.",
  ],
};

export default function useGreetings() {
  const [randomGreetingPhrase, setRandomGreetingPhrase] = useState(
    phrases.morning[0],
  );
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const hours = new Date().getHours();
    const morning = hours < 12;
    const afternoon = hours < 17;

    if (morning) {
      setGreeting("Morning");
      setRandomGreetingPhrase(
        phrases.morning[Math.floor(Math.random() * phrases.morning.length)],
      );
    } else if (afternoon) {
      setGreeting("Afternoon");
      setRandomGreetingPhrase(
        phrases.afternoon[Math.floor(Math.random() * phrases.afternoon.length)],
      );
    } else {
      setGreeting("Evening");
      setRandomGreetingPhrase(
        phrases.evening[Math.floor(Math.random() * phrases.evening.length)],
      );
    }
  }, []);
  return {
    greeting: greeting,
    randomGreetingPhrase: randomGreetingPhrase,
  };
}
