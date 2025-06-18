export default function Keyboard({ onLetterClick, guessedLetters }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div style={{ marginTop: '20px' }}>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
          style={{ margin: '5px' }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
