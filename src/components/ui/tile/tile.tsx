'use client'
import { TileLoader } from '@/components';
import React, { useState } from 'react'
import { tv } from 'tailwind-variants'
import { TILE_CORRECT_EMOJI } from '@/constants/daily/game-constants'; // please do not change, it avoids circular dependency

interface TileProps {
  className?: string;
  tileContent?: string;
  guessContent?: string;
  onClick?: () => Promise<void>;
  gameStatus?: string;
  incorrectGuess?: boolean;
}

const tile = tv({
  base: "flex items-center justify-center rounded-md sm:rounded-xl md:rounded-xl font-bold text-2xl md:text-4xl shadow-[inset_0_-4px_0_rgba(0,0,0,0.05)]",
  variants: {
    status: {
      "tile-empty": "bg-gray-200 text-white",
      "tile-loading": "bg-yellow-400 text-white",
      "tile-filled": "bg-yellow-400 text-white",
      "guess-empty": "bg-green-200 text-green-800",
      "guess-filled": "bg-green-600 text-white",
      "guess-loading": "animate-guessLoading text-white",
      "guess-incorrect": "bg-red-600 animate-shake text-white",
      "won": "bg-green-600 text-white"
    },
    gameComplete: {
      true: "cursor-not-allowed",
      false: "cursor-pointer"
    }
  },
  defaultVariants: {
    status: "tile-empty",
    gameComplete: false
  }
})

function Tile({ className, tileContent, guessContent, onClick, gameStatus, incorrectGuess }: TileProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTileStatus = () => {
    switch (gameStatus) {
      case "guess-loading":
        if (guessContent) return "guess-loading";
      case "won":
        if (guessContent) return "won";
      case "guessing":
        return guessContent ? "guess-filled" : "guess-empty";
      case "tile-loading":
        return isLoading ?  "tile-loading" : tileContent ? "tile-filled" : "tile-empty";
      default:
        if (incorrectGuess && guessContent) return "guess-incorrect";
        return (tileContent) ? "tile-filled" : "tile-empty";
    }
  };

  const handleTileClick = async (): Promise<void> => {
    setIsLoading(true);
    if(onClick) await onClick()
    setIsLoading(false);
  }

  const getTileContent = () => {
    if (gameStatus === "won" && guessContent) return TILE_CORRECT_EMOJI;
    if (gameStatus === "tile-loading") {
      return tileContent ? tileContent : isLoading ? <TileLoader /> : '';
    }
    if (["playing", "lost"].includes(gameStatus || "") && tileContent) return tileContent;
    if (["guessing", "guess-loading"].includes(gameStatus || "") && tileContent && tileContent !== 'X') return tileContent;
    return '';
  };

  const tileStatus = getTileStatus();

  const isGuessModeHint = ["guessing", "guess-loading"].includes(gameStatus || "") && tileContent && tileContent !== 'X';

  return (
    <div
      onClick={handleTileClick}
      className={tile({
        status: tileStatus,
        gameComplete: ["won", "lost"].includes(gameStatus || ""),
        className
      })}
    >
      <span className={isGuessModeHint ? "opacity-15" : ""}>
        {getTileContent()}
      </span>
    </div>
  )
}

export default Tile