"use client";

import { motion } from "framer-motion";
import { GameState, Ending } from "../lib/types";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const OPERATION_CODES = [
  "OP-PANDORA-BOX",
  "NIGHT-WATCH-73",
  "CODE-RED-FRIDAY",
  "PROJECT-ICARUS",
  "LAST-STAND-OS",
  "APOLLO-DESCENT",
  "MIDNIGHT-EXPRESS",
  "SILENT-SCREAM",
  "DOOMSDAY-PROTOCOL",
  "FRIDAY-SURVIVAL"
];

interface ResultScreenProps {
  ending: Ending | null;
  state: GameState;
  onRestart: () => void;
}

export default function ResultScreen({ ending, state, onRestart }: ResultScreenProps) {
  if (!ending) return null;

  const cardRef = useRef<HTMLDivElement>(null);
  const [opCode, setOpCode] = useState<string>("FRIDAY-RELEASE");

  useEffect(() => {
    setOpCode(OPERATION_CODES[Math.floor(Math.random() * OPERATION_CODES.length)]);
  }, []);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: "#0f1623",
          scale: 2,
          useCORS: true,
        });
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `panic-room-${opCode}.png`;
        a.click();
      } catch (err) {
        console.error("Failed to generate image", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 flex flex-col items-center justify-center p-4 md:p-12 font-sans selection:bg-amber-500/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl flex flex-col items-center gap-12"
      >
        {/* Share Card */}
        <div 
          ref={cardRef}
          className="w-full max-w-md bg-[#0f1623] border border-slate-800/80 p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="flex justify-between items-end border-b border-slate-800/50 pb-6 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">行动代号</span>
              <span className="text-sm font-medium text-slate-300">{opCode}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">状态</span>
              <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded-sm uppercase">
                已终止
              </span>
            </div>
          </div>

          {ending.imageUrl && (
            <div className="mb-6 rounded-md overflow-hidden border border-slate-800/50 bg-[#0a0f18]">
              <img 
                src={ending.imageUrl} 
                alt={ending.title} 
                crossOrigin="anonymous" 
                className="w-full h-auto object-cover opacity-90 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-[10px] md:text-xs font-mono text-amber-500 uppercase tracking-[0.3em] mb-2">
              最终结局
            </h1>
            <h2 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">
              {ending.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {ending.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8">
            <Stat label="发布信心" value={state.releaseConfidence} color="text-emerald-500" />
            <Stat label="风险值" value={state.riskLevel} color="text-red-500" />
            <Stat label="团队信任" value={state.teamTrust} color="text-blue-500" />
            <Stat label="用户影响" value={state.userImpact} color="text-purple-500" />
            <Stat label="混乱值" value={state.chaosMeter} color="text-amber-500" />
          </div>
          
          <div className="border-t border-slate-800/50 pt-6 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-mono">周五上线修罗场</span>
            <span className="text-[10px] text-slate-600 font-mono uppercase">Top Secret</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium tracking-wide transition-colors duration-300"
          >
            再来一局
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex-1 px-6 py-4 bg-amber-500 hover:bg-amber-400 text-[#0a0f18] font-medium tracking-wide transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            下载结果卡
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const Stat = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{label}</span>
    <span className={`text-2xl font-mono ${color}`}>{value}%</span>
  </div>
);
