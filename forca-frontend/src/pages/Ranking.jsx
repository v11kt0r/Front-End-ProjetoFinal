import { Link } from 'react-router-dom';

export default function Ranking() {
  const rankingData = [
    { name: 'Jogador1', score: 10 },
    { name: 'Jogador2', score: 8 },
    { name: 'Jogador3', score: 5 },
  ];

  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {rankingData.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score} pontos
          </li>
        ))}
      </ul>
      <Link to="/">Voltar para o Início</Link>
    </div>
  );
}
