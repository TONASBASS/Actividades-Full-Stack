const API_URL = "/api/productos";

const token = localStorage.getItem( "token" );

if ( !token ) {

    window.location.href = "login.html";

}

const formProducto = document.getElementById( "formProducto" );

const contenedorProductos = document.getElementById( "contenedorProductos" );

const mensajeError = document.getElementById( "mensajeError" );

const btnLogout = document.getElementById( "btnLogout" );

// =========================
// LOGOUT
// =========================

btnLogout.addEventListener( "click",() => {

    localStorage.removeItem( "token" );

    window.location.href = "login.html";

});

// =========================
// OBTENER PRODUCTOS
// =========================

const cargarProductos = async () => {

    try {

        const respuesta = await fetch(

            API_URL,

            {

                headers:{

                    Authorization:token

                }

            }

        );

        const productos = await respuesta.json();

        contenedorProductos.innerHTML = "";

        productos.forEach( producto => {

            const tarjeta = document.createElement( "article" );

            tarjeta.classList.add( "producto-card" );

            tarjeta.innerHTML = `

                <img
                    src="${producto.imagen || 'imagenes/producto-default.png'}"
                    alt="${producto.nombre}"
                    class="producto-imagen"
                >

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <p><strong>Categoría:</strong> ${producto.categoria}</p>

                <p><strong>Precio:</strong> $${producto.precio}</p>

                <p><strong>Stock:</strong> ${producto.stock}</p>

                <div class="acciones">

                    <button onclick="editarProducto('${producto._id}')">

                        Editar

                    </button>

                    <button onclick="eliminarProducto('${producto._id}')">

                        Eliminar

                    </button>

                </div>

            `;

            contenedorProductos.appendChild( tarjeta );

        });

    } catch (error) {

        mensajeError.textContent = "Error al cargar productos.";

    }

};

// =========================
// CREAR O ACTUALIZAR
// =========================

formProducto.addEventListener( "submit",async (event) => {

    event.preventDefault();

    mensajeError.textContent = "";

    const productoId = document.getElementById( "productoId" ).value;

    const producto = {

        nombre:document.getElementById( "nombre" ).value.trim(),

        descripcion:document.getElementById( "descripcion" ).value.trim(),

        categoria:document.getElementById( "categoria" ).value.trim(),

        precio:Number( document.getElementById( "precio" ).value ),

        stock:Number( document.getElementById( "stock" ).value ),

        imagen:document.getElementById( "imagen" ).value.trim()

    };

    try {

        let url = API_URL;

        let metodo = "POST";

        if ( productoId ) {

            url = `${API_URL}/${productoId}`;

            metodo = "PUT";

        }

        const respuesta = await fetch(

            url,

            {

                method:metodo,

                headers:{

                    "Content-Type":"application/json",

                    Authorization:token

                },

                body:JSON.stringify( producto )

            }

        );

        const datos = await respuesta.json();

        if ( !respuesta.ok ) {

            mensajeError.textContent = datos.mensaje;

            return;

        }

        formProducto.reset();

        document.getElementById( "productoId" ).value = "";

        cargarProductos();

    } catch (error) {

        mensajeError.textContent = "Error al guardar el producto.";

    }

});

// =========================
// EDITAR PRODUCTO
// =========================

window.editarProducto = async ( id ) => {

    try {

        const respuesta = await fetch(

            `${API_URL}/${id}`,

            {

                headers:{

                    Authorization:token

                }

            }

        );

        const producto = await respuesta.json();

        document.getElementById( "productoId" ).value = producto._id;

        document.getElementById( "nombre" ).value = producto.nombre;

        document.getElementById( "descripcion" ).value = producto.descripcion;

        document.getElementById( "categoria" ).value = producto.categoria;

        document.getElementById( "precio" ).value = producto.precio;

        document.getElementById( "stock" ).value = producto.stock;

        document.getElementById( "imagen" ).value = producto.imagen;

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    } catch (error) {

        mensajeError.textContent = "Error al cargar el producto.";

    }

};

// =========================
// ELIMINAR PRODUCTO
// =========================

window.eliminarProducto = async ( id ) => {

    const confirmar = confirm( "¿Deseas eliminar este producto?" );

    if ( !confirmar ) {

        return;

    }

    try {

        const respuesta = await fetch(

            `${API_URL}/${id}`,

            {

                method:"DELETE",

                headers:{

                    Authorization:token

                }

            }

        );

        if ( !respuesta.ok ) {

            const datos = await respuesta.json();

            mensajeError.textContent = datos.mensaje;

            return;

        }

        cargarProductos();

    } catch (error) {

        mensajeError.textContent = "Error al eliminar el producto.";

    }

};

// =========================
// INICIALIZACION
// =========================

cargarProductos();