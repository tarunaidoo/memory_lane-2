/* =========================================
   EXPLORE MEMORIES BUTTON
========================================= */

const exploreButton =
    document.getElementById("exploreButton");


exploreButton.addEventListener("click", function () {

    document.getElementById("albums").scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   MEMORY DATA
========================================= */

const memories = {

    "2025": {

        "Sept25": [
            "photo1.png",
            "photo2.png",
            "photo3.png"
        ],

        "Oct25": [
            "photo1.png",
            "photo2.png"
        ],

        "Nov25": [
            "photo1.png"
        ],

        "Dev25": [
            "photo1.png",
            "photo2.png"
        ]

    },


    "2026": {

        "Jan26": [],

        "Feb26": [],

        "Mar26": [],

        "Apr26": [],

        "May26": [],

        "Jun26": [],

        "Jul26": [],

        "Aug26": [],

        "Sep26": [],

        "Oct26": [],

        "Nov26": [],

        "Dec26": []

    }

};


/* =========================================
   FRIENDLY MONTH NAMES
========================================= */

const monthNames = {

    "Sept25": "September 2025",
    "Oct25": "October 2025",
    "Nov25": "November 2025",
    "Dev25": "December 2025",

    "Jan26": "January 2026",
    "Feb26": "February 2026",
    "Mar26": "March 2026",
    "Apr26": "April 2026",
    "May26": "May 2026",
    "Jun26": "June 2026",
    "Jul26": "July 2026",
    "Aug26": "August 2026",
    "Sep26": "September 2026",
    "Oct26": "October 2026",
    "Nov26": "November 2026",
    "Dec26": "December 2026"

};


/* =========================================
   MEMORY BROWSER ELEMENTS
========================================= */

const memoryModal =
    document.getElementById("memoryModal");

const yearSelect =
    document.getElementById("yearSelect");

const monthSelect =
    document.getElementById("monthSelect");

const viewMemoriesButton =
    document.getElementById("viewMemoriesButton");

const memoryResults =
    document.getElementById("memoryResults");


/* =========================================
   OPEN MEMORY BROWSER
========================================= */

function openMemoryBrowser() {

    memoryModal.classList.add("active");

    document.body.classList.add("modal-open");

    updateMonthDropdown();

}


/* =========================================
   CLOSE MEMORY BROWSER
========================================= */

function closeMemoryBrowser() {

    memoryModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


/* =========================================
   UPDATE MONTH DROPDOWN
========================================= */

function updateMonthDropdown() {

    const selectedYear =
        yearSelect.value;

    const availableMonths =
        memories[selectedYear];

    monthSelect.innerHTML = "";


    if (!availableMonths) {

        const option =
            document.createElement("option");

        option.textContent =
            "No months available";

        option.disabled = true;

        monthSelect.appendChild(option);

        return;

    }


    Object.keys(availableMonths).forEach(function (monthFolder) {

        const option =
            document.createElement("option");

        option.value =
            monthFolder;

        option.textContent =
            monthNames[monthFolder] || monthFolder;

        monthSelect.appendChild(option);

    });

}


/* =========================================
   YEAR CHANGE
========================================= */

if (yearSelect) {

    yearSelect.addEventListener("change", function () {

        updateMonthDropdown();

    });

}


/* =========================================
   VIEW MEMORIES
========================================= */

if (viewMemoriesButton) {

    viewMemoriesButton.addEventListener("click", function () {

        displayMemories();

    });

}


/* =========================================
   DISPLAY MEMORIES
========================================= */

function displayMemories() {

    const year =
        yearSelect.value;

    const monthFolder =
        monthSelect.value;


    const photos =
        memories[year]?.[monthFolder];


    memoryResults.innerHTML = "";


    /* No photos */

    if (!photos || photos.length === 0) {

        memoryResults.innerHTML = `

            <div class="empty-message">

                <h3>
                    No memories yet
                </h3>

                <p>
                    There are no photos in
                    ${monthNames[monthFolder] || monthFolder}.
                </p>

            </div>

        `;

        return;

    }


    /* =========================================
       RESULTS HEADING
    ========================================= */

    const heading =
        document.createElement("div");

    heading.classList.add(
        "memory-results-heading"
    );

    heading.innerHTML = `

        <p class="eyebrow">
            MEMORIES
        </p>

        <h3>
            ${monthNames[monthFolder] || monthFolder}
        </h3>

    `;

    memoryResults.appendChild(heading);


    /* =========================================
       PHOTO GRID
    ========================================= */

    const gallery =
        document.createElement("div");

    gallery.classList.add("photo-grid");


    /* =========================================
       CREATE PHOTO CARDS
    ========================================= */

    photos.forEach(function (photo, index) {

        const photoCard =
            document.createElement("div");

        photoCard.classList.add(
            "photo-card"
        );


        const imagePath =
            `./images/${year}/${monthFolder}/${photo}`;


        photoCard.innerHTML = `

            <img
                src="${imagePath}"
                alt="Memory from ${monthNames[monthFolder] || monthFolder}"
                loading="lazy"
            >

            <div class="photo-info">

                <h3>
                    Memory ${index + 1}
                </h3>

                <p>
                    ${monthNames[monthFolder] || monthFolder}
                </p>

            </div>

        `;


        gallery.appendChild(photoCard);

    });


    memoryResults.appendChild(gallery);

}


/* =========================================
   CLICK OUTSIDE MODAL TO CLOSE
========================================= */

if (memoryModal) {

    memoryModal.addEventListener("click", function (event) {

        if (event.target === memoryModal) {

            closeMemoryBrowser();

        }

    });

}


/* =========================================
   ESCAPE KEY TO CLOSE
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeMemoryBrowser();

    }

});


/* =========================================
   INITIALISE MONTHS
========================================= */

if (yearSelect && monthSelect) {

    updateMonthDropdown();

}


/* =========================================
   SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {

                console.log(
                    "Service Worker registered!"
                );

            })
            .catch(error => {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            });

    });

}