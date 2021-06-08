

const express = require("express");
const server = express();
const routes = require("./routes");

server.use(express.static('../public')); //linha tirada de https://stackoverflow.com/questions/57671753/referenceerror-app-is-not-defined-node-js
// serve para guiar  o app de onde pegar os css

//usando template engine
server.set('view engine', 'ejs');

//habilitar arquivos statics
server.use(express.static("public"));

//routes
server.use(routes);
server.listen(3000, () => console.log('rodando'));