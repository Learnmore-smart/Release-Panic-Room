"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-[#0f1623]/80 backdrop-blur-sm border border-slate-800/80 rounded-md p-1 flex gap-1 shadow-lg">
        <button
          onClick={() => setLanguage("zh")}
          className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${
            language === "zh"
              ? "bg-amber-500 text-[#0a0f18] shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          中文
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${
            language === "en"
              ? "bg-amber-500 text-[#0a0f18] shadow-sm"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
