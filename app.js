'use strict'
//Mdulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const mongoose = require('mongoose')

    //importando modulos de session
    const session = require('express-session')
    const flash = require('connect-flash')


    const app = express()
    const admin = require("./router/admin") //jogando o aqruivos admin para dentro do app
    const path = require('path')

//Configurações

    // Configuração das sessões
    app.use(session({
        // Chave para gerar uma sessão 
        secret: 'root',
        resave: true,
        saveUninitialized: true
    }));
// Configuração da sessão flash
    app.use(flash());
// Middleware
    app.use((req, res, next) => {
        // Comando 'locals' para criar variaveis globais
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        // Comando 'next();' para permitir que as rotas avancem apos passarem no mdidleware
        next();
    });

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

    //Mongoose
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/pagedb").then(()=>{
        console.log("Conectato ao mondodb")
    }).catch((err)=>{     console.log(err);    })
   
    //public - informa que todos os arquivos estaticos estão nesta pasta
    app.use(express.static(path.join(__dirname, "public")));


//Rotas
    //HomePage
    app.get('/', (req, res) =>{
        res.send('rota principal')
    })
    app.use('/admin', admin);

//Outros
const PORTA = 8081
app.listen(PORTA, () =>{
    console.log('Servidor ON');
})




