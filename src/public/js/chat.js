const socket = io()

const chatElements = document.getElementById('list-chats')
chatElements.innerHTML =''
socket.on('init-chat',( chats ) =>{
    console.log(chats)
    chats.foreach((chat)=> {
        chatElements.innerHTML += `
        <li id=${chat._id}>${chat.userEmail} - ${chat.message}</li><br>
        `
    })
})

socket.on('add-message',(newMessage) =>{
    chatElements.innerHTML += `<li id='${newMessage._id}'>${newMessage.userEmail} - ${newMessage.message}</li>`
})

socket.on('delete-message'),(message)=>{
    //message.remove();
}