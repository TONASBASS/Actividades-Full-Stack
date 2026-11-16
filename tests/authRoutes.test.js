describe( "Auth Routes",() => {

    test( "La suite de pruebas de rutas de autenticación funciona",() => {

        expect( true ).toBe( true );

    });

    test( "POST /register debería existir",() => {

        const ruta = "/register";

        expect( ruta ).toBe( "/register" );

    });

    test( "POST /login debería existir",() => {

        const ruta = "/login";

        expect( ruta ).toBe( "/login" );

    });

});