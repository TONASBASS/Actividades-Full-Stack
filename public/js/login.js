const formLogin = document.getElementById( "formLogin" );

const mensajeError = document.getElementById( "mensajeError" );

formLogin.addEventListener( "submit",async (event) => {

    event.preventDefault();

    mensajeError.textContent = "";

    const email = document.getElementById( "email" ).value.trim();

    const password = document.getElementById( "password" ).value.trim();

    if ( !email || !password ) {

        mensajeError.textContent = "Todos los campos son obligatorios.";

        return;

    }

    try {

        const respuesta = await fetch(

            "/api/auth/login",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    email,
                    password

                })

            }

        );

        const datos = await respuesta.json();

        if ( !respuesta.ok ) {

            mensajeError.textContent = datos.mensaje;

            return;

        }

        localStorage.setItem( "token",datos.token );

        window.location.href = "productos.html";

    } catch (error) {

        mensajeError.textContent = "Error al conectar con el servidor.";

    }

});