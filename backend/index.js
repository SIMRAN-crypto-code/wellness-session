let express=require('express');
let app=express();
app.use(express.json());
require('dotenv').config();
var mongoose=require('mongoose');
let cors=require('cors')
require('./Models/User')
require('./Models/Session')
const authRoutes=require('./Routes/AuthRouter')
const sessionroutes=require('./Routes/SessionRouter')



app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you use cookies/auth headers
}));





app.use('/api/auth', authRoutes);
app.use('/api/session',sessionroutes)

//for mongodb connection
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log("there is an error",err);
})
//for server connection
app.listen(process.env.PORT,()=>{
    console.log("server is running on port",process.env.PORT);
})