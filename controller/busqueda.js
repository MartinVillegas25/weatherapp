const axios = require('axios');



const clima = async (ciudad)=>{
    try {
      const resp= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&lang=sp&appid=${process.env.APIKEY}`)
            const {list,city}=resp.data;
            
            return list.map(e => ({
               temp: JSON.parse(e.main.temp-273).toFixed(1),
               termica:e.main.feels_like-273,
               min:e.main.temp_min-273,
               max:e.main.temp_max-273,
               presion:e.main.pressure,
               humedad:e.main.humidity,
               descripcion:e.weather[0].description,
               viento : JSON.parse(e.wind.speed * 4.25).toFixed(2) ,
               fecha: e.dt_txt ,   
            }));
            
            
    } catch (error) {
        console.log(error)
        
    } 
}

const dia =  ()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    
    if (dd < 10) {
      dd = '0' + dd;
    }
    
    if (mm < 10) {
      mm = '0' + mm;
    }
    
    today = dd + '/' + mm + '/' + yyyy;
    return today
}


const lugares = async (lugar)=> {
  try {    
    const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=${process.env.MAPBOX_KEY}&cachebuster=1626462005037&autocomplete=true&limit=5&language=es`);
     
    return resp.data.features.map( lugar =>({
        nombre: lugar.place_name,
        
    }));
    
} catch (err) {
   console.error(err);
}
}

const climaActual = async(lugar) => {
  try {
    const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lugar}&lang=sp&appid=${process.env.APIKEY}`);
    const {main, weather} = respuesta.data;
            
    return  ({
       temp: JSON.parse(main.temp-273).toFixed(1),    
       descripcion:weather[0].description,
    });
    
  } catch (error) {
    console.error(error);
  }
}

module.exports={
    clima,
    dia,
    lugares,
    climaActual
}