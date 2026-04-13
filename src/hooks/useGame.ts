import { useState, useCallback, useEffect } from "react";
import { GameState, GameEvent, Choice, Ending } from "../lib/types";
import { initialGameState, gameEvents, determineEnding } from "../lib/gameData";

export function useGame() {
  const [state, setState] = useState<GameState>(initialGameState);
  const [eventIndex, setEventIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [currentRunEvents, setCurrentRunEvents] = useState<GameEvent[]>([]);

  // Initialize random 8-10 events when game starts
  useEffect(() => {
    startNewRun();
  }, []);

  const startNewRun = () => {
    // Shuffle the full event pool
    const shuffled = [...gameEvents].sort(() => 0.5 - Math.random());
    // Pick 8 to 10 random events for this run
    const numEvents = Math.floor(Math.random() * 3) + 8; // 8, 9, or 10
    setCurrentRunEvents(shuffled.slice(0, numEvents));
  };

  const currentEvent = !isGameOver && eventIndex < currentRunEvents.length ? currentRunEvents[eventIndex] : null;

  const handleChoice = useCallback((choice: Choice) => {
    const effect = choice.effect;
    
    // Calculate new state based on current state
    const newState = { ...state };

    if (effect.releaseConfidence !== undefined) {
      newState.releaseConfidence = Math.max(0, Math.min(100, state.releaseConfidence + effect.releaseConfidence));
    }
    if (effect.riskLevel !== undefined) {
      newState.riskLevel = Math.max(0, Math.min(100, state.riskLevel + effect.riskLevel));
    }
    if (effect.teamTrust !== undefined) {
      newState.teamTrust = Math.max(0, Math.min(100, state.teamTrust + effect.teamTrust));
    }
    if (effect.userImpact !== undefined) {
      newState.userImpact = Math.max(0, Math.min(100, state.userImpact + effect.userImpact));
    }
    if (effect.chaosMeter !== undefined) {
      newState.chaosMeter = Math.max(0, Math.min(100, state.chaosMeter + effect.chaosMeter));
    }

    const timeCost = effect.timeCost !== undefined ? effect.timeCost : Math.floor(Math.random() * 11) + 5;
    newState.currentTime = new Date(state.currentTime.getTime() + timeCost * 60000);

    setState(newState);

    const nextIndex = eventIndex + 1;
    if (nextIndex >= currentRunEvents.length) {
      const finalEnding = determineEnding(newState);
      setEnding(finalEnding);
      setIsGameOver(true);
    } else {
      setEventIndex(nextIndex);
    }
  }, [state, eventIndex, currentRunEvents]);

  const restartGame = useCallback(() => {
    setState(initialGameState);
    setEventIndex(0);
    setIsGameOver(false);
    setEnding(null);
    startNewRun();
  }, []);

  return {
    state,
    currentEvent,
    isGameOver,
    ending,
    handleChoice,
    restartGame
  };
}
