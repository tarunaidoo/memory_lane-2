/* =========================================
MEMORY LANE
MAIN JAVASCRIPT
========================================= */

/* =========================================
MEMORY DATA
========================================= */

const memories = {

```
"2025": {

    "Sept25": [
        "photo1.png"
    ],

    "Oct25": [
        "photo2.png"
    ],

    "Nov25": [
        "photo3.png"
    ],

    "Dec25": [
        "photo4.png"
    ]

},


"2026": {

    "Jan26": [
        "photo10.png"
    ],

    "Feb26": [
        "photo11.png"
    ],

    "Mar26": [
        "photo7.png"
    ],

    "Apr26": [
        "photo11.png"
    ],

    "May26": [
        "photo6.png"
    ],

    "Jun26": [
        "photo8.png"
    ],

    "Jul26": [
        "photo9.png"
    ],

    "Aug26": [
        "photo11.png"
    ],

    "Sep26": [
        "photo5.png"
    ]

}
```

};

/* =========================================
FRIENDLY MONTH NAMES
========================================= */

const monthNames = {

```
"Sept25": "September 2025",
"Oct25": "October 2025",
"Nov25": "November 2025",
"Dec25": "December 2025",

"Jan26": "January 2026",
"Feb26": "February 2026",
"Mar26": "March 2026",
"Apr26": "April 2026",
"May26": "May 2026",
"Jun26": "June 2026",
"Jul26": "July 2026",
"Aug26": "August 2026",
"Sep26": "September 2026"
```

};

/* =========================================
MEMORY BROWSER ELEMENTS
========================================= */

const exploreButton =
document.getElementById("exploreButton");

const album2026 =
document.getElementById("album2026");

const albumAdventures =
document.getElementById("albumAdventures");

const albumSpecial =
document.getElementById("albumSpecial");

const closeMemoryButton =
document.getElementById("closeMemoryButton");

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

```
if (!memoryModal) {

    console.error(
        "Memory modal was not found."
    );

    return;

}


memoryModal.classList.add("active");

memoryModal.setAttribute(
    "aria-hidden",
    "false"
);

document.body.classList.add(
    "modal-open"
);


updateMonthDropdown();
```

}

/* =========================================
CLOSE MEMORY BROWSER
========================================= */

function closeMemoryBrowser() {

```
if (!memoryModal) {
    return;
}


memoryModal.classList.remove("active");

memoryModal.setAttribute(
    "aria-hidden",
    "true"
);

document.body.classList.remove(
    "modal-open"
);
```

}

/* =========================================
EXPLORE BUTTON
========================================= */

if (exploreButton) {

```
exploreButton.addEventListener(
    "click",
    function () {

        openMemoryBrowser();

    }
);
```

}

/* =========================================
ALBUM BUTTONS
========================================= */

if (album2026) {

```
album2026.addEventListener(
    "click",
    function () {

        openMemoryBrowser();

    }
);
```

}

if (albumAdventures) {

```
albumAdventures.addEventListener(
    "click",
    function () {

        openMemoryBrowser();

    }
);
```

}

if (albumSpecial) {

```
albumSpecial.addEventListener(
    "click",
    function () {

        openMemoryBrowser();

    }
);
```

}

/* =========================================
CLOSE BUTTON
========================================= */

if (closeMemoryButton) {

```
closeMemoryButton.addEventListener(
    "click",
    function () {

        closeMemoryBrowser();

    }
);
```

}

/* =========================================
UPDATE MONTH DROPDOWN
========================================= */

function updateMonthDropdown() {

```
if (!yearSelect ||
    !monthSelect) {

    return;

}


const selectedYear =
    yearSelect.value;


const availableMonths =
    memories[selectedYear];


monthSelect.innerHTML = "";


if (!availableMonths) {

    const option =
        document.createElement(
            "option"
        );

    option.textContent =
        "No months available";

    option.disabled = true;

    monthSelect.appendChild(
        option
    );

    return;

}


Object.keys(availableMonths)
    .forEach(function (monthFolder) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            monthFolder;


        option.textContent =
            monthNames[monthFolder]
            || monthFolder;


        monthSelect.appendChild(
            option
        );

    });
```

}

/* =========================================
YEAR CHANGE
========================================= */

if (yearSelect) {

```
yearSelect.addEventListener(
    "change",
    function () {

        updateMonthDropdown();


        if (memoryResults) {

            memoryResults.innerHTML = `

                <p class="empty-message">

                    Select a month and click
                    "View Memories".

                </p>

            `;

        }

    }
);
```

}

/* =========================================
VIEW MEMORIES BUTTON
========================================= */

if (viewMemoriesButton) {

```
viewMemoriesButton.addEventListener(
    "click",
    function () {

        displayMemories();

    }
);
```

}

/* =========================================
DISPLAY MEMORIES
========================================= */

function displayMemories() {

```
if (!yearSelect ||
    !monthSelect ||
    !memoryResults) {

    return;

}


const year =
    yearSelect.value;


const monthFolder =
    monthSelect.value;


const photos =
    memories[year]?.[monthFolder];


memoryResults.innerHTML = "";


/* =========================================
   NO PHOTOS
========================================= */

if (!photos ||
    photos.length === 0) {

    memoryResults.innerHTML = `

        <div class="empty-message">

            <h3>
                No memories yet
            </h3>

            <p>
                There are no photos in
                ${monthNames[monthFolder]
                || monthFolder}.
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
        ${monthNames[monthFolder]
        || monthFolder}
    </h3>

`;


memoryResults.appendChild(
    heading
);


/* =========================================
   PHOTO GRID
========================================= */

const gallery =
    document.createElement("div");


gallery.classList.add(
    "photo-grid"
);


/* =========================================
   CREATE PHOTO CARDS
========================================= */

photos.forEach(
    function (photo, index) {

        const photoCard =
            document.createElement(
                "div"
            );


        photoCard.classList.add(
            "photo-card"
        );


        /*
           Build the image path
           from the year/month folder.
        */

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


        gallery.appendChild(
            photoCard
        );

    }
);


memoryResults.appendChild(
    gallery
);
```

}

/* =========================================
CLICK OUTSIDE MODAL TO CLOSE
========================================= */

if (memoryModal) {

```
memoryModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            memoryModal
        ) {

            closeMemoryBrowser();

        }

    }
);
```

}

/* =========================================
ESCAPE KEY TO CLOSE
========================================= */

document.addEventListener(
"keydown",
function (event) {

```
    if (
        event.key === "Escape" &&
        memoryModal &&
        memoryModal.classList.contains(
            "active"
        )
    ) {

        closeMemoryBrowser();

    }

}
```

);

/* =========================================
INITIALISE MONTHS
========================================= */

if (
yearSelect &&
monthSelect
) {

```
updateMonthDropdown();
```

}

/* =========================================
SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {

```
window.addEventListener(
    "load",
    function () {

        navigator.serviceWorker
            .register(
                "./service-worker.js"
            )

            .then(function () {

                console.log(
                    "Service Worker registered!"
                );

            })

            .catch(function (error) {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            });

    }
);
```

}
