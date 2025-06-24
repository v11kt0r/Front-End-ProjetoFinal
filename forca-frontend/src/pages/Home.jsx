function Home() {
  return (
    <div className="home">
      <h1>Bem-vindo ao Jogo da Forca!</h1>
      <div className="home-links">
        <a href="/game">Iniciar Jogo</a>
      <a href="/ranking">Ver Ranking</a>
      <a href="/admin-palavras">Admin Palavras</a>
      </div>
      
    </div>
  );
}

export default Home;
