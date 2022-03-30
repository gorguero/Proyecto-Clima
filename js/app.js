//VARIABLES
const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {

    formulario.addEventListener('submit', buscarClima);

});


//Funciones

function buscarClima(e){

    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);

}


function mostrarAlerta(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto','mt-6','text-center');
        alerta.innerHTML = `
            <strong class="font-bold">¡ERROR!</strong>
            <span class="block">${mensaje}</span>
        `;

        contenedor.appendChild(alerta);  

        setTimeout( () => {
            alerta.remove();
        },3000);

    }

}


function consultarAPI(ciudad, pais){

    const appId = '2b096aaeb9e0779c6f11a0210f202492'; //Api key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML();
            
            if(datos.cod === '404'){
                mostrarAlerta('Ciudad no encontrada');
                return;
            }

            mostrarClima(datos);
        })
    
}

function mostrarClima(datos){

    const { main: {temp, temp_max, temp_min, feels_like, humidity, pressure}, name  } = datos;

    const actual = kelvinToCentigrados(temp);
    const maxima = kelvinToCentigrados(temp_max);
    const minima = kelvinToCentigrados(temp_min);

    const ciudad = document.createElement('p');
    ciudad.innerHTML = `${name}`;
    ciudad.classList.add('font-bold', 'text-3xl', 'text-center');

    const tempActual = document.createElement('p');
    tempActual.classList.add('font-bold', 'text-5xl', 'text-center');
    tempActual.innerHTML = `Actual: ${actual} &#8451`;

    const tempMaxima = document.createElement('p');
    tempMaxima.classList.add('text-2xl');
    tempMaxima.innerHTML = `Máxima: ${maxima} &#8451`;

    const tempMinima = document.createElement('p');
    tempMinima.classList.add('text-2xl');
    tempMinima.innerHTML = `Máxima: ${minima} &#8451`;

    const sensacionTermica = document.createElement('p');
    sensacionTermica.classList.add('text-2xl');
    sensacionTermica.innerHTML = `Sensación termica: ${kelvinToCentigrados(feels_like)} &#8451`;

    const humedad = document.createElement('p');
    humedad.classList.add('text-2xl');
    humedad.innerHTML = `Humedad: ${humidity}%`;

    const presionAtmos = document.createElement('p');
    presionAtmos.classList.add('text-2xl');
    presionAtmos.innerHTML = `Presión: ${pressure}mb`;

    const divResultado = document.createElement('div');
    divResultado.classList.add('text-white');

    divResultado.appendChild(ciudad);
    divResultado.appendChild(tempActual);
    divResultado.appendChild(tempMaxima);
    divResultado.appendChild(tempMinima);
    divResultado.appendChild(sensacionTermica);
    divResultado.appendChild(humedad);
    divResultado.appendChild(presionAtmos);

    resultado.appendChild(divResultado);

}

const kelvinToCentigrados = grados => parseInt(grados - 273.15); 

function limpiarHTML(){

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);

}