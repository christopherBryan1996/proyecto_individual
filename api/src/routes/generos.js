const express =require('express')
const { Videogame , Generos} = require('../db');
const  { v4: uuidv4} =require('uuid')
const router =express.Router()
const axios = require('axios')

router.get('/',(req,res)=>{
    return Generos.findAll({
    })
    .then((generos)=>{
        return res.json(generos)
    })
})

module.exports = router

