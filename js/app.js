// Variables 
let btnEnviar = document.querySelector('#enviar');
let btnReset = document.querySelector('#resetBtn');
let formulario = document.querySelector('#enviar-mail');

// variables para campos
let email = document.querySelector('#email');
let asunto = document.querySelector('#asunto');
let mensaje = document.querySelector('#mensaje');

let er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// event Listener

eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Reiniciar el formulario
     btnReset.addEventListener('click', resetearFormulario);

     // Boton de enviar en el submit
     formulario.addEventListener('submit', enviarEmail);

}


// funciones
function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true;
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


// validar el formulario

function validarFormulario(e) {

    if(e.target.value.length > 0 ) {

        // Elimina los errores...
        let error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        if(er.test( e.target.value )){
            // Elimina los errores
            let error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }
    
    if(er.test(email.value) && asunto.valuje !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursosr-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    let mostrarError = document.querySelector('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    let errores = document.querySelector('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);   
    }
}

// Envia el email
function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el spinner

    let spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje que dice que se envió correctamente
        let parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Eliminar mensaje de 'enviado correctamente'
            
            resetearFormulario();
        }, 5000)
    }, 3000);
}

function resetearFormulario() {
    formulario.reset();

    inicioApp();
}


    