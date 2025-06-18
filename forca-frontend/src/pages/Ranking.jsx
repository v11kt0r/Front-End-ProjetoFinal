import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5173/ranking') // Ajuste a URL se usar outro backend
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o ranking');
        }
        return response.json();
      })
      .then(data => {
        // Ordena o ranking do maior para o menor score
        const sortedData = data.sort((a, b) => b.score - a.score);
        setRankingData(sortedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar o ranking:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando ranking...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <Header />
      <h1>🏆 Ranking de Jogadores</h1>
      <ul>
        {rankingData.map((player, index) => (
          <li key={player.id}>
            {index + 1}. {player.name} - {player.score} pontos
          </li>
        ))}
      </ul>
    </div>
  );
}
