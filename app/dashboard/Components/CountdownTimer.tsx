"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  onExpire?: () => void;
  start?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  days,
  hours,
  minutes,
  onExpire,
  start = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days,
    hours,
    minutes,
    seconds: 0,
  });

  const [isRunning, setIsRunning] = useState(start);
  const [endTime, setEndTime] = useState<number | null>(null);

  // Lorsqu'on reçoit start ou la durée, on calcule endTime
  useEffect(() => {
    if (!start) {
      setIsRunning(false);
      setTimeLeft({ days, hours, minutes, seconds: 0 });
      setEndTime(null);
      return;
    }
    const now = Date.now();
    const durationMs =
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000;
    setEndTime(now + durationMs);
    setIsRunning(true);
  }, [start, days, hours, minutes]);

  // Timer
  useEffect(() => {
    if (!isRunning || !endTime) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsRunning(false);
        if (onExpire) onExpire();
        clearInterval(timer);
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, endTime, onExpire]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-lg border border-gray-100 min-w-[80px]">
      <div className="text-3xl font-bold text-gray-800 mb-1">{value.toString().padStart(2, "0")}</div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</div>
    </div>
  );

  if (!isRunning) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 text-center text-gray-700">
        Timer is not running.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
      <h2 className="text-center text-xl font-semibold mb-4 flex items-center justify-center gap-2">
        <Clock className="w-6 h-6 text-blue-600" /> Deal Ends In
      </h2>
      <div className="flex justify-center gap-4 flex-wrap">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default CountdownTimer;
