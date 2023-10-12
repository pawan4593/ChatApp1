//Went to socket io documentation
//See javascript client
const socket = io('http://localhost:6600') ;

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3') ;


const append = (msg , position)=>{
    const msgElement = document.createElement('div') ;
    msgElement.innerText = msg ;
    msgElement.classList.add('message') ;
    msgElement.classList.add(position) ;
    messageContainer.append(msgElement) ;
    if(position == 'left')
        audio.play() ;
}

form.addEventListener('submit' , (e)=>{
    e.preventDefault() ;
    const message = messageInput.value ;
    append(`You : ${message}` , 'right') ;
    socket.emit('send-msg' , message) ;
    messageInput.value = "" ;
}) ;


const name_joiner = prompt("Enter your name to join") ; 
socket.emit('new-user-joined', name_joiner) ;

socket.on('user-joined' , name_joiner=>{
    append(`${name_joiner} joined the chat ` , 'left')
}) ;

socket.on('receive-msg' , data=>{
    append(`${data.name} : ${data.message} ` , 'left')
}) ;

socket.on('left' , data=>{
    append(`${data} has left the chat` , 'left')
}) ;