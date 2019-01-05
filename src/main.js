// Slideshow automatic
let slideIndex = 0;
const showSlides = () => {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';  
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';  
  dots[slideIndex - 1].className += ' active';
  setTimeout(showSlides, 2000); 
};

showSlides();

// Menu de navegación
 
const openNav = document.getElementById('open_nav');
openNav.addEventListener('click', () => {
  document.getElementById('mySidenav').style.width = '250px';
});

const closeNav = document.getElementById('close_nav');
closeNav.addEventListener('click', () => {
  document.getElementById('mySidenav').style.width = '0';
});


// Variables para jalar los id del HTML
const selectDocumentYear = document.getElementById('select_year');
const selectDocumentMinYear = document.getElementById('select_min_year');
const selectDocumentMaxYear = document.getElementById('select_max_year');
const btnMostrarAños = document.getElementById('btn_mostrar_años');
const btnMostrarCalculo = document.getElementById('btn_mostrar_calculo');
const selectDocumentOrder = document.getElementById('order');

// DOM para mostrar data en pantalla
const filterForYear = document.getElementById('filter_years');
const filterForRang = document.getElementById('filter_rang');
const orderYear = document.getElementById('order_years');
const calculo = document.getElementById('calculo');


// Data del archivo data.js

/* Copia de la data Original*/
const newData = injuries.cambiarPropiedad(INJURIES); // array de objetoos
const years = injuries.filtrarPropiedadEspecifica(newData, 'Year');

// Funcion para mostrar cartas solo con los valores de la propiedad Year
const listarItems = (obje, dive) => {
  let cadena = '';
  
  obje.forEach((obj) => { 
    cadena += `<div class = "card-year">
    <article class = "prop-year">
     <h2 class = "filter-year">${obj.Year}</h2>
     <div/>
         <div class = "group"> General por año: <span class="info"> ${obj.Total_Injured_Persons}</span></div>
         <div class = "group"> En aire:<span class="info"> ${obj.Total_Injured_Persons_Air}</span></div>
         <div class = "group"> Ocupantes de bus: <span class="info">${obj.Total_Injured_Persons_Bus_Occupants}</span></div>
         <div class = "group"> Personas lesionadas en carretera:<span class="info"> ${obj.Total_Injured_Persons_Highway}</span></div>
         <div class = "group"> En motocicleta:<span class="info"> ${obj.Total_Injured_Persons_Motorcyclists}</span></div>
         <div class = "group"> Ocupantes en automóviles:<span class="info"> ${obj.Total_Injured_Persons_Passenger_Car_Occupants}</span></div>
         <div class = "group"> Pasajeros de automóviles:<span class="info"> ${obj.Total_Injured_Persons_Passenger_Or_Occupant}</span></div>
         <div class = "group"> Peatones heridos:<span class="info">${obj.Total_Injured_Persons_Pedestrians}</span></div>
         <div class = "group"> Personas lesionadas en aerolíneas de EEUU: <span class="info">${obj.Total_Injured_Persons_US_Air_Carrier}</span></div>
     </div>
     </article>
 </div>
    `;
  });
  dive.innerHTML = cadena;
};

// convertir datos null a 0
const denullacero = (data) => { 
  return data.map(element => {
    const keys = Object.keys(element);
    let aRetornar = Object.assign({}, element);
    keys.forEach(key => {
      if (element[key] === null) {
        aRetornar[key] = 0;
      }
    });
    return aRetornar;
  });
};

// Funcion para mostrar los años en el select
const mostrarCasillasEnSelect = (array) => {
  let recibirArreglo = '';
  array.forEach((ele) => {
    recibirArreglo += `<option value = "${ele}">${ele}</option>`;
  }); 
  return recibirArreglo;   
};
selectDocumentYear.innerHTML = mostrarCasillasEnSelect(years);
selectDocumentMinYear.innerHTML = mostrarCasillasEnSelect(years);
selectDocumentMaxYear.innerHTML = mostrarCasillasEnSelect(years);

// Mostrar cartas según la selección ingresada por el usuario
 
selectDocumentYear.addEventListener('change', (event) => {
  let result = injuries.filtro(newData, (parseInt(event.target.value)));
  let resultCero = denullacero(result);
  listarItems(resultCero, filterForYear);
}); 
 
btnMostrarAños.addEventListener('click', () => {
  document.getElementById('page_one').style.display = 'none';
  let minYear = selectDocumentMinYear.value;
  let maxYear = selectDocumentMaxYear.value;
  let respt = injuries.filtroMinMax(newData, minYear, maxYear);
  let resultS = denullacero(respt);
  listarItems(resultS, filterForRang);
});

// btnMostrarCalculo.addEventListener('click', () => {
//   let minY = selectDocumentMinYear.value;
//   let maxY = selectDocumentMaxYear.value;
//  // let resptet = funcion de reduce 

//   let resultSx = denullacero(respt);
//   listarItems(resultSx, calculo);
// });

// Función para ordenar los datos por años y mostrarlos en pantalla

selectDocumentOrder.addEventListener('click', () => {
  document.getElementById('page_two').style.display = 'block';
  const yearOrder = injuries.sorts(newData, event.target.value);
  listarItems(yearOrder, orderYear);
});