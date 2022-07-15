const router = require("express").Router();
const userDB = require("../models/user");
const passport= require('passport')

var GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    userDB.findById(id).then((res)=>{        
        if(res)done(null,res)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "/auth/google/redirect",
  },(accessToken, refreshToken, profile, done)=>{
    //passport callback funtion
    var userLogin;
    console.log(profile._json)
    userDB.find({sub:profile._json.sub}).then((res)=>{
        if(res.length==0){
            new userDB({
                name:profile._json.name,
                sub:profile._json.sub,
                post:[],                
            }).save().then(curr=>{
                done(null,curr);
            })
            console.log("Naya ban rha h bhai")
        }
        else{
            done(null,res[0])
        }
    })
  }
));
const client_url='http://localhost:3000';

const isAuthented =(req,res,next)=>{ 
    console.log("User",req.user)
    res.setHeader('Access-Control-Allow-Credentials' , 'true')
    if(!req.isAuthenticated())next();
    else{
        res.redirect('http://localhost:3000')
    }
}

router.get('/fetch',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Credentials' , 'true')
    res.setHeader('Access-Control-Allow-Origin' , client_url)
    if(!req.isAuthenticated()){
        res.json({name:"GUEST", posts:[]})
        res.end()
    }
    else {
        res.send(req.user);}
})

router.get('/Login',isAuthented,passport.authenticate('google', { scope: ['profile'] }))
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{ 
    console.log("idahr")
    res.redirect('http://localhost:3000/posts')
}) 
router.get('/logout', function (req, res) {
    req.logOut((err)=>{
        if(err)console.log(err)
        else{
            res.clearCookie('connect.sid')
            res.clearCookie('codeprep')
            req.session.destroy(function (err) {
                res.redirect('http://localhost:3000')
            });
        }
    });
  });
module.exports = router

