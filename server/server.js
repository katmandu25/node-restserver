require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    //res.send('Hello World')  Puedo querer q la vuelta sea json. Asi que hago res.json
    res.json('Hello world');
})

app.get('/usuario', function(req, res) {
    //res.send('Hello World')  Puedo querer q la vuelta sea json. Asi que hago res.json
    res.json('get usuario');
})

app.post('/usuario', function(req, res) {

    let body = req.body; // Procesa la información que recibe de las peticiones en formato x-www-form-urlencoded

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            persona: body
        });
    }
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
})

app.delete('/usuario', function(req, res) {
    //res.send('Hello World')  Puedo querer q la vuelta sea json. Asi que hago res.json
    res.json('delete usuario');
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto", 3000);
})