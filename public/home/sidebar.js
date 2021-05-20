/*
<div class="row">
                    <hr>
                    <div class="col mx-3 my-2">
                        HERE!!!<h4>Warpigs Brewpub <img src="/home/icons/drinksIcon.png" class="img-fluid ml-3" alt="Drinks icon"></h4>
                        HERE!!!<h6 class="text-muted">Flæsketorvet 2, 2100 V</h6>
                        HERE!!!<p class="mt-4">American brewery 3 Floyds and Danish brewery Mikkeller have built Warpigs from scratch to host top authentic Texas barbecue and American-Danish style brews to Copenhagen and the world. Spacious, laid-back eatery for slow cooked BBQ meats, hearty sides & beers plus patio seating.</p>
                    </div>
                </div>
                <div class="row">
                    <hr>
                    <div class="col mx-3 my-2">
                        <div class="row">
                            START HERE!! <h6>Add a comment</h6>
                            <form autocomplete="off">
                                <div class="form-group mb-2">
                                  <label for="name">Name</label>
                                  <input autocomplete="off" type="text" class="form-control" id="name" placeholder="Leave empty for anonymous">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="content">Comment</label>
                                    <textarea class="form-control" id="content" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-info mb-2">Submit</button>
                            END HERE!!</form>
                        </div>
                        <div class="row mt-2">
                            HERE!!<p class="lead">Comments</p>
                        </div>
                        <div class="row px-3">
                            START HERE!!!
                            <div class="list-group">
                                <div class="list-group-item list-group-item-action flex-column align-items-start">
                                  <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Anon</h5>
                                    <small>20/5/2021</small>
                                  </div>
                                  <p class="mb-1">Good beer but high prices</p>
                                </div>
                            </div>
                            END HERE!!!
                        </div>
                    </div>
                </div>
*/

//Dynamically adding location information to the sidebar
displayLocation = (location) => {
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

    formGroup1.appendChild(nameLabel);
    formGroup1.appendChild(nameInput);
    formGroup2.appendChild(contentLabel);
    formGroup2.appendChild(contentInput);
    form.appendChild(formGroup1);
    form.appendChild(formGroup2);
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
}