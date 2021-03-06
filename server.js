'use strict';

// npm modules
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('note:server');
const morgan = require('morgan');

// app modules
const authRouter = require('./route/auth-router');
const listRouter = require('./route/list-router');
const noteRouter = require('./route/note-router');
const errResponse = require('./lib/err-response');

// globals
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/note';

// setup db
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

// app-wide middleware
app.use(morgan('dev'));

// routes
app.use('/api', authRouter);
app.use('/api', noteRouter);
app.use('/api', listRouter);
app.all('*', function( _ , res){
  debug('* 404');
  res.status(404).send('not found');
});

app.use(errResponse);

// start server
const server = app.listen(port, function(){
  debug('app.listen');
  console.log('server up :--:', port);
});

// export server
server.isRunning = true;
module.exports = server;
