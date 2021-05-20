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

    iconSize:     [40, 40],
    shadowSize:   [41, 41], 
    iconAnchor:   [20, 40], 
    shadowAnchor: [12, 41], 
    popupAnchor:  [1, -34]
});

var venuesIcon = L.icon({
    iconUrl: "/home/icons/venuesIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], 
    shadowSize:   [41, 41], 
    iconAnchor:   [20, 40], 
    shadowAnchor: [12, 41],  
    popupAnchor:  [1, -34] 
});

var parksIcon = L.icon({
    iconUrl: "/home/icons/parksIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], 
    shadowSize:   [41, 41], 
    iconAnchor:   [20, 40], 
    shadowAnchor: [12, 41],  
    popupAnchor:  [1, -34] 
});

var culturalIcon = L.icon({
    iconUrl: "/home/icons/culturalIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40], 
    shadowSize:   [41, 41], 
    iconAnchor:   [20, 40], 
    shadowAnchor: [12, 41], 
    popupAnchor:  [1, -34] 
});

var hotspotsIcon = L.icon({
    iconUrl: "/home/icons/hotspotsIcon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",

    iconSize:     [40, 40],
    shadowSize:   [41, 41], 
    iconAnchor:   [20, 40], 
    shadowAnchor: [12, 41],  
    popupAnchor:  [1, -34] 
});

//Creating groups
const drinksGroup = L.layerGroup();
const venuesGroup = L.layerGroup();
const parksGroup = L.layerGroup();
const culturalGroup = L.layerGroup();
const hotspotsGroup = L.layerGroup();

//Fetching locations
(async function getLocations() {
    const response = await fetch("/api/locations");
    const result = await response.json();

    //Mapping each location to a marker & adding to group
    result.data.map(location => {
        let marker;
        if(location.type == "drinks") {
            marker = L.marker(location.latLong, {icon: drinksIcon}).bindPopup(location.name);
            drinksGroup.addLayer(marker);
        }
        if(location.type == "venues") {
            marker = L.marker(location.latLong, {icon: venuesIcon}).bindPopup(location.name);
            venuesGroup.addLayer(marker);
        }
        if(location.type == "parks") {
            marker = L.marker(location.latLong, {icon: parksIcon}).bindPopup(location.name);
            parksGroup.addLayer(marker);
        }
        if(location.type == "cultural") {
            marker = L.marker(location.latLong, {icon: culturalIcon}).bindPopup(location.name);
            culturalGroup.addLayer(marker);
        }
        if(location.type == "hotspots") {
            marker = L.marker(location.latLong, {icon: hotspotsIcon}).bindPopup(location.name);
            hotspotsGroup.addLayer(marker);
        }

        drinksGroup.addTo(map);
        venuesGroup.addTo(map);
        parksGroup.addTo(map);
        culturalGroup.addTo(map);
        hotspotsGroup.addTo(map);
    });
})();

//Methods for switching layers on & off
drinksSwitch = () => {
    if (map.hasLayer(drinksGroup)) {
        map.removeLayer(drinksGroup)
    } else {
        map.addLayer(drinksGroup);
    }
}

venuesSwitch = () => {
    if (map.hasLayer(venuesGroup)) {
        map.removeLayer(venuesGroup)
    } else {
        map.addLayer(venuesGroup);
    }
}

parksSwitch = () => {
    if (map.hasLayer(parksGroup)) {
        map.removeLayer(parksGroup)
    } else {
        map.addLayer(parksGroup);
    }
}

culturalSwitch = () => {
    if (map.hasLayer(culturalGroup)) {
        map.removeLayer(culturalGroup)
    } else {
        map.addLayer(culturalGroup);
    }
}

hotspotsSwitch = () => {
    if (map.hasLayer(hotspotsGroup)) {
        map.removeLayer(hotspotsGroup)
    } else {
        map.addLayer(hotspotsGroup);
    }
}




