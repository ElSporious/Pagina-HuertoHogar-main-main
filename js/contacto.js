document.addEventListener('DOMContentLoaded', () => {


    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    // OJO PERRO FLACO, SE ESTÁ USANDO EL MISMO ID QUE EN REGISTRO,JS (nombreCompleto)
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const correoRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


    if (nombreCompleto === "" || mensaje  === ''){
        alert('Por favor, completa todos los campos obligatorios. (Nombre Completo y Mensaje)');
        return;
    }

    if (nombreCompleto.length > 100){
        alert('El nombre excede los 100 carácteres máximos');
        return;
    }

    if (correo.length > 100){
        alert('El correo excede los 100 carácteres máximos');
        return;
    }

    //if de RegexCorreo
    if (!correoRegex.test(correo)) {
        alert('El correo electrónico debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
        return;
    }


});