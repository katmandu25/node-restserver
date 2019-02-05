const express = require('express');
const app = express();

const Usuario = require('../models/usuario');

app.get('/usuario', function(req, res) {
    //res.send('Hello World')  Puedo querer q la vuelta sea json. Asi que hago res.json
    res.json('get usuario');
})

app.get('/', function(req, res) {
    //res.send('Hello World')  Puedo querer q la vuelta sea json. Asi que hago res.json
    res.json('Hello world');
})

app.post('/usuario', function(req, res) {

    let body = req.body; // Procesa la información que recibe de las peticiones en formato x-www-form-urlencoded

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

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

module.exports = app;