import CardCalculate from "@/components/CardCalculate/CardCalculate";
import CyclesCard from "@/components/CyclesCard/CyclesCard";
import { useCallback, useEffect, useState } from "react";

export const SLEEP_CYCLE_MINUTES = 90;

function App() {
  const [mode, setMode] = useState<"wake" | "sleep">("wake");
  const [time, setTime] = useState("");
  const [cycles, setCycles] = useState<string[]>([]);

  const calculateSchedule = useCallback(() => {
    if (!time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    const times: string[] = [];

    if (mode === "wake") {
      for (let i = 1; i <= 6; i++) {
        const sleepTime = new Date(
          baseDate.getTime() - SLEEP_CYCLE_MINUTES * i * 60000
        );
        times.push(formatTime(sleepTime));
      }
      setCycles(times.reverse());
    } else {
      const adjustedTime = new Date(baseDate.getTime());
      for (let i = 1; i <= 6; i++) {
        const wakeTime = new Date(
          adjustedTime.getTime() + SLEEP_CYCLE_MINUTES * i * 60000
        );
        times.push(formatTime(wakeTime));
      }
      setCycles(times);
    }
  }, [time, mode]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    setCycles([]);
  }, [mode, time]);

  return (
    <div className="bg-linear-to-br from-blue-950 via-sky-900 to-blue-900 min-h-screen px-12 py-8 flex flex-col gap-8 items-center">
      <section className="flex flex-col gap-4 max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white">
          Optimiza tus ciclos de sueño
        </h1>
        <p className="text-xl text-[#E5EBE5]">
          Calcula la hora perfecta para acostarte o levantarte basándote en
          ciclos de sueño de 90 minutos. Despiértate renovado y con energía.
        </p>
      </section>
      <CardCalculate
        mode={mode}
        setMode={setMode}
        time={time}
        setTime={setTime}
        calculateSchedule={calculateSchedule}
      />
      {cycles.length > 0 ? (
        <CyclesCard cycles={cycles} time={time} mode={mode} />
      ) : (
        <p className="text-base text-[#E5EBE5]">
          La mayoría de adultos necesitan entre 5-6 ciclos (7.5-9 horas) de
          sueño por noche
        </p>
      )}
    </div>
  );
}

export default App;
