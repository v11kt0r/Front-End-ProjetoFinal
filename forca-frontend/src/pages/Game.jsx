import { useState } from 'react';
import Header from '../components/Header';
import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';

export default function Game() {
  const [word, setWord] = useState('REACT'); // Palavra a ser adivinhada (pode depois ser dinâmica)
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const maxErrors = 6;

  const wrongGuesses = guessedLetters.filter(letter => !word.includes(letter));

  const isWinner = word.split('').every(letter => guessedLetters.includes(letter));
  const isLoser = wrongGuesses.length >= maxErrors;

  const handleLetterClick = (letter) => {
    if (!guessedLetters.includes(letter) && !isWinner && !isLoser) {
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setPlayerName('');
    // Substitua aqui por uma palavra nova futuramente (ou carregue do backend)
    setWord('VITE'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const playerScore = maxErrors - wrongGuesses.length;

    const newEntry = {
      name: playerName,
      score: playerScore,
    };

    // Exemplo de POST pro backend (json-server ou outro API)
    fetch('http://localhost:5173/ranking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pontuação salva com sucesso:', data);
        restartGame();
      })
      .catch(error => console.error('Erro ao salvar:', error));
  };

  return (
    <div>
      <Header />

      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <p>Erros: {wrongGuesses.length} / {maxErrors}</p>

      <Keyboard
        onLetterClick={handleLetterClick}
        guessedLetters={guessedLetters}
      />

      {isWinner && (
        <div>
          <p>🎉 Parabéns! Você venceu!</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Digite seu nome para o ranking"
              required
            />
            <button type="submit">Salvar no Ranking</button>
          </form>
        </div>
      )}

      {isLoser && (
        <div>
          <p>😢 Você perdeu! A palavra era: {word}</p>
          <button onClick={restartGame}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
}
