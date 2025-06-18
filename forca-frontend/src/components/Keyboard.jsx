export default function Keyboard({ guessedLetters, handleLetterClick }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div style={{ marginTop: '20px' }}>
      {letters.map((letter) => (
        <button
          key={letter}
         onClick={() => handleLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
          style={{ margin: '5px' }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
