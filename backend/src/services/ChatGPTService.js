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
  
    // Ajustar o texto do prompt para enviar ao ChatGPT
    let textDefault = `
  Condições:
  ${rule}
  
  Ações:
  ${ruleActions}
  
  1. Contextualização do Problema 
  Considere que as condições representam entradas ou critérios que influenciam o comportamento do sistema. 
  As ações representam as respostas ou saídas baseadas nas combinações de condições. Sua tabela deve cobrir todas as combinações possíveis das condições e determinar claramente as ações correspondentes.
  
  2. Estrutura da Tabela
  
  - Condições
  Liste as condições fornecidas, incluindo critérios que afetam as ações do sistema.
  Cada condição deve ser formulada de maneira precisa para evitar ambiguidades.
  Importante: As condições devem ser listadas na primeira coluna da tabela de condições emv erical.
  
  - Ações
  Liste as ações que podem ser tomadas com base nas combinações das condições.
  Cada ação deve ser descrita de forma explícita para facilitar a implementação ou validação.
  Importante: As ações devem ser listadas na primeira coluna da tabela de ações.
  
  3. Construção da Tabela
  
  - Tabela de Condições
  Cada condição deve ser representada por uma linha.
  Utilize valores objetivos, como "V" para verdadeiro ou "F" para falso.
  Os cenários devem ser numerados sequencialmente na primeira linha (cabeçalho).
  
  - Tabela de Ações
  Cada ação deve ser representada por uma linha.
  As ações devem corresponder diretamente aos cenários descritos na tabela de condições.
  Use "V" para verdadeiro ou "F" para falso para indicar se uma ação será executada.
  
  4. Cobertura Completa
  
  Cubra todas as combinações possíveis das condições.
  As ações podem ser múltiplas ou ausentes, dependendo do cenário.
  
  5. Validação e Refinamento
  
  - Consistência: Revise a tabela para garantir que todas as condições e ações estão contempladas.
  - Redundâncias: Elimine cenários ou combinações irrelevantes ou redundantes.
  - Realismo: Remova combinações de condições que não façam sentido no contexto do sistema.
  - Clareza: Certifique-se de que a tabela é fácil de interpretar por outros profissionais.
  
  6. Apresentação Final
  
  - Formate a tabela de forma clara e organizada:
  As condições devem estar na primeira coluna da tabela de condições, e os cenários na sequência.
  As ações devem estar na primeira coluna da tabela de ações, e os cenários correspondentes na sequência.
  Cada cenário deve ser numerado para fácil identificação.
  
  7. Objetivo Final
  
  A tabela deve ser:
  - Exaustiva: Cobrir todas as combinações possíveis.
  - Clara: Fácil de entender e implementar.
  - Útil: Servir como referência para execução de testes ou desenvolvimento de funcionalidades.
  
  8. Criação de Cenários de Teste em BDD
  
  Após a geração das tabelas de decisão, elabore cenários de teste no formato BDD (Behavior-Driven Development) utilizando as combinações de condições e ações identificadas.
  
  Cada cenário deve seguir o formato:
  Dado: Descreva o estado inicial ou condições prévias.
  Quando: Identifique a ação ou evento que ocorre.
  Então: Detalhe o resultado ou comportamento esperado.
  
  Assegure que cada cenário cubra uma combinação única da tabela gerada.
  Certifique-se de que os cenários são claros e podem ser usados diretamente como base para testes automatizados ou manuais.
  
  somente me retorner as tabelas e os cenarios dem bdd

  na tabela de condições não insira o numero nada sobre cenarios
  
  
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
  