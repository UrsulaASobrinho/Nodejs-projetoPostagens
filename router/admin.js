const express = require('express');
const router = express.Router();

//definindo as rotas
router.get('/', (req, res) =>{
    res.render("admin/index")
})

module.exports = router;
