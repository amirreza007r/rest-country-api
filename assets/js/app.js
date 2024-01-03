// fetch("https://restcountries.com/v3.1/all")
//     .then((res) => res.json())
//     .then((data) => displayCountries(data.slice(0, 12)))
//     .catch((error) => console.error("Error fetching data:", error));

// const displayCountries = (countries) => {
//     const container = document.getElementById("countries");

//     container.innerHTML = "";

//     countries.forEach((country) => {
//         const countryElement = getCountryElement(country);
//         container.appendChild(countryElement);
//     });
// };

// const getCountryElement = (country) => {
//     const div = document.createElement("div");
//     div.className = "content";

//     div.innerHTML = `
//             <div class="col">
//                 <div class="card">
//                     <img src="${country.flags.png}" class="card-img-top" alt="...">
//                     <div class="card-body">
//                         <h5 class="card-title">${country.name.common}</h5>
//                         <div><p>Population: ${country.population} </p></div>
//                         <div><p>Region: ${country.region} </p></div>
//                         <div><p>Capital: ${country.capital} </p></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     return div;
// };

// Function to fetch and display countries based on the selected continent

// const displayCountries = () => {
//     const container = document.getElementById("countries");
//     const selectedContinent = document.getElementById("continentFilter").value;
//     const searchQuery = document.getElementById("countrySearch").value.toLowerCase();

//     fetch("https://restcountries.com/v3.1/all")
//         .then((res) => res.json())
//         .then((data) => {
//             container.innerHTML = "";

//             const filteredCountries = selectedContinent
//                 ? data.filter((country) => country.region === selectedContinent)
//                 : data;

//             filteredCountries.forEach((country) => {
//                 const countryElement = getCountryElement(country);
//                 container.appendChild(countryElement);
//             });
//         })
//         .catch((error) => console.error("Error fetching data:", error));
// };

// // Event listener for dropdown change event
// document
//     .getElementById("continentFilter")
//     .addEventListener("change", displayCountries);

// // Initial fetch and display of countries without filtering
// displayCountries();

// const getCountryElement = (country) => {
//     const div = document.createElement("div");
//     div.className = "content";

//     div.innerHTML = `
//             <div class="col">
//                 <div class="card">
//                     <img src="${
//                         country.flags.png
//                     }" class="card-img-top" alt="...">
//                     <div class="card-body">
//                         <h5 class="card-title">${country.name.common}</h5>
//                         <div><p>Population: ${
//                             country.population || "N/A"
//                         } </p></div>
//                         <div><p>Region: ${country.region || "N/A"} </p></div>
//                         <div><p>Capital: ${country.capital || "N/A"} </p></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     return div;
// };

// Function to fetch and display countries based on the selected continent and search query
const displayCountries = () => {
    const container = document.getElementById("countries");
    const selectedContinent = document.getElementById("continentFilter").value;
    const searchQuery = document
        .getElementById("countrySearch")
        .value.toLowerCase();

    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            container.innerHTML = "";

            const filteredCountries = data.filter(
                (country) =>
                    (selectedContinent
                        ? country.region === selectedContinent
                        : true) &&
                    (searchQuery
                        ? country.name.common
                              .toLowerCase()
                              .includes(searchQuery)
                        : true)
            );

            filteredCountries.forEach((country) => {
                const countryElement = getCountryElement(country);
                container.appendChild(countryElement);
            });
        })
        .catch((error) => console.error("Error fetching data:", error));
};

document
    .getElementById("continentFilter")
    .addEventListener("change", displayCountries);
document
    .getElementById("countrySearch")
    .addEventListener("keyup", displayCountries);

displayCountries();

const getCountryElement = (country) => {
    const div = document.createElement("div");
    div.className = "content";

    div.innerHTML = `
            <div class="col">
                <div class="card">
                    <img src="${
                        country.flags.png
                    }" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <div><p>Population: ${
                            country.population || "N/A"
                        } </p></div>
                        <div><p>Region: ${country.region || "N/A"} </p></div>
                        <div><p>Capital: ${country.capital || "N/A"} </p></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return div;
};

function toggleDarkMode() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.classList.toggle("dark-mode");
    const mainElement = document.querySelector("main");
    mainElement.classList.toggle("dark-mode");
    const header = document.querySelector("header");
    header.classList.toggle("dark-mode-element");
    const cardDark = document.querySelectorAll("card");
    cardDark.classList.toggle("dark-mode-element");

    const isDarkMode = mainContainer.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

function setInitialMode() {
    const mainContainer = document.getElementById("main-container");
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    mainContainer.classList.toggle("dark-mode", isDarkMode);
}
setInitialMode();
