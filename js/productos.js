// Lista de productos predefinidos
const productos = [
    { id: 1, nombre: "Manzanas Fuji", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.", precio: 1200, imagen: "Manzana.PNG", categoria:"Frutas"},
    { id: 2, nombre: "Naranjas Valencia", descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes.", precio: 1000, imagen: "Naranjajajajjaja.PNG", categoria:"Frutas" },
    { id: 3, nombre: "Plátanos Cavendish", descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.", precio: 800, imagen: "Banana.png", categoria:"Frutas"},
    { id: 4, nombre: "Zanahorias Orgánicas", descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins.", precio: 900, imagen: "Zanahoria.PNG", categoria:"Verdura Organicas"},
    { id: 5, nombre: "Espinacas Frescas", descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.", precio: 700, imagen: "Espinaca.png", categoria:"Verdura Organicas" },
    { id: 6, nombre: "Pimientos Tricolores ", descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.", precio: 1500, imagen: "Pimenton.PNG", categoria:"Verdura Organicas"},
    { id: 7, nombre: "Miel Orgánica ", descripcion: "Miel pura y orgánica producida por apicultores locales.", precio: 900000, imagen: "Miel.png", categoria:"Productos Organicos"},
    { id: 8, nombre: "Quinua Orgánica ", descripcion: "Quinua andina, un superalimento rico en proteínas, fibra y minerales.", precio: 800, imagen: "Quinoa.png", categoria:"Productos Organicos" },
    { id: 9, nombre: "Leche Entera ", descripcion: "Leche fresca de granjas locales que se dedican a la producción responsable.", precio: 2700, imagen: "Leche.png", categoria:"Productos Lacteos"},
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const productListContainer = document.getElementById('product-list-container');
const cartCountElement = document.getElementById('cart-count');


// Mostrar productos en la página
function mostrarProductos() {
    productListContainer.innerHTML = '';
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-3 mb-4';
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="img/${producto.imagen}" class="card-img-top tamano_img" alt="${producto.nombre}" onclick="window.location.href='detalle_producto.html?id=${producto.id}'">
                <div class="card-body d-flex flex-column">
                    <h5 class="titulo">${producto.nombre}</h5>
                    <p class="desc_prod_text_sec">${producto.categoria}</p>
                    <p class="desc_prod_text_sec">${producto.descripcion}</p>
                    <p class="desc_prod_text_sec card-text mt-auto"><strong>$${producto.precio} CLP</strong></p>
                    <button onclick="agregarAlCarrito(event, ${producto.id})">Añadir</button>
                </div>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });
}


// Agregar al carrito
function agregarAlCarrito(e, id) {
    // Detiene la propagación del evento click para que el enlace no se active
    e.stopPropagation(); 

    const producto = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    alert(`${producto.nombre} agregado al carrito.`);
}

// Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCountElement.textContent = totalItems;
}

// ACAA:AAAAVAAA SE QUEDOOOOOOMEL GONZAADLODODOOOOOOOOOOOOOOOOOOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function productosPorCategoria(categoriaSeleccionada) {
  // El método filter() crea un nuevo arreglo con todos los productos que cumplen la condición.
  const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
  
  // La función retorna el arreglo con los productos que son de la categoría seleccionada.
  return productosFiltrados;
}
// Inicializar la página al cargar
mostrarProductos();
actualizarContadorCarrito();