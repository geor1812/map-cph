//Creating the map & setting the center in Copenhagen
const map = L.map("map").setView([55.676, 12.568], 13);

//Adding tiles
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiZ2VvcjE4MTIiLCJhIjoiY2tvdTl2cGV5MGpjdTJwb2Fpa3QydjhpdCJ9.vsIf2CpJ_gXMFp_n4EHNzw"
}).addTo(map);

//Fetching locations
(async function getLocations() {
    const response = await fetch("/api/locations");
    const result = await response.json();

    //let drinks, venues, parks, cultural, hotspots;

    result.data.map(location => {
        const marker = L.marker(location.latLong).bindPopup(location.name).addTo(map);

        /*if(location.type == "drinks") {
            drinks.push(location.latLong);
        }
        if(location.type == "venues") {
            venues.push(location.latLong);
        }
        if(location.type == "parks") {
            parks.push(location.latLong);
        }
        if(location.type == "cultural") {
            cultural.push(location.latLong);
        }
        if(location.type == "hotspots") {
            hotspots.push(location.latLong);
        }*/
    });
})();


