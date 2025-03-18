# Backend da Tabela.AI

## Descrição
Projeto backend para geração de tabelas de decisão utilizando OpenAI e Firebase.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão recomendada: `v22.14.0`)
- **npm** (versão recomendada: `v10.9.2`)
- **Conta no Firebase** (para armazenar chaves sensíveis)
- **Chave de API da OpenAI** (para comunicação com a IA)

## Instalação

Acesse o diretório do projeto:
   ```bash
   cd backend
   ```

Instale as dependências:
   ```bash
   npm install
   ```

Configure o Firebase e a API Key:
   - Crie um projeto no **Firebase**.


## Configuração do Firebase

O arquivo `firebaseConfig.json` deve ser estruturado da seguinte forma:

```json
{
  "type": "service_account",  
  "project_id": "SEU_PROJECT_ID",  
  "private_key_id": "SEU_PRIVATE_KEY_ID", 
  "private_key": "-----BEGIN PRIVATE KEY-----\nSEU_PRIVATE_KEY_AQUI\n-----END PRIVATE KEY-----\n",  
  "client_email": "SEU_CLIENT_EMAIL",
  "client_id": "SEU_CLIENT_ID",  
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",  
  "token_uri": "https://oauth2.googleapis.com/token",  
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",  
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/SEU_CLIENT_EMAIL",
  "universe_domain": "googleapis.com" 
}
```

**Importante**: Nunca compartilhe sua chave API publicamente. Utilize o Firebase para armazenar informações sensíveis.

## Estrutura do Projeto

A estrutura do backend está organizada da seguinte forma:

```
backend
│── node_modules/              # Dependências do projeto
│── src/                       # Código-fonte principal
│   ├── config/                # Configuração do Firebase
│   │   ├── firebaseConfig.js  # Arquivo de configuração do Firebase
│   ├── controllers/           # Controladores de requisições
│   │   ├── ChatGPTController.js # Controlador para comunicação com OpenAI
│   ├── routes/                # Definição das rotas da API
│   │   ├── index.js           # Arquivo de roteamento principal
│   ├── services/              # Serviços utilizados no projeto
│   │   ├── ChatGPTService.js  # Serviço para integração com OpenAI
│   │   ├── FirestoreService.js # Serviço para comunicação com Firebase
│   │   ├── ResponseService.js  # Serviço para estruturação das respostas
│   ├── app.js                 # Configuração principal do backend
│   ├── firebaseConfig.json    # Arquivo de configuração do Firebase
│── .gitignore                 # Arquivos ignorados pelo Git
│── package.json               # Configuração do Node.js
│── README.md                  # Documentação do projeto
```

## Como Rodar o Projeto

Para iniciar o servidor localmente, execute:

```bash
npm start
```

A API estará rodando em **http://localhost:3030**.

## Testando a API

### Endpoint de Geração de Tabela
- **Método**: `POST`
- **URL**: `http://localhost:3030/gerar-tabela`
- **Body (JSON)**:

```json
{
  "apiKey": "seu_identificador",
  "list": {
    "Insira as condições, uma por linha, utilizando dois pontos (:) para descrever cada uma. Separe múltiplas condições com ponto e vírgula (;). Garanta que as condições sejam claras e específicas para evitar erros de interpretação, e garatir maior precisão da geração da tabela de decisão."
  },
  "actions": {
 "Insira as ações, uma por linha, utilizando dois pontos (:) para descrever cada uma. Separe múltiplas ações com ponto e vírgula (;). Certifique-se de que cada ação esteja detalhada e condizente com as condições inseridas para maior precisão na geração da tabela de decisão."
  }
}
```
![alt text](image.png)

### Exemplo de Resposta

```json
{
    "status": 200,
    "time": ,
    "msg": "Processo concluído",
    "obj": {
        "table":
    }
}
```



___

Este projeto foi desenvolvido por [Ueber](https://br.linkedin.com/in/uebersyemmer).


