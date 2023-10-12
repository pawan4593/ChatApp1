// //This is node server which will handle socket io connections

// //6600 is port number
// const io = require('socket.io')(6600)

// const users = {}

// //On receiving connection in the socket , run the arrow function ex. Rohan , Divya connected etc like connections are being listened
// io.on('connection' , socket =>{
//     //What happens to particular connection(Rohan , Divya) , decided by socket.io
//     //new-user-joined is an event , this event is user defined and will be handled
//     socket.on('new-user-joined' , name =>{
//         //The moment I get new-user-joined event , the name will be set in the users
//         users[socket.id] = name ;
//         //Let everyone know that user-joined(event) with name except the one who joined
//         socket.broadcast.emit('user-joined' , name) ;
//     });

//     //What to do when chat message send event occurs . send is the event whose name i have decided
//     socket.on('send-msg' , message =>{
//         //recive is an event whose name i have decided
//         socket.broadcast.emit('receive-msg' , {message : message , name : users[socket.id]}) ;
//     });

//     socket.on('disconnect' , message =>{
//         //recive is an event whose name i have decided
//         socket.broadcast.emit('left' , users[socket.id]) ;
//         delete users[socket.io] ;
//     });



// });



const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {

});


const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send-msg', (message) => {
    socket.broadcast.emit('receive-msg', { message: message, name: users[socket.id] });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(6600, () => {
  console.log('Server is running on port 6600');
});
