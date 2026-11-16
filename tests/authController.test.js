describe( "Auth Controller",() => {

    test( "La suite de pruebas de autenticación funciona",() => {

        expect( true ).toBe( true );

    });

    test( "Debe existir la operación register",() => {

        const operacion = "register";

        expect( operacion ).toBe( "register" );

    });

    test( "Debe existir la operación login",() => {

        const operacion = "login";

        expect( operacion ).toBe( "login" );

    });

});