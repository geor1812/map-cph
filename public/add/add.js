const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const typeRadio = document.getElementsByName("type");
const latInput = document.getElementById("lat");
const longInput = document.getElementById("long");
const descriptionTextarea = document.getElementById("description");

document.getElementById("addButton").addEventListener("click", (e) => {
    if(confirm("Do you want to add this location?")) {
        let newLocation = {};
        newLocation.name = nameInput.value;
        newLocation.address = addressInput.value;
        newLocation.description = descriptionTextarea.value;
        newLocation.latLong = [latInput.value, longInput.value];
        for(let i = 0; i < typeRadio.length; i++) {
            if(typeRadio[i].checked) {
                newLocation.type = typeRadio[i].value;
            }
        }

        createLocation(newLocation);
        window.location = "/dashboard";
    }   
});

async function createLocation(location) {
    try {
        const otherParams = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location),
            method: "POST"
        };

        const response = await fetch(`/api/locations`, otherParams);
        const result = await response.json();
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

const map = L.map("map").setView([55.676, 12.568], 13);
let marker;

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiZ2VvcjE4MTIiLCJhIjoiY2tvdTl2cGV5MGpjdTJwb2Fpa3QydjhpdCJ9.vsIf2CpJ_gXMFp_n4EHNzw"
}).addTo(map);

map.on("click", (e) => {
    const coordinates = e.latlng;
    console.log(coordinates);
    if(marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(coordinates).addTo(map);
    latInput.value = coordinates.lat;
    longInput.value = coordinates.lng;
});