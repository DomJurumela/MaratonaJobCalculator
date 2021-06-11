//comando terminal para rodar o código: "npm run dev"

const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//server.use(express.static('../public')); //linha tirada de https://stackoverflow.com/questions/57671753/referenceerror-app-is-not-defined-node-js
// serve para guiar  o app de onde pegar os css

//usando template engine
server.set('view engine', 'ejs');//informa que todos os arquivos na pasta "Views" são .ejs

// Mudar a localização da pasta view
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos statics (Pode bugar)
server.use(express.static("public"));

//liberar o uso o req.body
server.use(express.urlencoded({ extended: true }));

//routes
server.use(routes);
server.listen(3000, () => console.log('rodando'));