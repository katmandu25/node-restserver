const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const _ = require('underscore');

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
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //usuarioDB.password=null   Asi no devolvemos la contraseña.

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

    // let body = req.body; // Es peligroso mandar el body porque graba todo el esquema sin limitación de los campos.

    // Para limitar la modificación de los campos que voy a hacer puedo usar el siguiente método
    // delete body.password
    // delete body.google
    // Para ser mas eficientes vamos a ustilizar la librería underscore y en concreto el método pick q devuelve una copia
    // del objeto con una whit list de los campos

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    console.log(body);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        // Se puede eliminar la contraseña de la vuelta poniendo
        // usuarioDB.password=null;
        // pero devolvemos el nombre del campo donde se almacena.

        if (err) {
            console.log(err);
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

})

app.delete('/usuario', function(req, res) {
    //res.send('Hello World')  Puedo querer q la vuelta sea json. Asi que hago res.json
    res.json('delete usuario');
})

module.exports = app;