
 function fotoClima () {
    let estado =  document.querySelector('#descripcion').innerHTML;
    const img = document.querySelector("#img");
   
    console.log(img)
    console.log(estado)
    if(estado.includes('LLUVIA')){
    img.setAttribute("src","/imgestados/lloviendo.png");
    }else if(estado.includes('ALGO')){
    img.setAttribute("src","/imgestados/solynubes.png");
    }
    else if(estado.includes('NUBE') || estado.includes('MUY')){
      img.setAttribute("src", "/imgestados/nublado.png");
    }else if(estado.includes('NEVADA') || estado.includes('NIEVE')){
        console.log('cambia')
      img.setAttribute("src", "/imgestados/nieve.png");
    }else if(estado.includes('CIELO') ){
      img.setAttribute("src","/imgestados/sol.png");
    }else{
        console.log('Error')
    }
}

fotoClima()