document.addEventListener("DOMContentLoaded", () => {
    const mountSel = document.getElementById("mountSel");
    const mountainDetails = document.getElementById("mountainDetails");
    const moujntainName = document.getElementById("mountainName");
    const mountainImage = document.getElementById("mountaiImage");
    const mountainLocation = document.getElementById("mountainLocation");
    const resetBtn = document.getElementById("reset");


    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Please Select Below";
    mountSel.appendChild(showAllOption);

    const showAllOption = document.createElement("option");
    showAllOption.value = "all";
    showAllOption.textContent = "Show All Mountains";
    mountSel.appendChild(showAllOption);


    mountainsArray.forEach(mountain => {
        const option = document.createElement("option");
        option.value = mountain.name;
        option.textContent = mountain.name;
        mountSel.appendChild(option);
    });


    mountSel.addEventListener("change", () => {
        mountainDetails.innerHTML = "";

        if(mountSel.value === ""){
            mountainDetails.style.display = "none"
            return;
        }
        if(mountSel.value === "all"){
            mountainsArray.forEach(mountain => {
                displayMountainDetails(mountain);
            });
        }  else{
            const selectedMountain = mountainsArray.find(mountain => mountain.name === mountSel.value);

            if(selectedMountain) {
                displayMountainDetails(selectedMountain);
            }
        }
    });

    resetBtn.addEventListener("click", () => {
        mountSel.value = "";
        mountainDetails.style.display = "none";
        mountainDetails.innerHTML = "";
    });

    async function getSunsetForMountain(lat, lng) {
        try{
            const response = await fetch('https://api.sunrise-sunset.org/json?lat-${lat}&lng-${lng}&date-today');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error(`Error fetching sunset data:`, error);
            alert('Unable to fetch sunset data. Please try again later.');
            return null;
        }
    }


    function displayMountainDetails(mountain) {
        mountainDetails.style.display = "block";

        const mountainInfo = document.createElement("div");
        mountainInfo.classList.add("mountain-box");
        mountainInfo.innerHTML = `
        <h3>${mountain.name}</h3>
        <img src="${mountain.img}" alt="${mountain.name}" style="width: 300px; height: auto;">
        <p>Discription: ${mountain.desc}</p> <br>
        <p>Elevation: ${mountain.elevation} Feet</p>
        <p>Description: ${mountain.effort}</p> <br>
        `;

        const sunButton = document.createElement("button");
        sunButton.textContent = "Show Sunrise/Sunset";
        sunButton.addEventListener("click", async () => {
            const sunData = await getSunsetForMountain(mountain.lat, mountain.lng);
            if (sunData) {
                const sunInfo = document.createElement("p");
                sunInfo.innerHTML = `<br>Sunrise: ${sunData.sunrise} Local<br>Sunset: ${sunData.sunset} Local`;
                mountainInfo.appendChild(sunInfo);
                sunButton.disabled = true;
            }
        });

        mountainDetails.appendChild(mountainInfo);
        mountainInfo.appendChild(sunButton);
    }

})