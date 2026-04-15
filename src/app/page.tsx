"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../hooks/useGame";
import GameScreen from "../components/GameScreen";
import ResultScreen from "../components/ResultScreen";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const { state, currentEvent, isGameOver, ending, handleChoice, restartGame } = useGame();
  const { t } = useLanguage();

  const handleStart = () => setHasStarted(true);
  const handleRestart = () => {
    setHasStarted(false);
    restartGame();
  };

  return (
    <AnimatePresence mode="wait">
      <LanguageToggle />
      {!hasStarted ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[#0a0f18] flex flex-col items-center justify-center p-4 selection:bg-amber-500/30 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,rgba(10,15,24,1)_100%)] pointer-events-none" />
          
          <div className="z-10 text-center flex flex-col items-center max-w-3xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tighter mb-6">
                {t("home.title")}
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 tracking-wide">
                {t("home.subtitle")}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={handleStart}
                className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#0a0f18] font-medium tracking-widest uppercase transition-colors duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold text-lg">{t("home.startBtn")}</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      ) : isGameOver ? (
        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultScreen ending={ending} state={state} onRestart={handleRestart} />
        </motion.div>
      ) : (
        <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <GameScreen state={state} currentEvent={currentEvent} onChoice={handleChoice} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
