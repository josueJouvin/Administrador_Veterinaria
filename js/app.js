const formulario = document.querySelector('#nueva-cita');
const inputs = document.querySelector('#divs')
const contenido = document.querySelector('#contenido')
const agendar = document.querySelector('.agregar-cita')
const citas = document.querySelector('#citas')
let pacientes = []
let editando = false

document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('pacientes')){
        pacientes = JSON.parse(localStorage.getItem('pacientes'));
        pintarHtml()
    }
})
let datosPaciente = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}
inputs.addEventListener('input',(e)=>{
    datosPaciente[e.target.name] = e.target.value;
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()
    //pacientes.push({...datosPaciente})
    validacionForm()
})

const validacionForm = () =>{
    const {mascota, propietario, telefono, fecha, hora, sintomas,id} = datosPaciente

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        alertas(tipo='class', clases='alert alert-danger w-100 text-center',mensaje = "Todos los datos son obligatorios")
        return
    } 

    if(editando){
        console.log("edicion")
        editarCita({...datosPaciente})
        editando = false;
    }else{
        console.log("Nueva cita")
        alertas(tipo='class', clases='alert alert-success w-100 text-center',mensaje = "agregado correctamente")
        datosPaciente.id = `${Date.now()}`
        pacientes.push({...datosPaciente})
        pintarHtml()
        limpiadoObjeto()
        formulario.reset()
    }
}


const alertas = (tipo,clases,mensaje) =>{
    const alerta = document.createElement('div');
    alerta.setAttribute(tipo,clases);
    alerta.textContent = mensaje;
    contenido.insertBefore(alerta,agendar)

    setTimeout(()=>{
        alerta.remove()
    },2000)
}

const limpiadoObjeto = () =>{
    datosPaciente.mascota=''; 
    datosPaciente.propietario='';
    datosPaciente.telefono=''; 
    datosPaciente.fecha='';
    datosPaciente.hora='';
    datosPaciente.sintomas=''; 
}

const pintarHtml = () =>{
    citas.innerHTML = '';
    pacientes.forEach(paciente =>{
        const {mascota, propietario, telefono, fecha, hora, sintomas,id} = paciente
        const divCita = document.createElement('div')
        divCita.setAttribute('id', `${id}`);
        divCita.setAttribute('class', 'p-2');

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn','btn-primary');
        btnEditar.textContent = "Editar"
        btnEditar.onclick = () => cargarCita(paciente)
        divCita.innerHTML=`
                <h2 class="card-title fw-bold text-center">Mascota: ${mascota}</h2>
                <p><span class="font-weight-bold">Propietario: </span>${propietario}</p>
                <p><span class="font-weight-bold">Telefono: </span>${telefono}</p>
                <p><span class="font-weight-bold">Fecha: </span>${fecha}</p>
                <p><span class="font-weight-bold">Hora: </span>${hora}</p>
                <p><span class="font-weight-bold">Sintomas: </span>${sintomas}</p>
                <button type="button" class="btn btn-danger mr-2" id="${id}">Eliminar</button>
        
            `
        divCita.appendChild(btnEditar)
        citas.appendChild(divCita)

    })
    guardarLocalStorage()
}

const guardarLocalStorage = () =>{
    const storageTodo = JSON.stringify(pacientes);
    localStorage.setItem('pacientes',storageTodo)
}


const eliminaTodo = addEventListener('click',(e) =>{
    if (e.target.matches(".btn-danger")) {
        pacientes = pacientes.filter(p => p.id !== e.target.id)
        pintarHtml()
    }
})


function cargarCita(paciente){
    const {mascota, propietario, telefono, fecha, hora, sintomas,id} = paciente
    inputs.childNodes[3].childNodes[3].childNodes[1].value = mascota;
    inputs.childNodes[5].childNodes[3].childNodes[1].value = propietario;
    inputs.childNodes[7].childNodes[3].childNodes[1].value = telefono;
    inputs.childNodes[9].childNodes[3].childNodes[1].value = fecha;
    inputs.childNodes[11].childNodes[3].childNodes[1].value = hora;
    inputs.childNodes[13].childNodes[3].childNodes[1].value = sintomas;

    datosPaciente.mascota = mascota; 
    datosPaciente.propietario = propietario;
    datosPaciente.telefono = telefono; 
    datosPaciente.fecha = fecha;
    datosPaciente.hora = hora;
    datosPaciente.sintomas = sintomas;
    datosPaciente.id = id  

    formulario.querySelector('button[type="submit"]').textContent = "ACTUALIZAR"
    editando = true
}

const editarCita = (citaActualizada) =>{

    pacientes = pacientes.map(p => p.id === citaActualizada.id ? citaActualizada : p)
    pintarHtml();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = "CREAR CITA"
    editando= false
}


