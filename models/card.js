/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return /(ftp:\/\/|http:\/\/|https:\/\/)(w{3}\.)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(\w+)(\.\w+)?(\.\w+)?(\.\w+))(:[1-9]\d{1,4})?(\/*\w*\d*#?)/.test(
          link
        );
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);
