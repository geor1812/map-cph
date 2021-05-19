//Creating the map & setting the center in Copenhagen
const map = L.map("map").setView([55.676, 12.568], 13);

//Adding tiles
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiZ2VvcjE4MTIiLCJhIjoiY2tvdTl2cGV5MGpjdTJwb2Fpa3QydjhpdCJ9.vsIf2CpJ_gXMFp_n4EHNzw"
}).addTo(map);

//Creating icons
var drinksIcon = L.icon({
    iconUrl: "/home/icons/drinksIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 41],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

var venuesIcon = L.icon({
    iconUrl: "/home/icons/venuesIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 41],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

var parksIcon = L.icon({
    iconUrl: "/home/icons/parksIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 41],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

var culturalIcon = L.icon({
    iconUrl: "/home/icons/culturalIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 41],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

var hotspotsIcon = L.icon({
    iconUrl: "/home/icons/hotspotsIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 41],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

//Fetching locations
(async function getLocations() {
    const response = await fetch("/api/locations");
    const result = await response.json();


    result.data.map(location => {
        let marker;
        if(location.type == "drinks") {
            marker = L.marker(location.latLong, {icon: drinksIcon});
        }
        if(location.type == "venues") {
            marker = L.marker(location.latLong, {icon: venuesIcon});
        }
        if(location.type == "parks") {
            marker = L.marker(location.latLong, {icon: parksIcon});
        }
        if(location.type == "cultural") {
            marker = L.marker(location.latLong, {icon: culturalIcon});
        }
        if(location.type == "hotspots") {
            marker = L.marker(location.latLong, {icon: hotspotsIcon});
        }
        marker.bindPopup(location.name).addTo(map);
    });
})();


