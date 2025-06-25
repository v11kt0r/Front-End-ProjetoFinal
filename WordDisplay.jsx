export default function WordDisplay({ word, guessedLetters }) {
  return (
    <div>
      {word.split('').map((letter, index) => (
        <span key={index} style={{ margin: '0 5px', fontSize: '24px' }}>
          {guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ))}
    </div>
  );
}
