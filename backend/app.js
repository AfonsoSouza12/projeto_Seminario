const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")

//middlewares que criam um caminho em que o express manipula os requests e responses
const app = express(); // criando um app express

//BANCO LOCAL
// mongoose.connect("mongodb://localhost:27017/banco-seminario")
//   .then(() =>{
//     console.log("Connected to the database!");
//   })
//   .catch(() =>{
//     console.log("Connection to database failed!");
//   });

//BANCO CLUSTER
mongoose.connect("mongodb+srv://afonso:MdVb4tXqTSrlLSap@cluster0-q6aih.mongodb.net/banco-seminario?retryWrites=true&w=majority")
//diretamente pelo link o mongoose cria uma database automaticamente com o nome depois do .net/
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers",
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes); //pega essa primeira parte do url e joga no postsroutes


module.exports = app; //exporta o app, inclusive os use's
