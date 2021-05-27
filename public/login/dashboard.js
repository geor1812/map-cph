displayLocations()

async function displayLocations(){

    const response = await fetch("api/locations");
    const result = await response.json();
    const locations = result.data;

    const table = document.getElementById("tbody");

    locations.map((location)=> {
        
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const updateDelete = document.createElement("td");
        const updateButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        
        name.innerHTML = location.name;
        updateButton.class="btn btn-primary";
        deleteButton.class="btn btn-primary";
        updateButton.onclick= () => { return window.location.href=`update/${location._id}`};
        updateButton.innerText= "Update";
        deleteButton.onclick= () => { return deleteLocation(location._id)};
        deleteButton.innerText = "Delete";

        updateDelete.appendChild(updateButton);
        updateDelete.appendChild(deleteButton);
        row.appendChild(name);
        row.appendChild(updateDelete);
        table.appendChild(row);
        


    })

}

async function deleteLocation(id){
    try {
        const otherParams = {
            method: "DELETE"
        };

        const response = await fetch(`/api/locations/${id}`, otherParams);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}


