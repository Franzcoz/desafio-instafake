// Formulario de ingreso Franco


// Traer los datos de la api Javier
//***************************///***************************/
/*casos activos, casos confirmados, casos muertos, recuperdaos*/ 

async function getData(){
    //consulta a la api
    const data = await fetch('/api/total')
    
    //respuesta de api a json
    const request = await data.json()
    //acceder a data dentro del json, donde estan los datos de cada pais
    const casosPais = request.data

    //filtar Paises segun condicion
    const filtro = casosPais.filter(pais => pais.deaths >= 10000)
    
    console.log(filtro)
}









//***************************///***************************/

// Gráfico Carla


// Tabla con todos los países Carla