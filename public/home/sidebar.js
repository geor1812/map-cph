drinksCheck = document.getElementById("drinks");
venuesCheck = document.getElementById("venues");
parksCheck = document.getElementById("parks");
culturalCheck = document.getElementById("cultural");
hotspotsCheck = document.getElementById("hotspots");

//Making sure all checkboxes are checked at page loading
drinksCheck.checked = true;
venuesCheck.checked = true;
parksCheck.checked = true;
culturalCheck.checked = true;
hotspotsCheck.checked = true;

drinksCheck.addEventListener("change", drinksSwitch);
venuesCheck.addEventListener("change", venuesSwitch);
parksCheck.addEventListener("change", parksSwitch);
culturalCheck.addEventListener("change", culturalSwitch);
hotspotsCheck.addEventListener("change", hotspotsSwitch);

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
                            <h6>Add a comment</h6>
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
                            </form>
                        </div>
                        <div class="row mt-2">
                            <p class="lead">Comments</p>
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
                            <div class="list-group">
                                <div class="list-group-item list-group-item-action flex-column align-items-start">
                                  <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">TestComment666</h5>
                                    <small>19/5/2021</small>
                                  </div>
                                  <p class="mb-1">This is a test comment. How are you today?</p>
                                </div>
                            </div>
                            <div class="list-group">
                                <div class="list-group-item list-group-item-action flex-column align-items-start">
                                  <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">TheRambler</h5>
                                    <small>19/5/2021</small>
                                  </div>
                                  <p class="mb-1">I just want to see how it looks if somebody writes a fuckton of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
*/
