const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app= express();

const postRoutes = require('./routes/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


mongoose.connect('mongodb://localhost/post')
.then(()=> console.log('Connected to MongoDB..'))
.catch(err => console.error('Coundnt connect to MongoDB' , err));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST,PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);
module.exports = app;
