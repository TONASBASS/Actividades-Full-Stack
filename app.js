// =========================
// CLASE TAREA
// =========================

class Tarea {

    constructor(nombre, estado = false) {
        this.nombre = nombre;
        this.estado = estado;
    }

    editar(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    cambiarEstado() {
        this.estado = !this.estado;
    }
}

// =========================
// CLASE GESTOR DE TAREAS
// =========================

class GestorDeTareas {

    constructor() {
        this.tareas = [];
        this.indiceEdicion = -1;

        this.cargarLocalStorage();
    }

    agregarTarea(nombre) {

        const nuevaTarea = new Tarea(nombre);

        this.tareas.push(nuevaTarea);

        this.guardarLocalStorage();

        this.mostrarTareas();
    }

    editarTarea(indice) {

        const input = document.getElementById("nuevaTarea");

        input.value = this.tareas[indice].nombre;

        this.indiceEdicion = indice;

        input.focus();
    }

    eliminarTarea(indice) {

        this.tareas.splice(indice, 1);

        this.guardarLocalStorage();

        this.mostrarTareas();
    }

    guardarLocalStorage() {

        localStorage.setItem("tareasAutomatiuh",JSON.stringify(this.tareas));
    }

    cargarLocalStorage() {

        const tareasGuardadas = localStorage.getItem("tareasAutomatiuh");

        if (tareasGuardadas) {

            const datos = JSON.parse(tareasGuardadas);

            this.tareas = datos.map(tarea => new Tarea( tarea.nombre,tarea.estado));
        }
    }

    mostrarTareas() {

        const lista = document.getElementById("listaTareas");

        lista.innerHTML = "";

        this.tareas.forEach((tarea, indice) => {

            const elemento = document.createElement("li");

            elemento.innerHTML = `<span>${tarea.nombre}</span>

                <div class="acciones">

                    <button
                        class="btnEditar"
                        data-indice="${indice}">
                        Editar
                    </button>

                    <button
                        class="btnEliminar"
                        data-indice="${indice}">
                        Eliminar
                    </button>

                </div>
            `;

            lista.appendChild(elemento);
        });

        this.activarEventos();
    }

    activarEventos() {

        const botonesEditar = document.querySelectorAll(".btnEditar");

        botonesEditar.forEach(boton => {

            boton.addEventListener("click", () => {

                const indice = boton.dataset.indice;

                this.editarTarea(indice);
            });

        });

        const botonesEliminar = document.querySelectorAll(".btnEliminar");

        botonesEliminar.forEach(boton => {

            boton.addEventListener("click", () => {

                const indice = boton.dataset.indice;

                this.eliminarTarea(indice);
            });

        });
    }
}

// =========================
// INICIALIZACIÓN
// =========================

const gestor = new GestorDeTareas();

gestor.mostrarTareas();

const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", () => {

    const input = document.getElementById("nuevaTarea");

    
    const mensajeError = document.getElementById("mensajeError");

    const texto = input.value.trim();

    if (texto === "") {

        mensajeError.textContent = "Por favor ingresa una tarea válida.";

        return;
    }

    mensajeError.textContent = "";

    // EDITAR
    if (gestor.indiceEdicion >= 0) {

        gestor.tareas[gestor.indiceEdicion].editar(texto);

        gestor.indiceEdicion = -1;

        gestor.guardarLocalStorage();

        gestor.mostrarTareas();
    }
    // AGREGAR
    else {

        gestor.agregarTarea(texto);
    }

    input.value = "";

    input.focus();
});