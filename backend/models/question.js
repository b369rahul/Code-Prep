const mongoose = require("mongoose");
require('mongoose-type-url');
 
const Schema = mongoose.Schema;

const QSchema = new Schema(
    {
        link:{type: mongoose.SchemaTypes.Url, required:true},
        author: {
            type: String,
        },
        user:{type:String},
        tag: {type:String},
        desc: {type:String},
    },
    { timestamps: true }
);

const Ques = mongoose.model("Quest", QSchema);

module.exports = Ques;