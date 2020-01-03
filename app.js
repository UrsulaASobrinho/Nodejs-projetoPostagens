'use strict'
//Mdulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    //const mongoose = require('mongoose');

    const app = express();
    const admin = require("./router/admin");
    const path = require('path');

//Configurações
    //bodyParser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());
   
    //handlebars  aqui configuramos e abreviamos .handlebars para .hbs
    app.set('wiews', path.join(__dirname, 'views') );
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
   
    //public - informa que todos os arquivos estaticos estão nesta pasta
    app.use(express.static(path.join(__dirname, "public")));


//Rotas
    //HomePage
    app.use('/', (req , res) =>{
        res.render("index");
    })

    app.use('/admin',admin);

//Outros
const PORTA = 8081
app.listen(PORTA, () =>{
    console.log('Servidor ON');
})




