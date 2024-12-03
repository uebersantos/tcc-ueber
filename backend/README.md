# A4PM Severity Assessment
O backend do A4PM Severity Assessment é uma aplicação Node.js que fornece uma API para analisar sintomas e ordenanar do mais grave para o mais leve, além de armazenar resultados em um banco de dados Firestore.

## Instalação
Para instalar o plugin, utilize npm:
```bash
npm install
```
- Requisitos mínimos: NodeJS ^14

## Configuração
1 - Crie um arquivo .env na raiz do projeto.
Adicione as variáveis de ambiente necessárias no arquivo .env:
```sh
PORT=<porta do servidor>
```
- PORT: Porta na qual o servidor irá escutar. Se não for especificada, a porta padrão é 3333.

2 - Altere o arquivo firebaseConfig.json para as configurações do seu Firebase. OBS.: nâo alterar o nome do arquivo.

## ROTA
- POST /severity-assessment: A rota /severity-assessment é responsável por processar as transcrições de áudio e enviar essas informações para o serviço ChatGPT da OpenAI para análise.