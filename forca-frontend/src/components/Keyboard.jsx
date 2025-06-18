export default function Keyboard({ guessedLetters, onLetterClick }) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div>
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
