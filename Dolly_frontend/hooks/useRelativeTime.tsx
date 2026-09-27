import  { useEffect, useState } from "react";

export default function useRelativeTime(createdAt: string) {
  const [timeLabel, setTimeLabel] = useState<string | null>("");
  useEffect(() => {
    function CalcCreatedTime(createdAt: string) {
      if (!createdAt) return null;
      const now = Date.now();
      const created = new Date(createdAt);
      const timeDif = now - created.getTime();

      if (timeDif >= 86400000) {
        return {
          timeLabel: `${Math.floor(timeDif / 1000 / 60 / 60 / 24)}d ago`,
        };
      }

      if (timeDif >= 3600000) {
        return {
          timeLabel: `${Math.floor(timeDif / 1000 / 60 / 60)}h ago`,
        };
      }

      if (timeDif >= 60000) {
        return {
          timeLabel: `${Math.floor(timeDif / 1000 / 60)}m ago`,
        };
      }

      return { timeLabel: "Just now" };
    }
    const updateTime = () => {
      const result = CalcCreatedTime(createdAt);
      if (result) {
        const { timeLabel } = result;
        setTimeLabel(timeLabel ?? "");
      }
    };
    updateTime();
    const intervalId = setInterval(updateTime, 6000);
    return () => clearInterval(intervalId);
  }, [createdAt]);
  return{timeLabel}
}
