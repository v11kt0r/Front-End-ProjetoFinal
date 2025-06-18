import { useEffect, useState } from 'react';
import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';
import Header from '../components/Header';

export default function Game() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameStatus, setGameStatus] = useState('waiting'); // 'waiting' | 'playing' | 'won' | 'lost'
  const [playerName, setPlayerName] = useState('');

  // Função para escolher uma palavra aleatória (pode depois fazer vir do backend se quiser)
  const words = ['react', 'javascript', 'frontend', 'developer', 'programming'];

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setRemainingAttempts(6);
    setGameStatus('playing');
  };

  const handleLetterClick = (letter) => {
    if (gameStatus !== 'playing') return;

    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);

      if (!word.includes(letter)) {
        setRemainingAttempts((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const isWinner = word.split('').every((letter) => guessedLetters.includes(letter));
    const isLoser = remainingAttempts <= 0;

    if (isWinner) {
      setGameStatus('won');
      saveScore(guessedLetters.length);  // Pode ajustar a lógica de score como quiser
    } else if (isLoser) {
      setGameStatus('lost');
      saveScore(guessedLetters.length);
    }
  }, [guessedLetters, remainingAttempts, word, gameStatus]);

  const saveScore = (score) => {
    if (!playerName.trim()) return; // Só salva se o jogador digitou o nome

    fetch('http://localhost:3000/ranking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playerName,
        score: score
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao salvar o score');
        }
        console.log('Score salvo com sucesso!');
      })
      .catch(error => console.error('Erro ao salvar no ranking:', error));
  };

  const resetGame = () => {
    setPlayerName('');
    setGameStatus('waiting');
  };

  return (
    <div>
      <Header />

      {gameStatus === 'waiting' && (
        <div>
          <h2>Bem-vindo ao Jogo da Forca!</h2>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={startGame} disabled={!playerName.trim()}>
            Iniciar Jogo
          </button>
        </div>
      )}

      {gameStatus === 'playing' && (
        <div>
          <WordDisplay word={word} guessedLetters={guessedLetters} />
          <Keyboard guessedLetters={guessedLetters} handleLetterClick={handleLetterClick} />
          <p>Tentativas restantes: {remainingAttempts}</p>
        </div>
      )}

      {gameStatus === 'won' && (
        <div>
          <h2>🎉 Parabéns, você venceu!</h2>
          <p>A palavra era: {word}</p>
          <button onClick={resetGame}>Jogar novamente</button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div>
          <h2>❌ Você perdeu!</h2>
          <p>A palavra era: {word}</p>
          <button onClick={resetGame}>Tentar novamente</button>
        </div>
      )}
    </div>
  );
}
