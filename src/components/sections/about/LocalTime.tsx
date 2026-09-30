"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => null; // avoids a hydration mismatch

// Live clock for Medellín (UTC-5).
export default function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="font-mono tabular-nums">
      {time ?? "--:--"} <span className="text-[#52525b]">GMT-5</span>
    </span>
  );
}
