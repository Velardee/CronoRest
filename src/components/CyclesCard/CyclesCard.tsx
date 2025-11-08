import type { FunctionComponent } from "react";
import CardLayout from "@/components/CardLayout/CardLayout";
import { Moon, Sun } from "lucide-react";
import { SLEEP_CYCLE_MINUTES } from "@/App";

interface CyclesCardProps {
  time?: string;
  cycles: string[];
  mode: "wake" | "sleep";
}

const CyclesCard: FunctionComponent<CyclesCardProps> = ({
  time,
  cycles,
  mode,
}) => {
  const CYCLES_TO_SHOW = 6;

  const getCycleHours = (index: number): string => {
    const cycles = CYCLES_TO_SHOW - index;
    const hours = (cycles * SLEEP_CYCLE_MINUTES) / 60;
    return `${hours.toFixed(1)}h (${cycles} ciclos)`;
  };

  return (
    <CardLayout>
      <>
        {mode === "wake" ? (
          <h3 className="text-xl text-[#E5EBE5]">
            Para despertar a las {time}, deberías dormir a las:
          </h3>
        ) : (
          <h3 className="text-xl text-[#E5EBE5]">
            Si te duermes a las {time}, deberías despertar a las:
          </h3>
        )}
        <div className="grid md:grid-cols-2 gap-6 md:gap-4">
          {cycles.map((cycle, index) => (
            <div
              key={index}
              className="w-full rounded-xl bg-white/30 flex flex-row justify-between items-center border border-white/50 px-4 py-4 gap-2 relative animate-fade-in"
            >
              {index < 2 && (
                <div className="absolute top-[-15px] right-4 bg-emerald-400 px-2 text-sm rounded-lg">
                  Recomendado
                </div>
              )}
              <div className="flex items-center gap-4">
                {mode === "wake" ? (
                  <Moon color="#6366f1" />
                ) : (
                  <Sun color="yellow" size={30} />
                )}
                <p className="text-2xl text-white font-medium">{cycle}</p>
              </div>
              <p className="text-sm text-blue-200">{getCycleHours(index)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/30 p-5 rounded-xl">
          <p className="text-[#E5EBE5] text-center">
            Se considera un tiempo promedio de 14 minutos para quedarse dormido
          </p>
        </div>
      </>
    </CardLayout>
  );
};

export default CyclesCard;
