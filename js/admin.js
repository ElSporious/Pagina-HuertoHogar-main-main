document.addEventListener('DOMContentLoaded', () => {

    const alternarBoton = document.getElementById('alternar_menu');
    const barraLateral = document.getElementById('barra_lateral');
    const contenidoPrincipal = document.getElementById('contenido_principal');

    // Botones del menú
    const btnInicio = document.getElementById('btn-inicio');
    const btnUsuarios = document.getElementById('btn-usuarios');

    // Secciones de contenido
    const seccionInicio = document.getElementById('seccion_inicio');
    const contenedorUsuarios = document.getElementById('contenedor_usuarios');
    
    // Objeto con las regiones y comunas
    const regionesYComunas = {
        "Región Metropolitana de Santiago": [
            "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central",
            "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja",
            "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo",
            "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda",
            "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal",
            "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón",
            "Santiago", "Vitacura", "Colina", "Lampa", "Tiltil", "Puente Alto",
            "San José de Maipo", "Pirque", "San Bernardo", "Calera de Tango", "Buin",
            "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro",
            "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
        ],
        "Región de Valparaíso": [
            "Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví",
            "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga",
            "Rinconada", "San Esteban", "Cabildo", "La Ligua", "Papudo",
            "Petorca", "Zapallar", "Quillota", "Hijuelas", "La Calera",
            "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena",
            "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu",
            "Llay-Llay", "Panquehue", "Putaendo", "Santa María", "Limache",
            "Olmué", "Quilpué", "Villa Alemana"
        ],
        "Región de O'Higgins": [
            "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros",
            "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar",
            "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rancagua", "Rengo",
            "Requínoa", "San Vicente de Tagua Tagua", "La Estrella", "Litueche", "Marchihue",
            "Navidad", "Paredones", "Pichilemu", "San Fernando", "Chépica",
            "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo",
            "Placilla", "Pumanque", "Santa Cruz"
        ],
        "Región de Ñuble": [
            "Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco",
            "Pinto", "Quillón", "San Ignacio", "Yungay", "San Carlos",
            "Coihueco", "Ñiquén", "San Fabián", "San Nicolás", "Quirihue",
            "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil",
            "Treguaco"
        ],
        "Región de La Araucanía": [
            "Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue",
            "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche",
            "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén",
            "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún",
            "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla",
            "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico",
            "Traiguén", "Victoria"
        ],
        "Región del Bío Bío": [
            "Chiguayante", "Concepción", "Coronel", "Florida", "Hualpén",
            "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana",
            "Talcahuano", "Tomé", "Arauco", "Cañete", "Contulmo",
            "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Alto Biobío",
            "Antuco", "Cabrero", "Laja", "Los Ángeles", "Mulchén",
            "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo",
            "Santa Bárbara", "Tucapel", "Yumbel"
        ],
        "Región de Los Lagos": [
            "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar",
            "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Ancud",
            "Castro", "Chaitén", "Chonchi", "Curaco de Vélez", "Dalcahue",
            "Futaleufú", "Hualaihué", "Palena", "Puqueldón", "Queilén",
            "Quemchi", "Quellón", "Quinchao", "Osorno", "Puerto Octay",
            "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo"
        ]
    };

    // Alternar la barra lateral
    alternarBoton.addEventListener('click', () => {
        barraLateral.classList.toggle('colapsada');
        contenidoPrincipal.classList.toggle('expandido');
    });

    // Función para mostrar la sección de inicio
    btnInicio.addEventListener('click', (e) => {
        e.preventDefault();
        ocultarSecciones();
        seccionInicio.classList.remove('d-none');
    });

    // Función para mostrar la sección de usuarios
    btnUsuarios.addEventListener('click', (e) => {
        e.preventDefault();
        ocultarSecciones();
        contenedorUsuarios.classList.remove('d-none');
        mostrarUsuarios();
    });

    // Oculta todas las secciones
    function ocultarSecciones() {
        seccionInicio.classList.add('d-none');
        contenedorUsuarios.classList.add('d-none');
    }

    // Función para mostrar la tabla de usuarios
    function mostrarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        let htmlContenido = `
            <h5 class="titulo">Gestión de Usuarios</h5>
            <div class="d-flex justify-content-end mb-3">
                <a href="admin-registro.html" class="btn btn-success">Nuevo Usuario</a>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RUT</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>Región</th>
                        <th>Comuna</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        if (usuarios.length > 0) {
            usuarios.forEach((usuario, index) => {
                htmlContenido += `
                    <tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.rut}</td>
                        <td>${usuario.correo}</td>
                        <td>${usuario.direccion}</td>
                        <td>${usuario.region}</td>
                        <td>${usuario.comuna}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-editar-usuario" data-index="${index}">Editar</button>
                            <button class="btn btn-danger btn-sm btn-eliminar-usuario" data-index="${index}">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } else {
            htmlContenido += `
                <tr>
                    <td colspan="7" class="text-center">No hay usuarios registrados.</td>
                </tr>
            `;
        }

        htmlContenido += `
                </tbody>
            </table>
        `;
        
        contenedorUsuarios.innerHTML = htmlContenido;

        // Añadir event listeners para los botones de la tabla
        const botonesEliminar = document.querySelectorAll('.btn-eliminar-usuario');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                eliminarUsuario(index);
            });
        });
        
        const botonesEditar = document.querySelectorAll('.btn-editar-usuario');
        botonesEditar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cargarFormularioEdicion(index);
            });
        });
    }

    // NUEVA FUNCIÓN: Carga el formulario de edición
    function cargarFormularioEdicion(index) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioAEditar = usuarios[index];
    
        // Genera el HTML del formulario de registro con los valores del usuario
        let htmlFormulario = `
            <h5 class="titulo">Editar Usuario</h5>
            <form id="form-editar-usuario">
                <input type="hidden" id="usuario-index" value="${index}">
                <div class="mb-3">
                    <label for="nombreCompleto" class="form-label">NOMBRE COMPLETO</label>
                    <input type="text" class="form-control" id="nombreCompleto" value="${usuarioAEditar.nombre}">
                </div>
                <div class="mb-3">
                    <label for="rut" class="form-label">RUT</label>
                    <input type="text" class="form-control" id="rut" value="${usuarioAEditar.rut}" disabled>
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">CORREO</label>
                    <input type="email" class="form-control" id="correo" value="${usuarioAEditar.correo}">
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">DIRECCIÓN</label>
                    <input type="text" class="form-control" id="direccion" value="${usuarioAEditar.direccion}">
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">TELÉFONO (opcional)</label>
                    <input type="tel" class="form-control" id="telefono" value="${usuarioAEditar.telefono}">
                </div>
                <div class="row mb-4">
                    <div class="col-6">
                        <label for="region" class="form-label">Región</label>
                        <select class="form-select" id="region"></select>
                    </div>
                    <div class="col-6">
                        <label for="comuna" class="form-label">Comuna</label>
                        <select class="form-select" id="comuna"></select>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-warning">Guardar Cambios</button>
                    <button type="button" id="btn-cancelar-edicion" class="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        `;
        
        contenedorUsuarios.innerHTML = htmlFormulario;

        // Inicializa el formulario de edición
        const selectRegion = document.getElementById('region');
        const selectComuna = document.getElementById('comuna');
        const formEditarUsuario = document.getElementById('form-editar-usuario');
        const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
        
        // Llena los select con las regiones y comunas
        llenarRegiones(selectRegion, usuarioAEditar.region);
        llenarComunas(usuarioAEditar.region, selectComuna, usuarioAEditar.comuna);
    
        selectRegion.addEventListener('change', (e) => {
            llenarComunas(e.target.value, selectComuna);
        });
    
        formEditarUsuario.addEventListener('submit', manejarEdicion);
        btnCancelarEdicion.addEventListener('click', mostrarUsuarios);
    }

    // NUEVA FUNCIÓN: Maneja el envío del formulario de edición
    function manejarEdicion(e) {
        e.preventDefault();
        
        const form = e.target;
        const index = form.querySelector('#usuario-index').value;
        const nombre = form.querySelector('#nombreCompleto').value.trim();
        const correo = form.querySelector('#correo').value.trim();
        const direccion = form.querySelector('#direccion').value.trim();
        const telefono = form.querySelector('#telefono').value.trim();
        const region = form.querySelector('#region').value;
        const comuna = form.querySelector('#comuna').value;
    
        const correoRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        const direccionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+\s+\d+$/; 
        
        // Validaciones (similares a las de registro)
        if (nombre === '' || correo === '' || direccion === '') {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (!direccionRegex.test(direccion)) {
            alert('La dirección debe tener el formato "nombre de la calle número".');
            return;
        }
    
        if (correo.length > 100){
            alert('El correo no puede superar los 100 caracteres');
            return;
        }
    
        if (!correoRegex.test(correo)) {
            alert('El correo electrónico debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com');
            return;
        }
    
        if (region === "" || comuna === "") {
            alert('Por favor, selecciona una región y una comuna.');
            return;
        }
    
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
        // Actualiza los datos del usuario en el array
        usuarios[index].nombre = nombre;
        usuarios[index].correo = correo;
        usuarios[index].direccion = direccion;
        usuarios[index].telefono = telefono;
        usuarios[index].region = region;
        usuarios[index].comuna = comuna;
    
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
        alert('Usuario actualizado exitosamente.');
        mostrarUsuarios(); // Vuelve a la tabla después de guardar
    }

    // Funciones para llenar los select de región y comuna
    function llenarRegiones(selectElement, valorSeleccionado = '') {
        selectElement.innerHTML = '';
        const opcionDefaultRegion = document.createElement('option');
        opcionDefaultRegion.textContent = "-- Seleccione la región --";
        opcionDefaultRegion.value = "";
        selectElement.appendChild(opcionDefaultRegion);
    
        for (const region in regionesYComunas) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            if (region === valorSeleccionado) {
                option.selected = true;
            }
            selectElement.appendChild(option);
        }
    }
    
    function llenarComunas(regionSeleccionada, selectElement, valorSeleccionado = '') {
        selectElement.innerHTML = '';
        const opcionDefaultComuna = document.createElement('option');
        opcionDefaultComuna.textContent = "-- Seleccione la comuna --";
        opcionDefaultComuna.value = "";
        selectElement.appendChild(opcionDefaultComuna);
    
        if (regionSeleccionada && regionesYComunas[regionSeleccionada]) {
            regionesYComunas[regionSeleccionada].forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                if (comuna === valorSeleccionado) {
                    option.selected = true;
                }
                selectElement.appendChild(option);
            });
        }
    }

    // Función para eliminar un usuario
    function eliminarUsuario(index) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (confirm(`¿Estás seguro de que deseas eliminar a ${usuarios[index].nombre}?`)) {
            usuarios.splice(index, 1);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Usuario eliminado correctamente.');
            mostrarUsuarios(); // Volver a renderizar la tabla
        }
    }

    // Muestra la vista de usuarios por defecto
    mostrarUsuarios();
});