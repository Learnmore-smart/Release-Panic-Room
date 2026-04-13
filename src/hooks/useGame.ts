import { useState, useCallback } from "react";
import { GameState, GameEvent, Choice, Ending } from "../lib/types";
import { initialGameState, gameEvents, determineEnding } from "../lib/gameData";

export function useGame() {
  const [state, setState] = useState<GameState>(initialGameState);
  const [eventIndex, setEventIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [ending, setEnding] = useState<Ending | null>(null);

  const currentEvent = !isGameOver && eventIndex < gameEvents.length ? gameEvents[eventIndex] : null;

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
    if (nextIndex >= gameEvents.length) {
      const finalEnding = determineEnding(newState);
      setEnding(finalEnding);
      setIsGameOver(true);
    } else {
      setEventIndex(nextIndex);
    }
  }, [state, eventIndex]);

  const restartGame = useCallback(() => {
    setState(initialGameState);
    setEventIndex(0);
    setIsGameOver(false);
    setEnding(null);
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
