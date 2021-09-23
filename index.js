const express = require('express');
require('dotenv').config();
const {clima, dia}=require('./controller/busqueda');
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
    const time = await dia();
    const weather = await clima(ciudad)
    
    
    if(weather){
        res.render('clima',{
          "cuidad": JSON.stringify(ciudad).toUpperCase().replace(/\"/g, ""),
          "temp":JSON.parse(weather[0].temp).toFixed(1),
          "descripcion":JSON.stringify(weather[0].descripcion).replace(/\"/g, "").toUpperCase(),
          "hora":JSON.stringify(time),
          data:  weather         
        })
    }else{
       res.render('index',{
         "alerta": "ciudad no encontrada"
       })
    }
  })
