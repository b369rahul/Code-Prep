const mongoose = require("mongoose");
require('mongoose-type-url');
const  Quest=require('./question');
const Schema = mongoose.Schema;
const User = new Schema(
    {
        name:{type:String},
        posts:[{type:Quest.schema}],
        sub:{type:String},
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", User);

module.exports = UserModel;