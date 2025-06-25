import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/ranking')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o ranking');
        }
        return response.json();
      })
      .then(data => {
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



  const exportRanking = () => {
    const dataStr = JSON.stringify(rankingData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'ranking.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importRanking = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        importedData.forEach(player => {
          fetch('http://localhost:3000/ranking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro ao adicionar jogador importado');
              }
            })
            .catch(error => console.error('Erro ao importar jogador:', error));
        });

        alert('Importação concluída com sucesso!');
      } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        alert('Formato de arquivo inválido.');
      }
    };

    reader.readAsText(file);
  };

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

      <div style={{ marginTop: '20px' }}>
        <button onClick={exportRanking}>Exportar Ranking (.json)</button>
        <br /><br />
        <input type="file" accept=".json" onChange={importRanking} />
      </div>

      <div style={{ marginTop: '30px' }}>
        <button onClick={() => window.history.back()}>Voltar</button>
      </div>
    </div>
  );
}
