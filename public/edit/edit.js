const url = window.location.pathname;
const id = url.substring(url.lastIndexOf('/') + 1);

let currentLocation;

const map = L.map("map").setView([55.676, 12.568], 13);
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiZ2VvcjE4MTIiLCJhIjoiY2tvdTl2cGV5MGpjdTJwb2Fpa3QydjhpdCJ9.vsIf2CpJ_gXMFp_n4EHNzw"
}).addTo(map);
let marker;

const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const typeRadio = document.getElementsByName("type");
const latInput = document.getElementById("lat");
const longInput = document.getElementById("long");
const descriptionTextarea = document.getElementById("description");

(async function fillLocationInfo() {
    const response = await fetch(`/api/locations/${id}`);
    const result = await response.json();
    const location = result.data;
    currentLocation = location;
    marker = L.marker(location.latLong).addTo(map);
    map.setView(location.latLong, 13);

    nameInput.value = location.name;
    if(location.address) {
        addressInput.value = location.address;
    }
    document.getElementById(location.type).checked = true;

    latInput.value = location.latLong[0];
    longInput.value = location.latLong[1];
    if(location.description) {
        descriptionTextarea.value = location.description;
    }
   
    const commentsDiv = document.getElementById("commentsDiv");
    location.comments.map(comment => {

        const row = document.createElement("div");
        row.className = "row";
        const contentCol = document.createElement("div");
        contentCol.className = "col";
        const deleteCol = document.createElement("div");
        deleteCol.className = "col-1 p-0";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button mt-3";
        const listGroup = document.createElement("div");
        listGroup.className = "list-group";
        const listGroupItem = document.createElement("div");
        listGroupItem.className = "list-group-item list-group-item-action flex-column align-items-start";
        const nameDateDiv = document.createElement("div");
        nameDateDiv.className = "d-flex w-100 justify-content-between";
        const name = document.createElement("h5");
        name.className = "mb-1";
        name.innerText = comment.name;
        const date = document.createElement("small");
        date.innerText = comment.date;
        const content = document.createElement("p");
        content.className = "mb-1";
        content.innerText = comment.content;

        listGroup.appendChild(listGroupItem);
        listGroupItem.appendChild(nameDateDiv);
        nameDateDiv.appendChild(name);
        nameDateDiv.appendChild(date);
        listGroupItem.appendChild(content);
        row.appendChild(contentCol);
        contentCol.appendChild(listGroup);
        row.appendChild(deleteCol);
        deleteCol.appendChild(deleteButton);
        commentsDiv.appendChild(row);

        deleteButton.addEventListener("click", () => {
            if(listGroupItem.classList.contains("list-group-item-action")) {
                listGroupItem.classList.add("bg-disabled");
                listGroupItem.classList.remove("list-group-item-action");
                comment.delete = true;
            } else {
                listGroupItem.classList.add("list-group-item-action");
                listGroupItem.classList.remove("bg-disabled");
                comment.delete = false;
            }
        });
    });
})();

document.getElementById("confirm").addEventListener("click", () => {
    let updatedLocation = {};
    updatedLocation.name = nameInput.value;
    if(addressInput.value) {
        updatedLocation.address = addressInput.value;
    } else {
        updatedLocation.address = "";
    }

    if(descriptionTextarea.value) {
        updatedLocation.description = descriptionTextarea.value;
    } else {
        updatedLocation.description = "";
    }

    updatedLocation.latLong = [latInput.value, longInput.value];
    for(let i = 0; i < typeRadio.length; i++) {
        if(typeRadio[i].checked) {
            updatedLocation.type = typeRadio[i].value;
        }
    }

    updatedLocation.comments = currentLocation.comments.filter((comment) => {
        if("delete" in comment && comment.delete === true) {
            return false;
        }
        return true;
    });

    updateLocation(id, updatedLocation);
    //refresh window
    location.reload();
});

async function updateLocation(id, location) {
    try {
        const otherParams = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location),
            method: "PATCH"
        };

        const response = await fetch(`/api/locations/${id}`, otherParams);
        const result = await response.json();
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

map.on("click", (e) => {
    const coordinates = e.latlng;
    map.removeLayer(marker);
    marker = L.marker(coordinates).addTo(map);
    latInput.value = coordinates.lat;
    longInput.value = coordinates.lng;
})


