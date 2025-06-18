import { useState } from 'react';
import Header from '../components/Header';
import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';

export default function Game() {
  const [word, setWord] = useState('REACT'); // Palavra exemplo
  const [guessedLetters, setGuessedLetters] = useState([]);

  const handleLetterClick = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  return (
    <div>
      <Header />
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <Keyboard onLetterClick={handleLetterClick} guessedLetters={guessedLetters} />
    </div>
  );
}
