
const nombre = document.getElementById("name")
const direccion = document.getElementById("direccion")
const comuna = document.getElementById("comuna")
const comunaFilter = document.getElementById("filterComuna")
const tableContainer = document.getElementById('table-container');
const btn =  document.getElementById("btnAdd")
const container = document.getElementById("containerAdd")
const btnFilter =  document.getElementById("btnFilter")
const mensaje =  document.getElementById("mensajes")

const Persona = function(nombre, direccion, comuna){
    this.nombre = nombre
    this.direccion = direccion
    this.comuna = comuna
}

var listaPersonas = []
limpiarLocalStorage()
cargarApi()

function actualizarLocalStorage(){
    localStorage.setItem('listaPersonas', JSON.stringify(listaPersonas));
}

function obtenerListaPersonas(){
    listaPersonas = JSON.parse(localStorage.getItem('listaPersonas'));
}

function limpiarLocalStorage(){
    localStorage.clear();
}

function filtrarComuna(){
  if (comunaFilter.value == "")
    {
        //alert("Datos incorrectos. ")
        mensaje.innerText="Datos incorrectos"
        showToastError(mensaje.innerText);
        return 
    }   

    obtenerListaPersonas()
    let resultado = listaPersonas.filter((x)=>x.comuna.toUpperCase().includes(comunaFilter.value.toUpperCase()))

    if (resultado.length > 0)
    {
        console.table(resultado)
    }
    else{
        //alert("No se encontraron personas en la comuna ingresada: " + filterComuna.value)
        LimpiarTabla()
        mensaje.innerText="No se encontraron personas en la comuna ingresada: " + comunaFilter.value
        showToastAlert(mensaje.innerText);
        return
    }
    Imprimir(resultado)
}

function agregarPersona(){
    
    if (nombre.value == "" || direccion.value == "" || comuna.value == "")
    {
        //alert("Datos incorrectos. ")
        mensaje.innerText="Datos incorrectos"
        showToastError(mensaje.innerText);
        return 
    }   

    let persona = new Persona(nombre.value, direccion.value, comuna.value)

    if (listaPersonas.some((x)=>x.nombre.trim().toUpperCase() === persona.nombre.trim().toUpperCase()))
    {
        //alert("el nombre ya existe")
        mensaje.innerText="el nombre ya existe"
        showToastAlert("el nombre ya existe!");
        return
    }

    listaPersonas.push(persona)
    actualizarLocalStorage()
    console.table(listaPersonas)
    showToastInfo("Registro guardado!");

    return true
}

function Imprimir(data){
    // Obtener el elemento div donde se mostrará el arreglo
    if (data == null)
    {
        obtenerListaPersonas()
        data = listaPersonas
    }
    LimpiarTabla()
    const table = createTableFromData(data)
    tableContainer.appendChild(table);
}

function LimpiarTabla(){
    tableContainer.innerHTML = '';
    mensaje.innerHTML = '';
}


btn.addEventListener("click", ()=>{
    if (agregarPersona())
    { 
        crearTarjeta(container)
        //alert("registro ingresado.")
        mensaje.innerText="registro ingresado."
    }
})

btnFilter.addEventListener("click", ()=>{
    filtrarComuna()
})

function crearTarjeta(container){
    const tarjeta =  document.createElement("div")
    tarjeta.innerHTML= `
    <br>
    <h2>${nombre.value}</h2>
    <p>${direccion.value}</p>
    <p>${comuna.value}</p>
    `
    container.innerHTML = '';
    container.appendChild(tarjeta)
}

/********Captura clic ******** */
const triggerTabList = document.querySelectorAll('#pills button')
triggerTabList.forEach(triggerEl => {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', event => {
    event.preventDefault()
    tabTrigger.show()
})
})

function createTableFromData(data) {
    const table = document.createElement('table');
  
    const headerRow = document.createElement('tr');
  
    const keys = Object.keys(data[0]);
  
    keys.forEach(key => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
  
    table.appendChild(headerRow);
  
    data.forEach(item => {
      const row = document.createElement('tr');
  
      keys.forEach(key => {
        const td = document.createElement('td');
        td.textContent = item[key];
        row.appendChild(td);
      });
      table.appendChild(row);
    });
   return table;
  }

  function cargarApi(){
    // Emulando API
    fetch('https://raw.githubusercontent.com/devjosilva/javascript49855_proyectofinal/master/api/db.json')
      .then(response => {
        // Verificar si la respuesta es exitosa (código de estado 200)
        if (!response.ok) {
          throw new Error(`Error de red - Código de estado: ${response.status}`);
        }
        // Parsear la respuesta como JSON
        return response.json();
      })
      .then(data => {
        // Manejar los datos JSON aquí
        console.log('Datos recibidos:', data);

        data.posts.forEach(persona => {
          listaPersonas.push(new Persona(persona.nombre, persona.direccion, persona.comuna))
          actualizarLocalStorage()
        });
      })
      .catch(error => {
        // Manejar errores de red o de la solicitud
        console.error('Error en la solicitud:', error);
      });
  }
  

  function showToastInfo(mensaje) {
    showToast(mensaje,"blue")
  } 

  function showToastAlert(mensaje) {
    showToast(mensaje,"yellow")
  } 

  function showToastError(mensaje) {
    showToast(mensaje,"red")
  } 

 function showToast(mensaje, color) {
    Toastify({
        text:mensaje,
        duration: 1000,  // Duración en milisegundos
        close: true,
        gravity: "center",  // Puedes usar "top", "bottom", "left", "right"
        position: 'center',  // Puedes usar 'left', 'center', or 'right'
        backgroundColor: color,
        offset: {
            x: 0, 
            y: 10 
        },
        style: {
            color:"black",
            fontWeight: "bold"  // Hacer el texto en negrita
        }
    }).showToast();
}