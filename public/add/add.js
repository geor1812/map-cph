const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const typeRadio = document.getElementsByName("type");
const latInput = document.getElementById("lat");
const longInput = document.getElementById("long");
const descriptionTextarea = document.getElementById("description");

document.getElementById("confirm").addEventListener("click", (e) => {
    
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
