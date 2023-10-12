//This is node server which will handle socket io connections

//6600 is port number
const io = require('socket.io')(6600)

const users = {}

//On receiving connection in the socket , run the arrow function ex. Rohan , Divya connected etc like connections are being listened
io.on('connection' , socket =>{
    //What happens to particular connection(Rohan , Divya) , decided by socket.io
    //new-user-joined is an event , this event is user defined and will be handled
    socket.on('new-user-joined' , name =>{
        //The moment I get new-user-joined event , the name will be set in the users
        users[socket.id] = name ;
        //Let everyone know that user-joined(event) with name except the one who joined
        socket.broadcast.emit('user-joined' , name) ;
    });

    //What to do when chat message send event occurs . send is the event whose name i have decided
    socket.on('send' , message =>{
        //recive is an event whose name i have decided
        socket.broadcast.emit('receive' , {message : message , name : users[socket.id]}) ;
    });
});