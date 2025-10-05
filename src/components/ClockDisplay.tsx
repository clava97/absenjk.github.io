import { useEffect, useState } from 'react';
import { getClockDisplay } from '@/lib/datetime';
import { Clock } from 'lucide-react';

export const ClockDisplay = () => {
  const [time, setTime] = useState(getClockDisplay());

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setTime(getClockDisplay());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center gap-2 text-sm font-mono text-muted-foreground"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span className="tabular-nums">{time}</span>
    </div>
  );
};
