"use strict"

document.addEventListener("DOMContentLoaded", ()=>{
    const parkSelect1 = document.getElementById("parkSelect")
    const parkSelect2 = document.getElementById("parkSelect2")
    const parkDetails = document.getElementById("parkDetails")
    const parkBody = document.getElementById("parkBody")
    const reset = document.getElementById("reset")

    const defaultOptions = ["Please select Below", "All Parks"];
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
                (selectedParkType !== "Please Selected Below" && park.LocationName.includes(selectedParkType));
            return matchesLoc && matchesType;
        });

        filteredParks.forEach(park => {
            const row = document.createElement("tr")

            const nameCell = document.createElement("td");
            nameCell.innerHTML = park.LocationName;
            row.appendChild(nameCell);

            const cityCell = document.createElement("td");
            cityCell.innerHTML = park.City;
            row.appendChild(cityCell);

            const addressCell = document.createElement("td");
            if(park.Address !=0){
                addressCell.innerHTML = park.Address;
            } else {
                phoneCell.innerHTML = "N/A"
            };
            row.appendChild(phoneCell);

            const phoneCell = document.createElement("td");
            if(park.Phone !=o){
                phoneCell.innerHTML = park.Phone
            } else {
                phoneCell.innerHTML = "N/A"
            };
            row.appendChild(phoneCell);

            const websiteCell = document.createElement("td")
            if(park.Visit) {
                const link = document.createElement("a")
                link.href = park.Visit;
                link.innerHTML = "Hyperlink"
                websiteCell.appendChild(link);
            }   else {
                websiteCell.innerHTML = "N/A"
            }
            row.appendChild(websiteCell)


            parkBody.appendChild(row)
        });
        parkDetails.style.display = filteredParks.length > 0 ?  "block" : "none"
    };

    function resetTable(){
        parkSelect1.value = "Please Select Below"
        parkSelect2.value = "Please Select Below"
        parkBody.innerHTML = ""
        parkDetails.style.display = "none"
    }

    parkSelect1.addEventListener("change", filterAndDisplayParks)
    parkSelect2.addEventListener("change", filterAndDisplayParks)
    reset.addEventListener("click", resetTable)
});