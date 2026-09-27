import { useEffect, useState } from "react";

export default function usePomodoro(createdAt: string) {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const duration = 25 * 60 * 1000;
    const endTime = duration + new Date(createdAt).getTime();
    const id = setInterval(() => {
      setTimer(Math.max(0, endTime - Date.now()));
    }, 1000);

    return () => clearInterval(id);
  }, [createdAt]);
  return {
    timer,
    minutes: Math.floor(timer / 1000 / 60)
      .toString()
      .padStart(2, "0"),
    seconds: Math.floor((timer / 1000) % 60)
      .toString()
      .padStart(2, "0"),
  };
}
