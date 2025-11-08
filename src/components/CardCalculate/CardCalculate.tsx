import { Moon, Sun } from "lucide-react";
import type { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from "react";
import CardLayout from "@/components/CardLayout/CardLayout";

interface CardCalculateProps {
  mode: "wake" | "sleep";
  setMode: Dispatch<SetStateAction<"wake" | "sleep">>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>
  calculateSchedule: () => void
}

const CardCalculate: FunctionComponent<CardCalculateProps> = ({
  mode,
  setMode,
  time,
  setTime,
  calculateSchedule
}) => {

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTime(value)
  }

  const isTimeValid = time.length > 0;

  return (
    <CardLayout>
      <>
        <h2 className="text-2xl font-bold text-white text-center">
          Calculadora de Sueño
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <div
            onClick={() => setMode("wake")}
            className={`flex justify-center gap-1 px-4 py-2 rounded-xl ${
              mode === "wake" ? "bg-yellow-400 text-white" : "bg-white/10 text-white/30"
            } cursor-pointer transition-all hover:scale-105`}
          >
            <Sun color={ mode === "wake" ? "white" : "#6f757f"} />
            <p className="font-medium">Quiero despertar a las</p>
          </div>

          <div
            onClick={() => setMode("sleep")}
            className={`flex justify-center gap-1 px-4 py-2 rounded-xl ${
              mode === "sleep" ? "bg-[#6366f1] text-white" : "bg-white/10 text-white/30"
            } cursor-pointer transition-all hover:scale-105`}
          >
            <Moon color={ mode === "sleep" ? "white" : "#6f757f"} />
            <p className="font-medium">Me voy a dormir a las</p>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <div>
            <input onChange={handleChangeTime} value={time} className="bg-white/80 rounded-xl px-4 py-2" type="time" />
          </div>
          <div onClick={calculateSchedule} className={`flex justify-center gap-1 px-4 py-2 rounded-xl ${!isTimeValid ? 'bg-indigo-700/20 pointer-events-none' : 'bg-indigo-700 cursor-pointer'}`}>
            <p className="font-medium text-white">Calcular</p>
          </div>
        </div>
      </>
    </CardLayout>
  );
};

export default CardCalculate;
