const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'public'
    },

    description: {
        type: String,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now()
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],

    allowComments: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('post', PostSchema)