const axios = require('axios');



const clima = async (ciudad)=>{
    try {
      const resp= await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&autocomplete=true&lang=sp&appid=${process.env.APIKEY}`)
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

const dia = async ()=>{
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


module.exports={
    clima,
    dia,
}