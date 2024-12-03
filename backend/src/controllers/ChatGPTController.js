const FirestoreService = require('../services/FirestoreService');
const ChatGPTService = require('../services/ChatGPTService');
const ResponseService = require('../services/ResponseService');

class ChatGPTController {
  static async handleChatGPTRequest(req, res) {
    const { list, actions, apiKey } = req.body;
    // console.log(list, apiKey)

    if (!list || !apiKey || !actions) {
      ResponseService.error(res, 'Parâmetros obrigatórios não informados', req.body);
      return;
    }

    try {
      const documentFirestore = await FirestoreService.getUserDocumentByKey(apiKey);
      if (!documentFirestore) {
        ResponseService.error(res, `Documento no Firebase com a key ${apiKey} não encontrado`, req.body);
        return;
      }

      const chatGPTService = new ChatGPTService(documentFirestore.chatgptKey);
      const responseMessage = await chatGPTService.handleMakeTable(list, actions);

      ResponseService.success(res, 'Processo concluído', responseMessage);
    } catch (error) {
      console.error('[ChatGPTController] Error', error);
      ResponseService.error(res, 'Erro geral', error);
    }
  }
}

module.exports = ChatGPTController;