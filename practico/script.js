
const contenedor = document.getElementById('lists-container');

const crearBotonMarcar = (nodoTarea) => {
  const nuevoBoton = document.createElement('button');
  nuevoBoton.innerText = "Marcar"
  nuevoBoton.addEventListener('click',()=>{
    if(nodoTarea.classList.contains('terminada')){
      nodoTarea.classList.remove('terminada')
    } else{
      nodoTarea.classList.add('terminada')
    }
  })
  // rellenar aquí
  return nuevoBoton;
};

const crearBotonRemover = (nodoLista, nodoTarea) => {
  const nuevoBoton = document.createElement('button');
  nuevoBoton.innerText = "Remover"
  nuevoBoton.addEventListener('click',()=>{
    nodoLista.removeChild(nodoTarea)
  })
  // rellenar aquí
  return nuevoBoton;
};

const agregarNodoTarea = (nodoLista, tarea, nodoInput) => {
  
  const nodoContenedor = document.createElement('div');
  const { texto }= tarea;

  const nodoTarea = document.createElement('a')
  nodoTarea.innerText = `-${texto}`
  nodoTarea.className = 'tarea'
  nodoContenedor.appendChild(nodoTarea)
  const nodoBotonMarcar = crearBotonMarcar(nodoTarea)
  const nodoBotonRemover = crearBotonRemover(nodoLista, nodoContenedor)
  nodoContenedor.appendChild(nodoBotonMarcar)
  nodoContenedor.appendChild(nodoBotonRemover)
  nodoLista.insertBefore(nodoContenedor,nodoInput)
};

const crearInputDeTareas = (nodoLista) => {
  const nodoContenedor = document.createElement('div');
  const nodoTexto = document.createTextNode('Nueva Tarea');
  const nodoInput = document.createElement('input')

  // rellenar aquí
  nodoContenedor.appendChild(nodoTexto)
  nodoContenedor.appendChild(nodoInput)
  // Agregamos un evento de tecla oprimida o 'keydown'
  nodoInput.addEventListener('keydown', (evento) => {
    const codigo_tecla = evento.keyCode;
    const valor_texto = evento.target.value;
    // codigo_tecla contiene un código de la tecla apretada
    // valor_texto contiene el valor dentro del input al oprimir la tecla
    if (codigo_tecla === 13) { // el código 13 es para la tecla enter
      
      const nuevaTarea = {texto:valor_texto, terminado:false};

      agregarNodoTarea(nodoLista,nuevaTarea,nodoContenedor);
    }
});

  return nodoContenedor;
};

const agregarNodoLista = (lista) => { 
  const nodoLista = document.createElement('div');
  nodoLista.className = 'lista'
  // rellenar aquí
  const {titulo } = lista;
  const nodoTitulo = document.createTextNode(titulo)
  nodoLista.appendChild(nodoTitulo)

  const nodoInputTareas = crearInputDeTareas(nodoLista)
  nodoLista.appendChild(nodoInputTareas)
  
  if(lista.tareas.length > 0){
    const {tareas} = lista
    tareas.forEach(tarea => {
      agregarNodoTarea(nodoLista,tarea,nodoInputTareas)
    });
  }
  
  
  contenedor.appendChild(nodoLista);
}

const inputListas = document.getElementById('input-listas');

// Agregamos un evento de tecla oprimida o 'keydown'
inputListas.addEventListener('keydown', (evento) => {
  const codigo_tecla = evento.keyCode;
  const valor_texto = evento.target.value;
  // codigo_tecla contiene un código de la tecla apretada
  // valor_texto contiene el valor dentro del input al oprimir la tecla
  if (codigo_tecla === 13) { // el código 13 es para la tecla enter
    
    const nuevaLista = {titulo: valor_texto, tareas: []};
    agregarNodoLista(nuevaLista);
  }
});




// Creamos un array de listas de tareas inicial
const listas = [
  {
    titulo: 'Exploratorio de computación',
    tareas: [
      {
        texto: 'Hacer práctico de HTML + CSS',
        terminado: true
      },
      {
        texto: 'Ir a clase de JS',
        terminado: true
      },
      {
        texto: 'Hacer práctico de JS',
        terminado: false
      }
    ]
  }
];

// Agregamos cada lista inicial
for (lista of listas) {
  agregarNodoLista(lista);
}
