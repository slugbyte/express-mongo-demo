'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema

const noteSchema = mongoose.Schema({
  content: {type: String},
  timestamp: {type: Date, default: new Date()},
  listId: {type: Schema.ObjectId}
});

const Note = module.exports = mongoose.model('Note', noteSchema);
