document.addEventListener("DOMContentLoaded", () => {
    const mountSel = document.getElementById("mountSel");
    const mountainDetails = document.getElementById("mountainDetails");
    const resetBtn = document.getElementById("reset");
 
    // Add default "Please Select Below" and "Show All" options
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Please Select Below";
    mountSel.appendChild(defaultOption);
 
    const showAllOption = document.createElement("option");
    showAllOption.value = "all";
    showAllOption.textContent = "Show All Mountains";
    mountSel.appendChild(showAllOption);
 
    // Populate dropdown with mountain names
    mountainsArray.forEach(mountain => {
        const option = document.createElement("option");
        option.value = mountain.name;
        option.textContent = mountain.name;
        mountSel.appendChild(option);
    });
 
    // Display mountain details when selected
    mountSel.addEventListener("change", () => {
 
        mountainDetails.innerHTML = ""; // Clear previous details
 
        if (mountSel.value === "") {
            mountainDetails.style.display = "none"
            return;
        }
 
        if (mountSel.value === "all") {
            mountainsArray.forEach(mountain => {
                displayMountainDetails(mountain);
            });
        } else {
            const selectedMountain = mountainsArray.find(mountain => mountain.name === mountSel.value);
 
            if (selectedMountain) {
                displayMountainDetails(selectedMountain);
            }
        }
    });
 
    // Reset button to clear selection
    resetBtn.addEventListener("click", () => {
        mountSel.value = ""; // Reset the dropdown
        mountainDetails.style.display = "none"; // Hide details
        mountainDetails.innerHTML = ""; // Clear displayed details
    });
 
    async function getSunsetForMountain(lat, lng) {
        try {
            const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
 
            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
 
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching sunset data:', error);
            alert('Unable to fetch sunset data. Please try again later.'); // Notify the user
            return null; // Or handle the error as needed
        }
    }
 
    // Function to display a mountain's details
    function displayMountainDetails(mountain) {
        mountainDetails.style.display = "block";
 
        // Create elements for mountain details
        const mountainInfo = document.createElement("div");
        mountainInfo.classList.add("mountain-box");
        mountainInfo.innerHTML = `
            <h3>${mountain.name}</h3>
            <img src="${mountain.img}" alt="${mountain.name}" style="width: 300px; height: auto;">
            <p><b>Description:</b> ${mountain.desc}</p> <br>
            <p><b>Elevation:</b> ${mountain.elevation} Feet</p>
            <p><b>Description:</b> ${mountain.effort}</p> <br>
        `;
 
        // Add Show Sunrise/Sunset button
        const sunButton = document.createElement("button");
        sunButton.textContent = "Show Sunrise/Sunset";
        sunButton.addEventListener("click", async () => {
            const sunData = await getSunsetForMountain(mountain.lat, mountain.lng);
            if (sunData) {
                const sunInfo = document.createElement("p");
                sunInfo.innerHTML = `<br>Sunrise: ${sunData.sunrise} Local<br>Sunset: ${sunData.sunset} Local`;
                mountainInfo.appendChild(sunInfo);
                sunButton.disabled = true; // Disable the button after fetching data
            }
        });
 
        mountainDetails.appendChild(mountainInfo);
        mountainInfo.appendChild(sunButton);
    }
});