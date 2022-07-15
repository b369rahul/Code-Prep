const router = require('express').Router();
const mongoose = require("mongoose");
const Ques = require('../models/question')
const User = require('../models/user')

router.get('/', (req,res)=>{
    Ques.find({}).then((qs)=>res.json(qs)).catch((err)=>console.log("ERR ",err));
})

const isAuthented =(req,res,next)=>{
    //console.log(req.body.data)
    if(req.body.data.id)next();
    else{
        //res.redirect('http://localhost:3000/login')
        res.send('You need to login to add questions')
    }
}

router.post('/addmine',isAuthented,(req,res)=>{
    //console.log(req)
    const ques= req.body.data.ques;
    //console.log(ques)
    const id = req.body.data.id;
    User.findOne({_id : mongoose.Types.ObjectId(id), posts:{$elemMatch:{_id:ques._id}}}).then((user)=>{
        console.log("asdasdasd",user)
        if(!user){
            User.findByIdAndUpdate(id,{$push:{posts:ques}},{new:true, upsert:true})
        .then((res)=>{
            res.send('ok') 
        } )
        .catch((err)=>res.json(err))
        }
        else{
            console.log("yesheh")
            res.send('!')
        }
    }).catch(err=>res.json(err))
})

router.post('/addAll',isAuthented,(req,res)=>{
    //console.log(req)
    const link= req.body.data.link;    
    const desc = req.body.data.desc;
    const id = req.body.data.id;
    const tag = req.body.data.tag;
    User.findById(id).then((user)=>{
        Ques.findOne({link:link}).then((q)=>{
            console.log(q)
            if(q){
                res.send('!')
            }
            else{
                new Ques({
                    link:link,
                    desc:desc,
                    author:id,
                    user:user.name,
                    tag:tag
                }).save().then((ques)=>{
                    console.log(ques)
                    User.findByIdAndUpdate(id,{$push:{posts:ques}},{new:true, upsert:true})
                    .then((res)=>{
                        res.send('ok') 
                    })
                    .catch((err)=>res.json(err))
                })
            }
        }).catch(err=>console.log(err))
    })
    //console.log("data ",req.body.data)
    
})

router.delete('/deletemine',(req,res)=>{
    const ques= req.body.ques;
    const id = req.body.id;
    User.findByIdAndUpdate(id,{$pull:{posts:ques}}).then(res=>console.log(res)).catch(err=>console.log(err))    
    res.sendStatus(200)
})

module.exports =router;