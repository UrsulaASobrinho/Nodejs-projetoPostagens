const express = require('express')
const router = express.Router()

//CONFIGURANDO O BANCO DE DADOS
//importando 
const mongoose = require('mongoose')
//chama o arquivo do models
require("../models/Categoria")
//passa a ref do models para uma variavel
const Categoria = mongoose.model("categorias")

//definindo as rotas
router.get('/', (req, res) =>{
    res.render("admin/index")
})
router.get('/posts', (req, res) =>{
    res.send("paginas posts")
})
router.get('/categorias', (req, res) =>{
    Categoria.find().sort({date: 'desc'}).then((categorias) =>{
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("erros_msg", "Houve erro ao lista")
        res.redirect("/admin")

    })
  
})
router.get('/categorias/add', (req, res) =>{
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req, res) =>{
    //mensagem para validações
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })

    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug inválido" })
    }
    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno" })
    }
    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros:erros} )
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(()=>{
             req.flash("success_msg", "Categoria salva com sucesso!")
             res.redirect("/admin/categorias")
            
           // console.log("1")
          }).catch((err) => {
              req.flash("error_msg", "Houve um erro ao editar categoria")
              res.redirect("/admin")
              //console.log("2")
          })
    }
    
    router.get('/categorias/edit/:id', (erq, res)=>{
        
    })    
  

   

})
module.exports = router;
