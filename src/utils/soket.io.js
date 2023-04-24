const ProductManager = require("../dao/ProductManager");
const ChatManagerDB = require('../dao/ChatManagerDB');
const Product = new ProductManager('./assets/product.json');
const chat = new ChatManagerDB();
const {Server} = require('socket.io');
let io;

const connectionSocket = (httpServer)=>{
    io = new Server(httpServer);
    io.on ('connection', async (socket)=>{
        console.log("Nuevo cliente conectado")
        let products = await Product.getProducts();
        const chats = await chat.getMessage();
        socket.emit('init.productos', products)
        socket.emit('init.chats',chats)
    });
}

const emitDeleteProduct = (id)=>{
    io.emit('delete.productos', {id})
}

const emitaddRealtime = (add)=>{
    io.emit('create.productos',{add} )
}

const emitMessage = (newMessage)=>{
    console.log(`mensaje enviado: ${JSON.stringify(newMessage)}`)
    io.emit('add-message',newMessage)
}

const emitDeletemsg = (message)=>{
    console.log(`Mensaje eliminado: ${JSON.stringify(message)}`)
    io.emit('delete-message',message)
}
module.exports = {
    connectionSocket,
    emitDeleteProduct,
    emitaddRealtime,
    emitMessage,
    emitDeletemsg
};
