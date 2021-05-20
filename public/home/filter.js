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




