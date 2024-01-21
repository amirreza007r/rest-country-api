const displayCountries = () => {
    const container = $("#countries");
    const selectedContinent = $("#continentFilter").val();
    const searchQuery = $("#countrySearch").val().toLowerCase();

    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        method: "GET",
        dataType: "json",
        success: function (data) {
            container.empty();

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

            $.each(filteredCountries, function (index, country) {
                const countryElement = getCountryElement(country);
                container.append(countryElement);
            });
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        },
    });
};

$("#continentFilter").on("change", displayCountries);
$("#countrySearch").on("keyup", displayCountries);

displayCountries();

const getCountryElement = (country) => {
    const div = $("<div>").addClass("content");

    div.html(`
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
    `);

    return div;
};

function toggleDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        localStorage.setItem("darkMode", false);
    }
    const mainContainer = $("#main-container");
    mainContainer.toggleClass("dark-mode");
    $("main").toggleClass("dark-mode");
    $("header").toggleClass("dark-mode-element");
    $(".card, #continentFilter").toggleClass("dark-mode-element");
    $(".search-section,#countrySearch").toggleClass("dark-mode-element");

    const isDarkMode = mainContainer.hasClass("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    const svgContainer = $("#svg-container");
    if (isDarkMode) {
        // Replace with dark mode SVG
        svgContainer.html(`
    <svg class="search-icon-light" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,255.99544,255.99544"
        width="30px" height="30px">
        <g fill-opacity="0.45098" fill="#fff" fill-rule="nonzero" stroke="none"
            stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
            stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
            font-weight="none" font-size="none" text-anchor="none"
            style="mix-blend-mode: normal">
            <g transform="scale(5.12,5.12)">
                <path
                    d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z">
                </path>
            </g>
        </g>
    </svg>
`);
    } else {
        // Replace with light mode SVG
        svgContainer.html(`
        <svg class="search-icon-light" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,255.99544,255.99544"
            width="30px" height="30px">
            <g fill-opacity="0.45098" fill="#000000" fill-rule="nonzero" stroke="none"
                stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
                stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
                font-weight="none" font-size="none" text-anchor="none"
                style="mix-blend-mode: normal">
                <g transform="scale(5.12,5.12)">
                    <path
                        d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z">
                    </path>
                </g>
            </g>
        </svg>
    `);
        // Remove "dark-mode-element" class from all elements
        document.querySelectorAll(".dark-mode-element").forEach((element) => {
            element.classList.remove("dark-mode-element");
        });

        // Remove "dark-mode" class from all elements
        document.querySelectorAll(".dark-mode").forEach((element) => {
            element.classList.remove("dark-mode");
        });
    }
}

function setInitialMode() {
    const mainContainer = $("#main-container");
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    mainContainer.toggleClass("dark-mode", isDarkMode);
}

setInitialMode();
