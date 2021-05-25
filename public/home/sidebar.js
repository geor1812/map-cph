//Dynamically adding location information to the sidebar
const socket = io();
let currentId;
async function displayLocation(id) {
    //Fetch location
    const response = await fetch(`/api/locations/${id}`);
    const result = await response.json();
    const location = result.data;
    currentId = location._id;

    const infoRow = document.getElementById("info-row");
    infoRow.innerHTML = "";
    const addCommentRow = document.getElementById("add-comment-row");
    addCommentRow.innerHTML = "";
    const commRow1 = document.getElementById("comm-row-1");
    commRow1.innerHTML = "";
    const commRow2 = document.getElementById("comm-row-2");
    commRow2.innerHTML = "";

    //Creating & adding name, address, description
    const name = document.createElement("h4");
    name.innerText = location.name;
    const icon = document.createElement("img");
    icon.src = `/home/icons/${location.type}Icon.png`;
    icon.className = "img-fluid ml-3";
    const address = document.createElement("h6");
    address.className = "text-muted";
    if(location.address) {
        address.innerText = location.address;
    }
    const description = document.createElement("p");
    description.className = "mt-4";
    if(location.description) {
        description.innerText = location.description;
    }
   
    name.appendChild(icon);
    infoRow.appendChild(name);
    infoRow.appendChild(address);
    infoRow.appendChild(description);

    //Creating & adding the "add comment" section
    const addCommentText = document.createElement("h6");
    addCommentText.innerText = "Write your thoughts";
    const form = document.createElement("form");
    form.autocomplete = "off";
    form.id = "comment-form";
    const formGroup1 = document.createElement("div");
    formGroup1.className = "form-group mb-2";
    const formGroup2 = document.createElement("div");
    formGroup2.className = "form-group mb-2";
    const nameLabel = document.createElement("label");
    nameLabel.for = "name";
    nameLabel.innerText = "Name"
    const nameInput = document.createElement("input");
    nameInput.autocomplete = "off";
    nameInput.type = "text";
    nameInput.className = "form-control";
    nameInput.id = "name";
    nameInput.placeholder = "Leave empty for anonymous";
    const contentLabel = document.createElement("label");
    contentLabel.for = "content";
    contentLabel.for = "Comment";
    const contentInput = document.createElement("textarea");
    contentInput.className = "form-control";
    contentInput.id = "content";
    contentInput.rows = "3";
    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.className = "btn btn-block btn-info";
    submitButton.id = "submit";
    submitButton.value = "Send";


    formGroup1.appendChild(nameLabel);
    formGroup1.appendChild(nameInput);
    formGroup2.appendChild(contentLabel);
    formGroup2.appendChild(contentInput);
    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
    form.appendChild(submitButton)
    addCommentRow.appendChild(addCommentText);
    addCommentRow.appendChild(form);

    //Creating & adding comments section
    commentsHeader = document.createElement("p");
    commentsHeader.className = "lead";
    commentsHeader.innerText = "Comments";

    commRow1.appendChild(commentsHeader);

    location.comments.map(comment => {
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
        commRow2.appendChild(listGroup);
    })
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let newComment = {};
        newComment.content = contentInput.value;
        newComment.name = (nameInput.value) ? nameInput.value : "Anon";
        newComment.date = new Date().toLocaleDateString();
        contentInput.value  = "";

        location.comments.push(newComment);
        //Sends a patch request to the API with the new comment
        updateComments(location._id, location.comments);
        
        socket.emit("submitComment", newComment, location._id);
    });
}

socket.on("displayComment", (comment, id) => {
    if(currentId === id) {
        displayComment(comment);
    }
});

displayComment = (comment) => {
    const commRow2 = document.getElementById("comm-row-2");
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
    commRow2.appendChild(listGroup);
}

async function updateComments(id, comments) {
    try {
        const otherParams = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({comments: comments}),
            method: "PATCH"
        };

        const response = await fetch(`/api/locations/${id}`, otherParams);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

