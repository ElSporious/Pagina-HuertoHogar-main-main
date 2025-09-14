document.addEventListener('DOMContentLoaded', () => {

    // Selecciona el formulario completo para escuchar el evento de envío.
    const formLogin = document.querySelector('form');

    formLogin.addEventListener('submit', (e) => {
        // Previene la acción por defecto del formulario (recargar la página).
        e.preventDefault(); 

        // Obtiene los valores de los campos de correo y contraseña por su ID.
        const correo = document.getElementById('correoLogin').value.trim();
        const contrasena = document.getElementById('contrasenaLogin').value.trim();

        // 1. Condición para el administrador.
        if (correo === 'huertohogar@gmail.com' && contrasena === 'admin123') {
            alert('¡Bienvenido, Administrador!');
            window.location.href = 'admin.html'; // Redirige a la página de administrador.
            return; // Detiene la ejecución.
        }

        // 2. Condición para los usuarios registrados.
        // Obtiene la lista de usuarios desde localStorage o un array vacío si no existe.
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Busca si existe un usuario con el correo y la contraseña ingresados.
        const usuarioEncontrado = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

        if (usuarioEncontrado) {
            alert(`¡Bienvenido, ${usuarioEncontrado.nombre}! Has iniciado sesión correctamente.`);
            // Redirige al usuario a la página principal.
            window.location.href = 'index.html'; 
        } else {
            // Muestra un mensaje de error si el usuario no es encontrado.
            alert('El correo o la contraseña son incorrectos.');
        }
    });

    // Enlaza el botón de "Crear una nueva cuenta" a la página de registro.
    const enlaceCrearCuenta = document.getElementById('enlace-registro');
    if (enlaceCrearCuenta) {
        enlaceCrearCuenta.href = 'registro.html';
    }
});