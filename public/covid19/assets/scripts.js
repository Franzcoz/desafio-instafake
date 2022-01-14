// Formulario de ingreso Franco

console.log('hola');
$('#form-login').on('submit', function (ev) {             
    ev.preventDefault(); 
    const email = $('#email').val();
    const password = $('#password').val();
    getToken(email, password);
    Entrar();
})

let getToken = async (email, password) => {
    const data = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
    
    const jwt = await data.json()
    // guardamos el token en una variable
    const token = jwt.token;
    localStorage.setItem('token', token);
    // getData(token);
}
// Ocultar formulario y mostrar página

const Entrar = () => {
    $('#btnSalir').removeClass('d-none').addClass('d-block');
    $('#formulario-login').removeClass('d-block').addClass('d-none');
    $('#Grafico').removeClass('d-none').addClass('d-block');
    $('#Tabla').removeClass('d-none').addClass('d-block');
}

//Chequear si existe token
const init = () => {
    const token = localStorage.getItem('token');
    if (token == null) {
        return;
    }
    // getData(token);
    Entrar();
    getData()
}
init();

//Salir (borrar token e invertir display de ingreso)
const salir = () => {
    localStorage.removeItem('token');
    $('#btnSalir').removeClass('d-block').addClass('d-none');
    $('#formulario-login').removeClass('d-none').addClass('d-block');
    $('#Grafico').removeClass('d-block').addClass('d-none');
    $('#Tabla').removeClass('d-block').addClass('d-none');
}

$('#btnSalir').on('click', function () {
    salir();
})

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
    const filtro = casosPais.filter(pais => pais.deaths >= 100000)
    //objetos 
    console.log(filtro)
    // llamamos a la funcion grafico
    grafico(filtro)

    llenarTabla(casosPais)
}

//***************************///***************************/

// Gráfico Carla
//Grafico//

function grafico (paises) {

    const activos = []
    const confirmados = []
    const fallecidos = []
    const recuperados = []

    for (pais of paises){
        activos.push({label: pais.location, y: pais.active})
        confirmados.push({label: pais.location, y: pais.confirmed})
        fallecidos.push({label: pais.location, y: pais.deaths})
        recuperados.push({label: pais.location, y: pais.recovered})
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Casos Covid 19 pais por pais"
        },	
        axisY: {
            title: "Casos",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Casos confirmados",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        axisY3: {
            title: "Casos fallecidos",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        axisY4: {
            title: "Casos recuperados",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },	
        toolTip: {
            shared: true
        },
        data: [{
            type: "column",
            name: "Casos activos",
            legendText: "Casos activos",
            showInLegend: true, 
            dataPoints: activos
        },
        {
            type: "column",	
            name: "Casos confirmados",
            legendText: "Casos confirmados",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: confirmados
        },
        {
            type: "column",	
            name: "Fallecidos",
            legendText: "Fallecidos",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: fallecidos
        },
        {
            type: "column",	
            name: "Casos recuperados",
            legendText: "Casos recuperados",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: recuperados
        }]
    });
    chart.render();
}

 //llenar tabla 

function graficoDetalle(pais){
    const chart = new CanvasJS.Chart("chartModal", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title:{
            text: pais
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            dataPoints: [
                { label: "apple",  y: 10  },
                { label: "orange", y: 15  },
                { label: "banana", y: 25  },
                { label: "mango",  y: 30  },
                { label: "grape",  y: 28  }
            ]
        }
        ]
    });
    chart.render();
}

function llenarTabla (datos){
    $('#cuerpoTabla').append()
    for (dato of datos){
        $('#cuerpoTabla').append(`
        <tr>
            <td>${dato.location}</td>
            <td>${dato.confirmed}</td>
            <td>${dato.deaths}</td>
            <td><button data-name="${dato.location}" class="btn btn-primary verDetalle" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver detalle</button></td>
        </tr>
        `)
    }
}
$(document).on('click', '.verDetalle', function() {
    let name = $(this).attr('data-name');
    graficoDetalle(name);
})