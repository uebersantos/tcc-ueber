import React, { useState } from 'react';
import './App.css';
import copyIcon from './copy.svg';
import shareIcon from './share.svg';
import helpIcon from './help.svg';


function App() {
  const [condicoes, setCondicoes] = useState('');
  const [acoes, setAcoes] = useState('');
  const [saida, setSaida] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHelpCondicoes, setShowHelpCondicoes] = useState(false);
  const [showHelpAcoes, setShowHelpAcoes] = useState(false);

  const handleGerarTabela = async () => {
    try {
      setIsLoading(true);
  
      // Função para converter texto em JSON
      const parseInputToJSON = (input) => {
        const lines = input.split(';').map((line) => line.trim()).filter(Boolean);
        const json = {};
        lines.forEach((line) => {
          const [key, value] = line.split(':').map((part) => part.trim());
          if (key && value) {
            json[key] = value;
          }
        });
        return json;
      };
  
      // Converter o texto das condições e ações para JSON
      const parsedCondicoes = parseInputToJSON(condicoes);
      const parsedAcoes = parseInputToJSON(acoes);
  
      // Fazer a requisição para o back-end
        const response = await fetch('http://localhost:3030/gerar-tabela', {
        //const response = await fetch('http://ec2-13-51-177-137.eu-north-1.compute.amazonaws.com:3030/gerar-tabela', {
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
      setSaida(data.obj.table);
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      setSaida('Erro: Verifique o formato dos dados ou a API.');
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !condicoes.trim() || !acoes.trim();

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
            <label>
              Condições:
              <span
                className="help-icon"
                onMouseEnter={() => setShowHelpCondicoes(true)}
                onMouseLeave={() => setShowHelpCondicoes(false)}
              >
              <img 
                src={helpIcon} 
                alt="Ajuda" 
                style={{ width: '20px', cursor: 'pointer', verticalAlign: 'middle' }} 
              />
              </span>
              {showHelpCondicoes && (
                <div className="tooltip">
                  Insira as condições, uma por linha, utilizando dois pontos (:) para descrever cada uma. Separe múltiplas condições com ponto e vírgula (;).
                  <br />
                  <br />
                  Garanta que as condições sejam claras e específicas para evitar erros de interpretação, e garatir maior precisão da geração da tabela de decisão.
                </div>
              )}
            </label>
            <textarea
              value={condicoes}
              onChange={(e) => setCondicoes(e.target.value)}
              placeholder={`Digite as condições...\n\nExemplo:\nLogin válido: O login inserido deve corresponder a um usuário cadastrado e ativo no sistema;\nSenha válida: A senha inserida deve corresponder à do usuário cadastrado e ativo no sistema;\nBotão Logar clicado: O botão 'Logar' deve ser pressionado;`}
            />
          </div>
          <div className="campo">
            <label >
              Ações:
              <span
                className="help-icon"
                onMouseEnter={() => setShowHelpAcoes(true)}
                onMouseLeave={() => setShowHelpAcoes(false)}
              >
              <img 
                src={helpIcon} 
                alt="Ajuda" 
                style={{ width: '20px', cursor: 'pointer', verticalAlign: 'middle'}} 
              />
              </span>
              {showHelpAcoes && (
                <div className="tooltip">
                  Insira as ações, uma por linha, utilizando dois pontos (:) para descrever cada uma. Separe múltiplas ações com ponto e vírgula (;).
                  <br />
                  <br />
                  Certifique-se de que cada ação esteja detalhada e condizente com as condições inseridas para maior precisão na geração da tabela de decisão.<br />
                </div>
              )}
            </label>
            <textarea
              value={acoes}
              onChange={(e) => setAcoes(e.target.value)}
              placeholder={`Digite as ações...\n\nExemplo:\nMostrar Login/Senha inválido: Exibir uma mensagem de erro indicando que o login ou a senha estão incorretos;\nLogar usuário: Redirecionar o usuário para a área autenticada do sistema;`}
            />
          </div>
          <button onClick={handleGerarTabela} disabled={isButtonDisabled}>
          Gerar Tabela
        </button>
        </div>
        <div className="saidas">
          <h2>Saídas</h2>
          <div className="output">
            {saida ? (
              <pre style={{ fontFamily: 'monospace', textAlign: 'left' }}>
                {saida}
              </pre>
            ) : (
              <p style={{ textAlign: 'center' }}>Aguardando resultado...</p>
            )}
          </div>
           <button
            className="share-icon"
            onClick={() => navigator.clipboard.writeText(saida)}
           >
        <img 
          src={copyIcon} 
          alt="Ícone de Copiar" 
          style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
         />
          Copiar Conteúdo
          </button>
          <a
  href={`https://wa.me/?text=${encodeURIComponent(saida)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="share-icon"
  style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
>
  <img 
    src={shareIcon} 
    alt="Ícone de Compartilhar" 
    style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }} 
  />
  Compartilhar no WhatsApp
</a>
      
        </div>
      </div>
    </div>
  );
}

export default App;