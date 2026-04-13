"use client";

import { motion } from "framer-motion";
import { GameState, GameEvent, Choice } from "../lib/types";

interface GameScreenProps {
  state: GameState;
  currentEvent: GameEvent | null;
  onChoice: (choice: Choice) => void;
}

const ProgressBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between text-[10px] md:text-xs font-mono uppercase tracking-wider text-slate-500">
        <span>{label}</span>
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-900 rounded-none overflow-hidden border border-slate-800/50">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function GameScreen({ state, currentEvent, onChoice }: GameScreenProps) {
  if (!currentEvent) return null;

  // Format time (e.g., 17:42)
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 flex flex-col p-4 md:p-12 font-sans selection:bg-amber-500/30">
      {/* Top Dashboard */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-6 md:gap-12 mb-16"
      >
        <div className="flex flex-col justify-center border-b border-slate-800/50 pb-4 md:border-b-0 md:pb-0 md:border-r md:pr-12 md:min-w-[120px]">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">当前时间</span>
          <span className="text-4xl font-mono text-amber-500 tracking-tight">
            {formatTime(state.currentTime)}
          </span>
        </div>
        
        <div className="flex-grow grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 items-center">
          <ProgressBar label="发布信心" value={state.releaseConfidence} color="bg-emerald-500" />
          <ProgressBar label="风险值" value={state.riskLevel} color="bg-red-500" />
          <ProgressBar label="团队信任" value={state.teamTrust} color="bg-blue-500" />
          <ProgressBar label="用户影响" value={state.userImpact} color="bg-purple-500" />
          <ProgressBar label="混乱值" value={state.chaosMeter} color="bg-amber-500" />
        </div>
      </motion.header>

      {/* Event Card Area */}
      <main className="max-w-2xl w-full mx-auto flex-grow flex flex-col justify-center relative pb-20">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10"
        >
          <div className="border-l-[3px] border-amber-500/80 pl-6 md:pl-8 py-2">
            <h2 className="text-2xl md:text-3xl font-medium text-slate-100 mb-6 tracking-tight leading-snug">
              {currentEvent.title}
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
              {currentEvent.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {currentEvent.choices.map((choice, index) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                onClick={() => onChoice(choice)}
                className="group relative w-full text-left p-6 border border-slate-800/60 bg-[#0f1623] hover:bg-[#151e2f] hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-left" />
                <span className="relative z-10 text-slate-300 group-hover:text-slate-100 transition-colors text-base md:text-lg">
                  {choice.text}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
