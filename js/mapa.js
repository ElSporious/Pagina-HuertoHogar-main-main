function initMap() {
    // Coordenadas de Santiago, Chile (un punto central para el ejemplo)
    const ubicacion = { lat: -33.4489, lng: -70.6693 };
    
    // Inicializar el mapa
    const map = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 12,
        center: ubicacion,
    });
    
    // Agregar un marcador en la ubicación
    const marker = new google.maps.maps.Marker({
        position: ubicacion,
        map: map,
        title: "HuertoHogar en Santiago"
    });
}