document.addEventListener('DOMContentLoaded', () => {

    const formRegistro = document.querySelector('form');
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

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

    function llenarRegiones() {
        const opcionDefaultRegion = document.createElement('option');
        opcionDefaultRegion.textContent = "-- Seleccione la región --";
        opcionDefaultRegion.value = "";
        selectRegion.appendChild(opcionDefaultRegion);

        for (const region in regionesYComunas) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        }
    }

    function llenarComunas(regionSeleccionada) {
        selectComuna.innerHTML = '';
        const opcionDefaultComuna = document.createElement('option');
        opcionDefaultComuna.textContent = "-- Seleccione la comuna --";
        opcionDefaultComuna.value = "";
        selectComuna.appendChild(opcionDefaultComuna);

        if (regionSeleccionada && regionesYComunas[regionSeleccionada]) {
            regionesYComunas[regionSeleccionada].forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                selectComuna.appendChild(option);
            });
        }
    }

    llenarRegiones();
    llenarComunas();

    selectRegion.addEventListener('change', (e) => {
        llenarComunas(e.target.value);
    });

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombreCompleto').value.trim();
        const rut = document.getElementById('rut').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const confirmarCorreo = document.getElementById('confirmarCorreo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const confirmarContrasena = document.getElementById('confirmarContrasena').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const region = document.getElementById('region').value;
        const comuna = document.getElementById('comuna').value;

        const correoRegex = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        const direccionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+\s+\d+$/; 
        const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}\-[\dkK]$/;

        // Validaciones de campos vacíos
        if (nombre === '' || rut === '' || correo === '' || confirmarCorreo === '' || contrasena === '' || confirmarContrasena === '' || direccion === '') {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Validación de RUT simplificada
        if (!rutRegex.test(rut)) {
            alert('El RUT ingresado no es válido. Utiliza el formato xx.xxx.xxx-k.');
            return;
        }

        // Validación de dirección
        if (!direccionRegex.test(direccion)) {
            alert('La dirección debe tener el formato "nombre de la calle número".');
            return;
        }

        // Resto de las validaciones
        if (correo !== confirmarCorreo) {
            alert('El correo y la confirmación de correo no coinciden.');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            alert('La contraseña y la confirmación de contraseña no coinciden.');
            return;
        }

        if (contrasena.length < 4 || contrasena.length > 10) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
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

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioExistente = usuarios.find(user => user.correo === correo);
        if (usuarioExistente) {
            alert('Este correo ya está registrado.');
            return;
        }

        const nuevoUsuario = {
            nombre,
            rut,
            correo,
            contrasena,
            direccion,
            telefono,
            region,
            comuna
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Redirecciona según la página actual
        if (window.location.pathname.endsWith('admin-registro.html')) {
            alert('¡Usuario creado exitosamente!');
            window.location.href = 'admin.html';
        } else {
            alert('¡Registro exitoso! Ya puedes iniciar sesión.');
            window.location.href = 'login.html';
        }
    });
});