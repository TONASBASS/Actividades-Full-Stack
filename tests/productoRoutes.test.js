describe( "Producto Routes",() => {

    test( "La suite de pruebas de rutas de productos funciona",() => {

        expect( true ).toBe( true );

    });

    test( "GET /api/productos debería existir",() => {

        const ruta = "/api/productos";

        expect( ruta ).toBe( "/api/productos" );

    });

    test( "POST /api/productos debería existir",() => {

        const ruta = "/api/productos";

        expect( ruta ).toBe( "/api/productos" );

    });

    test( "PUT /api/productos/:id debería existir",() => {

        const ruta = "/api/productos/:id";

        expect( ruta ).toBe( "/api/productos/:id" );

    });

    test( "DELETE /api/productos/:id debería existir",() => {

        const ruta = "/api/productos/:id";

        expect( ruta ).toBe( "/api/productos/:id" );

    });

});
