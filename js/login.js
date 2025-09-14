document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el formulario completo.
    const formLogin = document.querySelector('form');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        // Selecciona los campos de entrada usando el atributo placeholder.
        const inputCorreo = document.querySelector('input[placeholder="Usuario"]');
        const inputContrasena = document.querySelector('input[placeholder="Contraseña"]');

        const correo = inputCorreo.value.trim();
        const contrasena = inputContrasena.value.trim();

        // **Añade la condición para el administrador aquí**
        if (correo === 'huertohogar@gmail.com' && contrasena === 'admin123') {
            alert('¡Bienvenido, Administrador!');
            window.location.href = 'admin.html'; // Redirige a la página de administrador
            return; // Detiene la ejecución del resto del código
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Busca al usuario en la lista de usuarios guardados
        const usuarioEncontrado = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

        if (usuarioEncontrado) {
            alert(`¡Bienvenido, ${usuarioEncontrado.nombre}! Has iniciado sesión correctamente.`);
            // Redirige al usuario a la página principal después del inicio de sesión
            window.location.href = 'index.html'; 
        } else {
            alert('El correo o la contraseña son incorrectos.');
        }
    });

    // Enlace para crear una nueva cuenta
    const enlaceCrearCuenta = document.getElementById('enlace-registro');
    if (enlaceCrearCuenta) {
        enlaceCrearCuenta.href = 'registro.html';
    }
});