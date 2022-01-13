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
}
init();



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
//Grafico//

window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Casos Covid 19 pais por pais"
        },	
        axisY: {
            title: "Casos activos",
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
        toolTip: {
            shared: true
        },
        data: [{
            type: "column",
            name: "Casos activos",
            legendText: "Proven Oil Reserves",
            showInLegend: true, 
            dataPoints:[
                { label: "Saudi", y: 266.21 },
                { label: "Venezuela", y: 302.25 },
                { label: "Iran", y: 157.20 },
                { label: "Iraq", y: 148.77 },
                { label: "Kuwait", y: 101.50 },
                { label: "UAE", y: 97.8 }
            ]
        },
        {
            type: "column",	
            name: "Casos recuperados",
            legendText: "Oil Production",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints:[
                { label: "Saudi", y: 10.46 },
                { label: "Venezuela", y: 2.27 },
                { label: "Iran", y: 3.99 },
                { label: "Iraq", y: 4.45 },
                { label: "Kuwait", y: 2.92 },
                { label: "UAE", y: 3.1 }
            ]
        },
        {
           
            type: "column",	
            name: "Fallecidos",
            legendText: "Oil Production",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints:[
                { label: "Saudi", y: 10.46 },
                { label: "Venezuela", y: 2.27 },
                { label: "Iran", y: 3.99 },
                { label: "Iraq", y: 4.45 },
                { label: "Kuwait", y: 2.92 },
                { label: "UAE", y: 3.1 }
            ]
        }]
    });
    chart.render();
}




  //Tabla //
const labels = [
    '',
  '',
  '',
  '',
  '',
  '',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};