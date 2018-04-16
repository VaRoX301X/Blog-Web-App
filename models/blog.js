var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    //Coding, Personal, Art
    category: String
});

module.exports = mongoose.model("Blog", blogSchema);