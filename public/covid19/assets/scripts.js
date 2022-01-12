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


// Gráfico Carla


// Tabla con todos los países Carla