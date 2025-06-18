import { useState } from 'react';

export function useGameLogic() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);

  function startGame(newWord) {
    setWord(newWord);
    setGuessedLetters([]);
  }

  function guessLetter(letter) {
    setGuessedLetters(prev => [...prev, letter]);
  }

  return {
    word,
    guessedLetters,
    startGame,
    guessLetter
  };
}
