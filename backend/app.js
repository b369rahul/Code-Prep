const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
var cors = require('cors') 
app.use(cors())
const session = require("express-session");
const PORT = process.env.PORT || 5000;
const MongoURL =process.env.MongoURL || "mongodb://localhost:27017"
const passport = require('passport') 
app.use(express.urlencoded({extended:false}))

const client_url='http://localhost:3000';
app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: 'key ki ki',
      name:'codeprep'
    })
  );

  mongoose.connect(MongoURL).then(()=>
  console.log("Connected to Database Successfully"))
  .catch((err)=>console.log(err))

app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require('./routes/auth')

const QuestRoute = require('./routes/quests')


app.use('/server/questions',QuestRoute);
app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send("HOME PAGE")
})


//Host app at PORT
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}!`));