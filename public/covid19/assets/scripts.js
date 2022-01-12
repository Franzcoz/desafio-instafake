// Formulario de ingreso Franco
let formu = $('#formulario-login')

formu.on('submit', function (ev) {
    ev.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    getToken(email, password);
    Entrar();
})

let getToken = async (email, password) => {
    await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
    const jwt = await data.json()
    // guardamos el token en una variable
    const token = jwt.token;
    localStorage.setItem('token', token);
    // getData(token);
}

//Chequear si existe token
const init = () => {
    const token = localStorage.getItem('token');
    if (token == null) {
        return;
    }
    // getData(token);
    Entrar();
}
init();

// Ocultar formulario y mostrar página

const Entrar = () => {
    $('#formulario-login').removeClass('d-block').addClass('d-none');
    $('#Grafico').removeClass('d-none').addClass('d-block');
    $('#Tabla').removeClass('d-none').addClass('d-block');
}

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
    //objetos 
    console.log(filtro)
}









//***************************///***************************/

// Gráfico Carla


// Tabla con todos los países Carla