"use strict"
 
document.addEventListener("DOMContentLoaded", ()=>{
    const parkSelect1 = document.getElementById("parkSelect1")
    const parkSelect2 = document.getElementById("parkSelect2")
    const parkDetails = document.getElementById("parkDetails")
    const parkBody = document.getElementById("parkBody")
    const reset = document.getElementById("reset")
    const errorMessage = document.getElementById("errorMessage")
   
    const defaultOptions = ["Please Select Below", "All Parks"];
    defaultOptions.forEach(text=>{
        const optionLoc = new Option(text, text);
        const optionType = new Option(text, text);
        parkSelect1.add(optionLoc);
        parkSelect2.add(optionType)
    })
 
    locationsArray.forEach(state => {
        const option = document.createElement("option")
        option.value = state
        option.innerHTML = state
        parkSelect1.appendChild(option)
    });
 
    parkTypesArray.forEach(parkType => {
        const option = document.createElement("option")
        option.value = parkType
        option.innerHTML = parkType
        parkSelect2.appendChild(option)
    });
 
    function filterAndDisplayParks(){
        const selectedLoc = parkSelect1.value
        const selectedParkType = parkSelect2.value
 
        parkBody.innerHTML = "";
       
        const filteredParks = nationalParksArray.filter((park) => {
            const matchesLoc =
            selectedLoc === "All Parks" ||
            (selectedLoc !== "Please Select Below" && park.State === selectedLoc);
            const matchesType =
            selectedParkType === "All Parks" ||
            (selectedParkType !== "Please Select Below" && park.LocationName.includes(selectedParkType));
            return matchesLoc && matchesType;
        });
       
        if (filteredParks.length === 0 && selectedLoc !== "Please Select Below" && selectedParkType !== "Please Select Below") {
            errorMessage.style.display = "block";
            parkDetails.style.display = "none"; // Hide table if no parks are found
        } else {
            errorMessage.style.display = "none";
            parkDetails.style.display = "block";
       
        filteredParks.forEach(park => {
            const row = document.createElement("tr")
           
            const nameCell = document.createElement("td");
            nameCell.innerHTML = park.LocationName;
            row.appendChild(nameCell);
           
            const cityCell = document.createElement("td");
            cityCell.innerHTML = park.City;
            row.appendChild(cityCell);
           
            const addressCell = document.createElement("td");
            if(park.Address != 0){
                addressCell.innerHTML = park.Address;
            } else {
                addressCell.innerHTML = "This location has no public address"
            };
            row.appendChild(addressCell);
           
            const phoneCell = document.createElement("td");
            if(park.Phone != 0){
                phoneCell.innerHTML = park.Phone
            } else {
                phoneCell.innerHTML = "N/A"
            };
            row.appendChild(phoneCell);
           
            const websiteCell = document.createElement("td");
            if(park.Visit) {
                const link = document.createElement("a")
                link.href = park.Visit;
                link.innerHTML = "Hyperlink"
                websiteCell.appendChild(link);
            } else {
                websiteCell.innerHTML = "N/A"
            }
            row.appendChild(websiteCell)
           
            // Adds it all inforamtion to the table
            parkBody.appendChild(row)
        });
        parkDetails.style.display = filteredParks.length > 0 ? "block" : "none"
      }  
    };
   
    function resetTable(){
        parkSelect1.value = "Please Select Below"
        parkSelect2.value = "Please Select Below"
        parkBody.innerHTML = ""
        parkDetails.style.display = "none"
        errorMessage.style.display = "none"
    }
   
    parkSelect1.addEventListener("change", filterAndDisplayParks)
    parkSelect2.addEventListener("change", filterAndDisplayParks)
    reset.addEventListener("click", resetTable)
});