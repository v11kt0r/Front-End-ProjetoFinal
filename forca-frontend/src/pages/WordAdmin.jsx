import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function WordAdmin() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingWord, setEditingWord] = useState(null);
  const [editedWord, setEditedWord] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const apiUrl = 'http://localhost:3000/words';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setWords(data))
      .catch(error => console.error('Erro ao buscar palavras:', error));
  }, []);

  const handleAddWord = () => {
    if (!newWord.trim() || !newDescription.trim()) return;

    const newEntry = { word: newWord, description: newDescription };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then(response => response.json())
      .then(data => {
        setWords([...words, data]);
        setNewWord('');
        setNewDescription('');
      })
      .catch(error => console.error('Erro ao adicionar palavra:', error));
  };

  const handleDeleteWord = (id) => {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => setWords(words.filter(word => word.id !== id)))
      .catch(error => console.error('Erro ao deletar palavra:', error));
  };

  const startEditing = (word) => {
    setEditingWord(word);
    setEditedWord(word.word);
    setEditedDescription(word.description);
  };

  const handleUpdateWord = () => {
    if (!editedWord.trim() || !editedDescription.trim()) return;

    fetch(`${apiUrl}/${editingWord.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: editedWord, description: editedDescription })
    })
      .then(response => response.json())
      .then(updated => {
        setWords(words.map(w => (w.id === updated.id ? updated : w)));
        setEditingWord(null);
      })
      .catch(error => console.error('Erro ao atualizar palavra:', error));
  };

  return (
    <div>
      <Header />
      <h1>📚 Administração de Palavras</h1>

      <div>
        <h2>Adicionar Nova Palavra</h2>
        <input
          type="text"
          placeholder="Palavra"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddWord}>Adicionar</button>
      </div>

      <hr />

      <div>
        <h2>Lista de Palavras</h2>
        {words.length === 0 ? (
          <p>Sem palavras cadastradas.</p>
        ) : (
          <ul>
            {words.map((wordItem) => (
              <li key={wordItem.id}>
                {editingWord && editingWord.id === wordItem.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedWord}
                      onChange={(e) => setEditedWord(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button onClick={handleUpdateWord}>Salvar</button>
                    <button onClick={() => setEditingWord(null)}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <strong>{wordItem.word}</strong> - {wordItem.description}
                    <button onClick={() => startEditing(wordItem)}>Editar</button>
                    <button onClick={() => handleDeleteWord(wordItem.id)}>Deletar</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <button onClick={() => window.history.back()}>Voltar</button>
      </div>
    </div>
  );
}
