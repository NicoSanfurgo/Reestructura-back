const chatModel = require ('../dao/models/chat.model')


class ChatManagerDB {
    
    sendMessage = async (message)=>{
         try {
            const saveMessage = await chatModel.create(message)
             return saveMessage
         } catch (error) {
            return {msg:'No se puedo Grabar el Mensaje'}
         }
    }
   
    getMessage = async ()=>{
        try {
            const messages = await chatModel.find()
            return messages
        } catch (error) {
            return {msg:'No se puedo Mostrar mensajes'}
        }
    }

    deleteMessage = async (id)=>{
        try {
            const deleteMsg = await chatModel.findByIdAndDelete(id)
            return deleteMsg
        } catch (error) {
            return {msg:'No se puedo Mostrar mensajes'}
        }
    }

}

module.exports = ChatManagerDB