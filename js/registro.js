document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.querySelector('form');

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página

        // Captura de los valores de los campos
        const nombre = document.getElementById('nombreCompleto').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const confirmarCorreo = document.getElementById('confirmarCorreo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const confirmarContrasena = document.getElementById('confirmarContrasena').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const region = document.getElementById('region').value;
        const comuna = document.getElementById('comuna').value;

        // Validación simple
        if (nombre === '' || correo === '' || confirmarCorreo === '' || contrasena === '' || confirmarContrasena === '') {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (correo !== confirmarCorreo) {
            alert('El correo y la confirmación de correo no coinciden.');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            alert('La contraseña y la confirmación de contraseña no coinciden.');
            return;
        }

        // Recuperar usuarios existentes o inicializar un array vacío
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el correo ya existe
        const usuarioExistente = usuarios.find(user => user.correo === correo);
        if (usuarioExistente) {
            alert('Este correo ya está registrado.');
            return;
        }

        // Crear el objeto del nuevo usuario
        const nuevoUsuario = {
            nombre,
            correo,
            contrasena,
            telefono,
            region,
            comuna
        };

        // Agregar el nuevo usuario al array y guardarlo en localStorage
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        formRegistro.reset(); // Limpia el formulario
        window.location.href = 'login.html'; // Redirige a la página de login
    });
});