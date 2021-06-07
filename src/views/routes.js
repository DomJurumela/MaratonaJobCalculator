const express = require('express');
const routes = express.Router();

// request, response
routes.get('/', (request, response) => {
    return reponse.sendFile(__dirname + '/views/index.html')
})

routes.get('/index.html', (request, response) => {
    return res.redirect('/');
})

module.exports = routes;