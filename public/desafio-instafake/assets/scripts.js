const getPhotos = async (tk) => {
    const dataphot = await fetch('/api/photos', {
        headers: {
            Authorization: `Bearer ${tk}`
        }
    })
    const resp = await dataphot.json();
    const photos = resp.data;
    console.log(photos);
    fotear(photos)
}

//Chequear si existe token
const init = () => {
    const token = localStorage.getItem('token');
    if (token == null) {
        return
    }
    // Mostrar fotos
    getPhotos(token);
}
init();
//Obtener formulario

$('form').on('submit', async function (ev) {
    ev.preventDefault();
    const email = $('#email').val();
    const passwd = $('#passwd').val();
    //Obtener token
    const data = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: passwd })
    })
    const jwt = await data.json()
    // guardamos el token en una variable
    const token = jwt.token
    console.log(token);
    localStorage.setItem('token', token)
    getPhotos(token)
})

//Mostrar fotos
const fotear = (photos) => {
    const fotocard = $('#fotos');
    // llenar y agregar cards
    let cards = ""
    for (let photo of photos) {
        const card = `
            <div class="card">
                <img src="${photo.download_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Autor: ${photo.author}</h5>
                </div>
            </div>`;
        cards+= card
    }
    fotocard.html(cards);
    $('#btnSalir').removeClass('d-none').addClass('d-block');
    $('#logeo').removeClass('d-block').addClass('d-none');
    $('#fotos').removeClass('d-none').addClass('d-block');
}

//Salir (borrar token e invertir display de ingreso)
const salir = () => {
    localStorage.removeItem('token');
    $('#btnSalir').removeClass('d-block').addClass('d-none');
    $('#fotos').removeClass('d-block').addClass('d-none');
    $('#logeo').removeClass('d-none').addClass('d-block');
}

$('#btnSalir').on('click', function () {
    salir();
})