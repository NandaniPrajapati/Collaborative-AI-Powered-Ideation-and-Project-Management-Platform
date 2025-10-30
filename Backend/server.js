
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



app.use(cors({
    origin: "http://localhost:5173",  // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies/auth
  }));


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("mongodb connected"))
.catch( err => console.log(err));

const project = require('./models/project');


app.get("/", (req, res) => {
    res.send("Backend is running.");
  });

 

  mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{app.listen (process.env.PORT ,()=>{
   console.log( 'server is running on ${process.env.PORT} and mongodb connected');
  })
  })
.catch(err =>console.error(err))


// for jwt authentication 
app.use(bodyParser.json());
app.use(express.json());

// Routes

mongoose.connect(process.env.MONGODB_URI)
const  authRoutes =require('./routes/Auth')
const userRoutes =require('./routes/userRoute')
const projectRoutes = require('./routes/projectRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/projects',projectRoutes)
app.use('/api/users', userRoutes);
app.use('/api/ideas',ideaRoutes)

//for socket 


const { Server } = require("socket.io");
const http = require("http");
const { registerSocketHandlers } = require("./socket");
const server = http.createServer(app);
/*
const io = new  Server(server, {
  cors: {
    transports: ['websocket'],
    origin: "http://localhost:5173", // your React frontend
    methods: ["GET", "POST"],
    credentials: true
  }
});

registerSocketHandlers(io);
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

app.get("/api/health", (req, res) => {
  res.send("Server is running");
});


*/
//for white board 

//const socketIO = require("socket.io");

const Io =    new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // 👈 match frontend origin
    methods: ['GET', 'POST'],
  },
});


const whiteBoardData = []; // Array to store drawing data


Io.on("connection", (socket) => {
  console.log("New client connected");

  // Send the history to the new clients
  socket.emit("drawing-history", whiteBoardData);

  socket.on("drawing", (data) => {
    whiteBoardData.push(data); // Add drawing data to the history
    socket.broadcast.emit("drawing", data);
  });
  socket.on('clear',()=>{
    whiteBoardData=[];
    Io.emit('clear');
  })
  socket.on('disconnect',()=>{
    console.log("user got disconnected")
  })
});




