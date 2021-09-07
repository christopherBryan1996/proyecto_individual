const express =require('express')
const { Videogame , Generos} = require('../db');
const  { v4: uuidv4} =require('uuid')
const router =express.Router()
const axios = require('axios');
const {Op} = require('sequelize');

require('dotenv').config();
const {key} = process.env
//POST /videogame
//agregar 
router.post('/',(req,res)=>{
    const {name,description,releaseDate,rating,plataformas,rutaImage}= req.body
    Videogame.create({
        id:uuidv4(),
        name,
        description,
        releaseDate,
        rating,
        plataformas,
        rutaImage,
    }).then((creado)=>{
        res.json(creado)
    })
    .catch(err=> res.sendStatus(404))
})

//console.log(key)
//prueba de conexion
// consultando los 100 primeros 
router.get('/',(req,res)=>{
    return Videogame.findAll({
        include: Generos,
        limit:100
    })
    .then((videogame)=>{
        return res.json(videogame)
    })
})
//ver todo api y base de datos
//console.log(`https://api.rawg.io/api/games?key=${key}`)
router.get ('/conApi', (req,res)=>{
    var apiVidGams= axios.get(`https://api.rawg.io/api/games?key=${key}`)
    var dbvideogames= Videogame.findAll({
        include:Generos
    })
    return Promise.all([
        apiVidGams,
        dbvideogames
    ]).then(result=>{
        var apiVidGam= result[0].data.results
        var dbvideogame= result[1]
        var allVideogame= apiVidGam.concat(dbvideogame)
        res.send(allVideogame)
    })
    .catch(e=>{
        console.error('error')
    })
})

//GETvideogames?name="..."
router.get('/name', (req,res)=>{
    const {name} = req.query
    console.log(name)
    const videogame = Videogame.findAll({
        where:{name: name},
        include: Generos
    }).then(e=>{
        if(e.length==0){
            res.send('no existe')
        }
        res.json(e)
    }).catch((e)=>console.log('error'))
    
})

//GET /videogame/{idVideogame}
router.get('/:idVideogame',async(req,res)=>{
    let play =await Videogame.findByPk(req.params.idVideogame,{include:Generos} )
    res.json(play || 'player not found')
})

//get con like
router.get('/like/:name',(req,res)=>{
    const {name} = req.params
    console.log(name)
    Videogame.findAll({
        where:{
            name:
           { [Op.like]: `%${name}%`}
           
        },include:Generos
    }).then(e=>{
        if(e.length==0){
            res.send('no existe')
        }
        res.json(e)
    }).catch(e=> console.log('error de like'))
})


module.exports= router