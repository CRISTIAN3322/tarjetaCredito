// TODO: Variables
const tarjeta = document.querySelector('#tarjeta'),
	  btnAbriformulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .tarjeta__label--numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .tarjeta__label--nombre'),
	  logoMarca = document.querySelector('#logoMarca'),
	  firma = document.querySelector('#tarjeta .tarjeta__firma p'),
	  mes = document.querySelector('#tarjeta .mes'),
	  year = document.querySelector('#tarjeta .year'),
	  ccv = document.querySelector('#tarjeta .tarjeta__ccv');
	  


// * Mostramos la tarjeta al frente cuando se escribe datos numero y nombre
const mostraFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active')
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton abrir formulario
btnAbriformulario.addEventListener('click', () => {
	btnAbriformulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado automaticamente
for(let i = 1;i <= 12;i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado automaticamente
	// ! Sacar el año actual
const yearActual = new Date().getFullYear();

for(let i = yearActual;i <= yearActual+8;i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * input número de tarjeta
formulario.inputNumero.addEventListener('keyup',  (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminamos las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';
		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = './assets/logos/visa.png';
		logoMarca.appendChild(imagen);
	}else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = './assets/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// * Mostramos la tarjeta al frente
	mostraFrente();

});

// * Nombre de la tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;
	formulario.inputNombre.value = valorInput.replace(/[1-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostraFrente();
});


// * Select mes
formulario.selectMes.addEventListener('change', (e) =>{
	mes.textContent = e.target.value;

	mostraFrente();
});

// * Select año
formulario.selectYear.addEventListener('change', (e) =>{
	year.textContent = e.target.value.slice(2);

	mostraFrente();
});

// * Select ccv
formulario.inputCCV.addEventListener('keyup', (e) =>{
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}
	
	formulario.inputCCV.value = formulario.inputCCV.value
	.replace(/\D/g, '')
	.replace(/\s/g, '');

	ccv.textContent = formulario.inputCCV.value;
});