document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.querySelector('form');

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        const correoRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (nombreCompleto === "" || mensaje === '' || correo === '') {
            alert('Por favor, completa todos los campos obligatorios. (Nombre, Correo y Mensaje)');
            return;
        }

        if (nombreCompleto.length > 100) {
            alert('El nombre excede los 100 caracteres máximos');
            return;
        }

        if (correo.length > 100) {
            alert('El correo excede los 100 caracteres máximos');
            return;
        }
        
        if (mensaje.length > 500) {
            alert('El mensaje excede los 500 caracteres máximos');
            return;
        }

        if (!correoRegex.test(correo)) {
            alert('El correo electrónico debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
            return;
        }

        const datosContacto = {
            id: Date.now(),
            nombre: nombreCompleto,
            email: correo,
            mensaje: mensaje,
            fechaEnvio: new Date().toLocaleString()
        };

        // Obtiene la lista de mensajes existente o crea una nueva
        let mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
        
        // Agrega el nuevo mensaje a la lista
        mensajes.push(datosContacto);

        // Guarda la lista actualizada en localStorage
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));

        alert('Mensaje enviado y datos guardados. ¡Gracias por contactarnos!');
        formContacto.reset();
    });
});