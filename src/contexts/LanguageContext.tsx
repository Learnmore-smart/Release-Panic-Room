"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "zh" | "en";

interface Translations {
  [key: string]: string;
}

const enTranslations: Translations = {
  "home.title": "Friday Evening Release",
  "home.subtitle": "Experience the most authentic high-pressure release day simulation on a Friday evening.",
  "home.startBtn": "START GAME",
  "game.currentTime": "Current Time",
  "game.releaseConfidence": "Confidence",
  "game.riskLevel": "Risk",
  "game.teamTrust": "Team Trust",
  "game.userImpact": "User Impact",
  "game.chaosMeter": "Chaos",
  "result.generating": "Game Over, generating result...",
  "result.restart": "Restart Game",
  "result.opCode": "OP CODE",
  "result.status": "STATUS",
  "result.status.terminated": "TERMINATED",
  "result.finalEnding": "FINAL ENDING",
  "result.restartBtn": "Play Again",
  "result.downloadBtn": "Download Card",
  "result.topSecret": "Top Secret"
};

const zhTranslations: Translations = {
  "home.title": "周五上线修罗场",
  "home.subtitle": "在周五傍晚，体验最真实的发布日高压决策模拟。",
  "home.startBtn": "开始这一局",
  "game.currentTime": "当前时间",
  "game.releaseConfidence": "发布信心",
  "game.riskLevel": "风险值",
  "game.teamTrust": "团队信任",
  "game.userImpact": "用户影响",
  "game.chaosMeter": "混乱值",
  "result.generating": "游戏结束，正在生成结果...",
  "result.restart": "重新开始",
  "result.opCode": "行动代号",
  "result.status": "状态",
  "result.status.terminated": "已终止",
  "result.finalEnding": "最终结局",
  "result.restartBtn": "再来一局",
  "result.downloadBtn": "下载结果卡",
  "result.topSecret": "Top Secret"
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage first
    const savedLang = localStorage.getItem("app-language") as Language;
    if (savedLang && (savedLang === "zh" || savedLang === "en")) {
      setLanguageState(savedLang);
    } else {
      // Auto browser detection
      const browserLang = navigator.language;
      if (!browserLang.toLowerCase().startsWith("zh")) {
        setLanguageState("en");
      } else {
        setLanguageState("zh");
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: string): string => {
    const translations = language === "zh" ? zhTranslations : enTranslations;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
