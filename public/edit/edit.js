const url = window.location.pathname;
const id = url.substring(url.lastIndexOf('/') + 1);

let currentLocation;

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
    }

    if(descriptionTextarea.value) {
        updatedLocation.description = descriptionTextarea.value;
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
