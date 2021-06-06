async function displayLocations(searchTerm) {
    let response;
    console.log(searchTerm);
    if(searchTerm) {
        response = await fetch(`/api/locations?searchTerm=${searchTerm}`);
    } else {
        response = await fetch("/api/locations");
    }
    const result = await response.json();
    const locations = result.data;

    const table = document.getElementById("tbody");

    locations.map((location)=> {
        
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const address = document.createElement("td");
        const latLong = document.createElement("td");
        const updateDelete = document.createElement("td");
        const updateButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        
        name.innerText = location.name;
        address.innerText = location.address;
        latLong.innerText = `${location.latLong[0]}, ${location.latLong[1]}`;
        updateButton.className="update-button mx-2";
        deleteButton.className="delete-button mx-2";
        updateButton.onclick= () => { return window.location.href=`edit/${location._id}`};
        //updateButton.innerText= "Update";
        deleteButton.onclick= () => { return deleteLocation(location._id)};
        //deleteButton.innerText = "Delete";

        updateDelete.appendChild(updateButton);
        updateDelete.appendChild(deleteButton);
        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(latLong);
        row.appendChild(updateDelete);
        table.appendChild(row);
    });

}

displayLocations();

async function deleteLocation(id){
    try {
        const otherParams = {
            method: "DELETE"
        };
        await fetch(`/api/locations/${id}`, otherParams);
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("searchTerm").value;
    document.getElementById("tbody").innerHTML = "";
    displayLocations(searchTerm);
});



