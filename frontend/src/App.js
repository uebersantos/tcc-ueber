import React, { useState } from 'react';
import './App.css';

function App() {
  const [condicoes, setCondicoes] = useState('');
  const [acoes, setAcoes] = useState('');
  const [saida, setSaida] = useState(''); // Para futuras saídas da API
  const [isLoading, setIsLoading] = useState(false);


  const handleGerarTabela = async () => {
    try {
      setIsLoading(true); // Mostra o loader
      const parsedCondicoes = JSON.parse(condicoes);
      const parsedAcoes = JSON.parse(acoes);
  
      const response = await fetch('http://localhost:3030/gerar-tabela', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: 'ueber',
          list: parsedCondicoes,
          actions: parsedAcoes,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro na API');
      }
  
      const data = await response.json();
      setSaida(data.obj.table); // Use apenas o campo relevante para a saída
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setSaida('Erro: Verifique o formato dos dados ou a API.');
    } finally {
      setIsLoading(false); // Oculta o loader
    }
  };
  
  

  return (
    <div className="container">
      <div className="header">
        <h1>Tabela.AI</h1>
      </div>
      <div className="content">
        {isLoading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
        <div className="entradas">
          <h2>Entradas</h2>
          <div className="campo">
            <label>Condições:</label>
            <textarea
              value={condicoes}
              onChange={(e) => setCondicoes(e.target.value)}
              placeholder="Digite as condições..."
            />
          </div>
          <div className="campo">
            <label>Ações:</label>
            <textarea
              value={acoes}
              onChange={(e) => setAcoes(e.target.value)}
              placeholder="Digite as ações..."
            />
          </div>
          <button onClick={handleGerarTabela}>Gerar Tabela</button>
        </div>
        <div className="saidas">
      <h2>Saídas</h2>
      <div className="output">
            {saida ? (
              <pre style={{ fontFamily: 'monospace', textAlign: 'left' }}>
                {saida}
              </pre>
            ) : (
              <p style={{textAlign: 'center'}}>Aguardando resultado...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
