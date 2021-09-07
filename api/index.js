//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const axios = require('axios')
require('dotenv').config();
const {key} = process.env

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    //console.log(conn.models)
    const {Generos,Videogame} = conn.models
    var apiVidGams= axios.get(`https://api.rawg.io/api/games?key=${key}`)
    var apiGene= axios.get(`https://api.rawg.io/api/genres?key=${key}`)
    Promise.all([
      apiVidGams,
      apiGene
    ]).then(result=>{
        var apiVidGam= result[0].data.results
        var apiGen = result[1].data.results
        //console.log(apiVidGam)
        var Echge = apiGen.map(e=>{
          Generos.create({
            id:e.id,
            name: e.name
          })
        })
        var EchoVI= apiVidGam.map(e=>{
          var plataforma= e.parent_platforms.map(e1=>{
            var string=e1.platform.name.toString()
            return string
          })
          //console.log(plataforma.toString())
          Videogame.create({
            id: parseInt(e.id),
            name: e.name,
            description: e.description,
            releaseDate:e.released,
            rating: e.rating,
            plataformas: plataforma.toString(),
            rutaImage:e.background_image,
          })
        })
        Promise.all([EchoVI, Echge])
        .then(async resp=>{
          console.log('hecho')
        })
        .catch(e=>console.log('error'))
      
    })
    .catch(e=>{
        console.error('error')
    })
  });
});
 