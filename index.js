const express = require('express');
require('dotenv').config();
const {clima, dia, lugares,climaActual}=require('./controller/busqueda');
const hbs = require('hbs');
const path = require('path');

const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

hbs.registerPartials(__dirname + '/views');
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on port 3000')
})

app.get('/', (req, res) => {
        res.render("index",{
              "ciudad": "Eliga una ciudad"
        });
    
});

app.post('/enviar', async (req, res)=>{
    const {ciudad} = req.body;
    
    const city = await lugares(ciudad);
    
    if(city){
      res.render('index',{
        info: city
      })
    }else{
      console.log('No city')
      res.render('index',{
        "alerta": "ciudad no encontrada"
      })
   }
    
  });


  app.post('/ciudad', async (req, res)=>{
    const {city} = req.body;
    const time = await dia();
    const weather = await clima(city)
    const actual = await climaActual(city)
    if(weather){
        res.render('clima',{
          "cuidad": JSON.stringify(city).toUpperCase().replace(/\"/g, ""),
          "temp":JSON.parse(actual.temp).toFixed(1),
          "descripcion":JSON.stringify(actual.descripcion).replace(/\"/g, "").toUpperCase(),
          "hora":JSON.stringify(time),
          data:  weather         
        })
    }else{
       res.render('index',{
         "alerta": "ciudad no encontrada"
       })
    }
  })
  
  
