// Archivo: js/admin.js

import { productosIniciales } from './data.js';

// Listas de datos
let productos = [];
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

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const alternarBoton = document.getElementById('alternar_menu');
    const barraLateral = document.getElementById('barra_lateral');
    const contenidoPrincipal = document.getElementById('contenido_principal');

    const btnInicio = document.getElementById('btn-inicio');
    const btnUsuarios = document.getElementById('btn-usuarios');
    const btnInventario = document.getElementById('btn-inventario');
    const btnMensajes = document.getElementById('btn-mensajes');
    const btnPedidos = document.getElementById('btn-pedidos');

    const seccionInicio = document.getElementById('seccion_inicio');
    const contenedorUsuarios = document.getElementById('contenedor_usuarios');
    const contenedorInventario = document.getElementById('contenedor_inventario');
    const contenedorMensajes = document.getElementById('contenedor_mensajes');
    const contenedorPedidos = document.getElementById('contenedor_pedidos');

    const vistaInventarioPrincipal = document.getElementById('vista_inventario_principal');
    const contenedorEditarProducto = document.getElementById('contenedor_editar_producto');
    
    // Inicializar la aplicación
    inicializarProductos();
    inicializarPedidos();
    
    // Asignar eventos a los botones de navegación
    alternarBoton.addEventListener('click', () => {
        barraLateral.classList.toggle('colapsada');
        contenidoPrincipal.classList.toggle('expandido');
    });

    btnInicio.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion(seccionInicio);
    });

    btnUsuarios.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion(contenedorUsuarios);
        mostrarUsuarios();
    });

    btnInventario.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion(contenedorInventario);
        cambiarVistaInventario('principal');
        listarProductos();
    });

    btnMensajes.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion(contenedorMensajes);
        mostrarMensajes();
    });

    btnPedidos.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion(contenedorPedidos);
        mostrarPedidos();
    });

    // Oculta todas las secciones
    function mostrarSeccion(seccionActiva) {
        document.querySelectorAll('.contenido').forEach(seccion => {
            seccion.classList.add('d-none');
        });
        seccionActiva.classList.remove('d-none');
    }

    // Funciones para gestión de Inventario
    // ------------------------------------
    function inicializarProductos() {
        const productosGuardados = localStorage.getItem('productos');
        if (!productosGuardados) {
            localStorage.setItem('productos', JSON.stringify(productosIniciales));
            productos = productosIniciales;
        } else {
            productos = JSON.parse(productosGuardados);
        }
    }

    function cambiarVistaInventario(vista) {
        if (vista === 'principal') {
            vistaInventarioPrincipal.classList.remove('d-none');
            contenedorEditarProducto.classList.add('d-none');
        } else if (vista === 'editar') {
            vistaInventarioPrincipal.classList.add('d-none');
            contenedorEditarProducto.classList.remove('d-none');
        }
    }

    function listarProductos() {
        const productTableBody = document.getElementById('product-table-body');
        if (!productTableBody) return;
        
        productTableBody.innerHTML = '';
        const productos = JSON.parse(localStorage.getItem('productos')) || [];

        if (productos.length === 0) {
            productTableBody.innerHTML = '<tr><td colspan="7" class="text-center">No hay productos en el inventario.</td></tr>';
            return;
        }
        
        productos.forEach((producto) => {
            let stockClase = '';
            if (producto.stockCritico !== null && producto.stock <= producto.stockCritico) {
                stockClase = 'text-danger fw-bold';
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="img/${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;"></td>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toLocaleString('es-CL')}</td>
                <td><span class="${stockClase}">${producto.stock}</span></td>
                <td>${producto.categoria}</td>
                <td>
                    <button data-id="${producto.id}">Editar</button>
                    <button data-id="${producto.id}">Eliminar</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Añadir los event listeners DESPUÉS de que los botones se han creado
        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                editarProducto(id);
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                eliminarProducto(id);
            });
        });
    }

    // AÑADE ESTA FUNCIÓN AL ARCHIVO
    function guardarProducto(e) {
        e.preventDefault();

        const form = e.target;
        const idProducto = form.querySelector('#idProducto')?.value.trim() || form.querySelector('#producto-id')?.value;
        const nombre = form.querySelector('#nombre')?.value.trim() || form.querySelector('#edit-nombre')?.value.trim();
        const descripcion = form.querySelector('#descripcion')?.value.trim() || form.querySelector('#edit-descripcion')?.value.trim();
        const precio = parseFloat(form.querySelector('#precio')?.value || form.querySelector('#edit-precio')?.value);
        const stock = parseInt(form.querySelector('#stock')?.value, 10) || parseInt(form.querySelector('#edit-stock')?.value, 10);
        const stockCriticoInput = form.querySelector('#stockCritico') || form.querySelector('#edit-stockCritico');
        const stockCritico = stockCriticoInput?.value ? parseInt(stockCriticoInput.value, 10) : null;
        const imagen = form.querySelector('#imagen')?.value.trim() || form.querySelector('#edit-imagen')?.value.trim();
        const categoria = form.querySelector('#categoria')?.value || form.querySelector('#edit-categoria')?.value;

        // Validaciones
        if (!idProducto || !nombre || !descripcion || !categoria || isNaN(precio) || isNaN(stock) || precio < 0 || stock < 0 || (stockCriticoInput?.value && isNaN(stockCritico) || stockCritico < 0)) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        if (idProducto.length < 3) {
            alert("El código del producto debe tener al menos 3 caracteres.");
            return;
        }
        if (nombre.length > 100) {
            alert("El nombre no puede exceder los 100 caracteres.");
            return;
        }
        if (descripcion.length > 500) {
            alert("La descripción no puede exceder los 500 caracteres.");
            return;
        }

        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const indiceProducto = productos.findIndex(p => p.id === idProducto);

        if (indiceProducto !== -1) {
            // Edición de producto existente
            productos[indiceProducto] = {
                id: idProducto,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                stockCritico: stockCritico,
                imagen: imagen,
                categoria: categoria
            };
            alert("Producto actualizado exitosamente.");
        } else {
            // Creación de nuevo producto
            const idExistente = productos.find(p => p.id === idProducto);
            if (idExistente) {
                alert('Ya existe un producto con este ID. Por favor, ingrese uno diferente.');
                return;
            }
            productos.push({
                id: idProducto,
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                stockCritico: stockCritico,
                imagen: imagen,
                categoria: categoria
            });
            alert("Producto agregado exitosamente.");
        }

        localStorage.setItem('productos', JSON.stringify(productos));
        form.reset();
        cambiarVistaInventario('principal');
        listarProductos();
    }
    
    // Función para editar
    function editarProducto(id) {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const productoAEditar = productos.find(p => p.id === id);
        if (!productoAEditar) return;
        
        cambiarVistaInventario('editar');
        const formContainer = document.getElementById('product-edit-form-container');
        
        formContainer.innerHTML = `
            <div class="card-body">
                <form id="product-edit-form">
                    <input type="hidden" id="producto-id" value="${productoAEditar.id}">
                    <div class="mb-3">
                        <label for="edit-id" class="form-label">Código producto</label>
                        <input type="text" class="form-control" id="edit-id" value="${productoAEditar.id}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="edit-nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="edit-nombre" value="${productoAEditar.nombre}" maxlength="100" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit-descripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="edit-descripcion" rows="2" maxlength="500">${productoAEditar.descripcion}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="edit-precio" class="form-label">Precio (CLP)</label>
                        <input type="number" class="form-control" id="edit-precio" value="${productoAEditar.precio}" min="0" step="0.01" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit-stock" class="form-label">Stock</label>
                        <input type="number" class="form-control" id="edit-stock" value="${productoAEditar.stock}" min="0" step="1" required>
                    </div>
                    <div class="mb-3">
                        <label for="edit-stockCritico" class="form-label">Stock Crítico (Opcional)</label>
                        <input type="number" class="form-control" id="edit-stockCritico" value="${productoAEditar.stockCritico !== null ? productoAEditar.stockCritico : ''}" min="0" step="1">
                    </div>
                    <div class="mb-3">
                        <label for="edit-imagen" class="form-label">Nombre de la Imagen</label>
                        <input type="text" class="form-control" id="edit-imagen" value="${productoAEditar.imagen}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-categoria" class="form-label">Categoría</label>
                        <select class="form-select" id="edit-categoria" required>
                            <option value="Frutas">Frutas</option>
                            <option value="Verdura Organicas">Verdura Orgánicas</option>
                            <option value="Productos Organicos">Productos Orgánicos</option>
                            <option value="Productos Lacteos">Productos Lácteos</option>
                        </select>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-warning">Guardar Cambios</button>
                        <button type="button" id="btn-cancelar-edicion-producto" class="btn btn-secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('edit-categoria').value = productoAEditar.categoria;

        document.getElementById('product-edit-form').addEventListener('submit', guardarProducto);
        document.getElementById('btn-cancelar-edicion-producto').addEventListener('click', () => {
            cambiarVistaInventario('principal');
            listarProductos();
        });
    }
    
    // Función para eliminar
    function eliminarProducto(id) {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const productoAEliminar = productos.find(p => p.id === id);

        if (!productoAEliminar) {
            alert("Producto no encontrado.");
            return;
        }
        
        if (confirm(`¿Estás seguro de que deseas eliminar el producto: ${productoAEliminar.nombre}?`)) {
            const nuevosProductos = productos.filter(p => p.id !== id);
            localStorage.setItem('productos', JSON.stringify(nuevosProductos));
            alert('Producto eliminado correctamente.');
            listarProductos();
        }
    }
    
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', guardarProducto);
    }
    
    // Funciones para gestión de Usuarios
    // ------------------------------------
    function mostrarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        let htmlContenido = `
            <h5 class="titulo">Gestión de Usuarios</h5>
            <div class="d-flex justify-content-end mb-3">
                <a href="admin-registro.html" class="btn btn-success">Nuevo Usuario</a>
            </div>
            <div class="table-responsive">
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
                            <button data-index="${index}">Editar</button>
                            <button data-index="${index}">Eliminar</button>
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
            </div>
        `;
        
        contenedorUsuarios.innerHTML = htmlContenido;
        
        document.querySelectorAll('.btn-eliminar-usuario').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                eliminarUsuario(index);
            });
        });
        
        document.querySelectorAll('.btn-editar-usuario').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cargarFormularioEdicionUsuario(index);
            });
        });
    }

    function cargarFormularioEdicionUsuario(index) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioAEditar = usuarios[index];
    
        let htmlFormulario = `
            <h5 class="titulo">Editar Usuario</h5>
            <div class="card p-3">
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
            </div>
        `;
        
        contenedorUsuarios.innerHTML = htmlFormulario;

        const selectRegion = document.getElementById('region');
        const selectComuna = document.getElementById('comuna');
        const formEditarUsuario = document.getElementById('form-editar-usuario');
        const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
        
        llenarRegiones(selectRegion, usuarioAEditar.region);
        llenarComunas(usuarioAEditar.region, selectComuna, usuarioAEditar.comuna);
    
        selectRegion.addEventListener('change', (e) => {
            llenarComunas(e.target.value, selectComuna);
        });
    
        formEditarUsuario.addEventListener('submit', manejarEdicionUsuario);
        btnCancelarEdicion.addEventListener('click', mostrarUsuarios);
    }

    function manejarEdicionUsuario(e) {
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
    
        usuarios[index].nombre = nombre;
        usuarios[index].correo = correo;
        usuarios[index].direccion = direccion;
        usuarios[index].telefono = telefono;
        usuarios[index].region = region;
        usuarios[index].comuna = comuna;
    
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
        alert('Usuario actualizado exitosamente.');
        mostrarUsuarios();
    }

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

    function eliminarUsuario(index) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (confirm(`¿Estás seguro de que deseas eliminar a ${usuarios[index].nombre}?`)) {
            usuarios.splice(index, 1);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Usuario eliminado correctamente.');
            mostrarUsuarios();
        }
    }
    
    // Funciones para gestión de Mensajes de Contacto
    function mostrarMensajes() {
        const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
        const mensajesTableBody = document.getElementById('mensajes-table-body');
        
        if (!mensajesTableBody) return;

        mensajesTableBody.innerHTML = '';

        if (mensajes.length === 0) {
            mensajesTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay mensajes de contacto.</td></tr>';
            return;
        }

        mensajes.forEach(mensaje => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mensaje.id}</td>
                <td>${mensaje.nombre}</td>
                <td>${mensaje.email}</td>
                <td>${mensaje.mensaje}</td>
                <td>${mensaje.fechaEnvio}</td>
            `;
            mensajesTableBody.appendChild(row);
        });
    }

    
    // Funciones para gestión de Pedidos
    // ------------------------------------
    function inicializarPedidos() {
        const pedidosGuardados = localStorage.getItem('pedidos');
        if (!pedidosGuardados) {
            // Datos de prueba para pedidos

        }
    }

    

    // Al cargar la página, mostrar la sección de inicio por defecto
    mostrarSeccion(seccionInicio);
});