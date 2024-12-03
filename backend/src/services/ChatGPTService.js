const OpenAI = require("openai");

class ChatGPTService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async handleMakeTable(list, lActions) {
    const keys = Object.keys(list); // Pegando as condições
    const conditions = keys.join(', '); // Unindo as condições em uma string
    const condLength = keys.length; // Número de condições

    // Cálculo de combinações: 2^n onde n é o número de condições
    const numCombinacao = Math.pow(2, condLength); // 2^n combinações possíveis

    // Gerar as regras a partir do objeto de condições
    let rule = '';
    Object.entries(list).forEach(([key, value]) => {
      rule += `${key}: ${value}.\n`;
    });

    // Gerar regras das ações
    let ruleActions = '';
    Object.entries(lActions).forEach(([key, value]) => {
      ruleActions += `${key}: ${value}.\n`;
    });

    // Ajustar o texto do prompt para enviar ao ChatGPT, garantindo as condições na vertical
    let textDefault = `
Dado um array de condições: ${conditions},
gere uma tabela com ${numCombinacao} combinações possíveis de valores booleanos (true e false) para cada condição.
Leve em conta as seguintes regras para as condições:
${rule}

As condições devem ser dispostas na **primeira coluna** da tabela, uma por linha. 
Cada combinação gerada deve ser representada em uma **coluna separada**. 
Os valores dentro das células da tabela devem ser "V" (verdadeiro), "F" (falso), ou "-" (não aplicável).

Aqui está a estrutura que a tabela deve seguir:
- A primeira **linha horizontal** da tabela contém os identificadores das combinações (1, 2, 3, etc.).
- A primeira **coluna vertical** contém as condições dispostas em ordem, uma por linha.
- Cada **coluna subsequente** (numerada 1, 2, 3, etc.) corresponde a uma combinação específica, e cada célula dentro dessas colunas contém:
  - **V** para verdadeiro, quando a condição é satisfeita.
  - **F** para falso, quando a condição não é satisfeita.

Após gerar a tabela, aplique as seguintes regras para simplificá-la:
1. Remova colunas que possuam valores idênticos em todas as linhas.
2. Elimine colunas que não sejam necessárias para o contexto atual, de modo a reduzir o volume de informações sem perder o significado importante.
3. Verifique se há condições duplicadas ou colunas equivalentes e as consolide para simplificar a tabela.
4. Após a simplificação, mostre-me a tabela resultante e explique as mudanças feitas.

O objetivo é manter apenas as informações relevantes, removendo qualquer dado redundante.

Agora, gere uma segunda tabela com as seguintes ações:
${ruleActions}

As ações na segunda tabela devem ter o mesmo número de colunas que a tabela de condições simplificada. 
Preencha as células da tabela de ações com base nos valores das condições na tabela simplificada. 
Para cada coluna, apenas uma ação pode ser verdadeira ("V") e as demais ações devem ser falsas ("F"). 
`;
  
    try {
      const model = "gpt-4o-mini";
      const response = await this.openai.chat.completions.create({
        model: model,
        messages: [
          { role: "user", content: textDefault },
        ],
        temperature: 1,
        max_tokens: 10000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      let responseMessage = response.choices[0]?.message?.content;
      return {
        table: responseMessage,
        numCombinations: numCombinacao,
        useChatGpt: response.usage
      };
    } catch (error) {
      console.error('[ChatGPTService] Error generating table:', error);
      throw error;
    }
  }
}

module.exports = ChatGPTService;