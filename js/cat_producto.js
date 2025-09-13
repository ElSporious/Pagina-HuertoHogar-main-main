// Archivo: cat_producto.js

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

// Se usa "contenedor-productos" para la sección de productos y "categoria-descripcion" para la descripción
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorDescripcion = document.getElementById("categoria-descripcion");
const cartCountElement = document.getElementById('cart-count');

// Objeto con las descripciones de las categorías
const descripcionesCategorias = {
    "Frutas": {
        titulo: "Frutas Frescas y Jugosas",
        descripcion: `Nuestra selección de frutas frescas ofrece una experiencia directa del campo a 
                      tu hogar. Estas frutas se cultivan y cosechan en el punto óptimo de madurez para asegurar 
                      su sabor y frescura. Disfruta de una variedad de frutas de temporada que aportan vitaminas 
                      y nutrientes esenciales a tu dieta diaria. Perfectas para consumir solas, en ensaladas o como 
                      ingrediente principal en postres y smoothies. `
    },
    "Verdura Organicas": {
        titulo: "Verduras Orgánicas",
        descripcion: `Descubre nuestra gama de verduras orgánicas, cultivadas sin el uso de 
                      pesticidas ni químicos, garantizando un sabor auténtico y natural. Cada verdura es 
                      seleccionada por su calidad y valor nutricional, ofreciendo una excelente fuente de 
                      vitaminas, minerales y fibra. Ideales para ensaladas, guisos y platos saludables, nuestras 
                      verduras orgánicas promueven una alimentación consciente y sostenible. `
    },
    "Productos Organicos": {
        titulo: "Productos Orgánicos del Campo",
        descripcion: `Nuestros productos orgánicos están elaborados con ingredientes naturales y 
                      procesados de manera responsable para mantener sus beneficios saludables. Desde aceites 
                      y miel hasta granos y semillas, ofrecemos una selección que apoya un estilo de vida 
                      saludable y respetuoso con el medio ambiente. Estos productos son perfectos para quienes 
                      buscan opciones alimenticias que aporten bienestar sin comprometer el sabor ni la calidad. `
    },
    "Productos Lacteos": {
        titulo: "Lácteos Frescos de Granja",
        descripcion: ` Los productos lácteos de HuertoHogar provienen de granjas locales que se 
                      dedican a la producción responsable y de calidad. Ofrecemos una gama de leches, yogures 
                      y otros derivados que conservan su frescura y sabor auténtico. Ricos en calcio y nutrientes 
                      esenciales, nuestros lácteos son perfectos para complementar una dieta equilibrada, 
                      proporcionando el mejor sabor y nutrición para toda la familia.`
    },
    "todos": {
        titulo: "Todos nuestros Productos",
        descripcion: "Explora la variedad completa de HuertoHogar y encuentra todo lo que necesitas para tu hogar."
    }
};

// Función para mostrar productos
function mostrarProduc(lista) {
    if (!contenedorProductos) {
        console.error("El contenedor de productos no se encontró.");
        return;
    }
    contenedorProductos.innerHTML = "";
    lista.forEach(prod => {
        contenedorProductos.innerHTML += `
            <div class="col-md-3 mb-3">
                <div class="card h-100">
                    <img src="img/${prod.imagen}" class="card-img-top tamano_img" alt="${prod.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="titulo">${prod.nombre}</h5>
                        <p class="desc_prod_text_sec">${prod.categoria}</p>
                        <p class="desc_prod_text_sec">${prod.descripcion}</p>
                        <p class="desc_prod_text_sec mt-auto"><strong>$${prod.precio} CLP</strong></p>
                        <button onclick="agregarAlCarrito(${prod.id})">Añadir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filtrar por categoría
function productosPorCategoria(categoria) {
    // 1. Actualiza el contenedor de la descripción
    if (contenedorDescripcion) {
        // Obtenemos los elementos h2 y p dentro del contenedor
        const tituloElemento = contenedorDescripcion.querySelector('h2');
        const descripcionElemento = contenedorDescripcion.querySelector('p');

        // Asignamos el texto y las clases a cada elemento
        tituloElemento.textContent = descripcionesCategorias[categoria].titulo;
        tituloElemento.className = 'titulo'; // Aplica la clase .titulo

        descripcionElemento.textContent = descripcionesCategorias[categoria].descripcion;
        descripcionElemento.className = 'texto_pric'; // Aplica la clase .texto_pric
    }
    
    // 2. Filtra y muestra los productos
    if (categoria === "todos") {
        mostrarProduc(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        mostrarProduc(filtrados);
    }
}

// ... (El resto de tus funciones: agregarAlCarrito, guardarCarrito, actualizarContadorCarrito) ...
function agregarAlCarrito(id) {
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
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    // Al inicio, muestra todos los productos y su descripción
    productosPorCategoria("todos");
    actualizarContadorCarrito();
});