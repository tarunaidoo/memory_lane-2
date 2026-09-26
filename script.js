const memories = {
    2025: {
        "Sept25": ["photo1.png"],
        "Oct25": ["photo2.png"],
        "Nov25": ["photo3.png"],
        "Dec25": ["photo4.png"]
    },

    2026: {
        "Jan26": ["photo10.png"],
        "Feb26": ["photo11.png"],
        "Mar26": ["photo7.png"],
        "Apr26": ["photo11.png"],
        "May26": ["photo6.png"],
        "Jun26": ["photo8.png"],
        "Jul26": ["photo9.png"],
        "Aug26": ["photo11.png"],
        "Sep26": ["photo5.png"]
    }
};

const monthNames = {
    Jan26: "January",
    Feb26: "February",
    Mar26: "March",
    Apr26: "April",
    May26: "May",
    Jun26: "June",
    Jul26: "July",
    Aug26: "August",
    Sep26: "September",
    Oct25: "October",
    Nov25: "November",
    Dec25: "December",
    Sept25: "September"
};

const exploreButton = document.getElementById("exploreButton");
const album2026 = document.getElementById("album2026");
const albumAdventures = document.getElementById("albumAdventures");
const albumSpecial = document.getElementById("albumSpecial");

const closeMemoryButton = document.getElementById("closeMemoryButton");
const memoryModal = document.getElementById("memoryModal");

const yearSelect = document.getElementById("yearSelect");
const monthSelect = document.getElementById("monthSelect");
const viewMemoriesButton = document.getElementById("viewMemoriesButton");
const memoryResults = document.getElementById("memoryResults");

function openMemoryBrowser() {
    if (!memoryModal) {
        console.error("Memory modal was not found.");
        return;
    }

    memoryModal.classList.add("active");
    memoryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    updateMonthDropdown();
}

function closeMemoryBrowser() {
    if (!memoryModal) {
        return;
    }

    memoryModal.classList.remove("active");
    memoryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function updateMonthDropdown() {
    if (!yearSelect || !monthSelect) {
        return;
    }

    const selectedYear = yearSelect.value;
    const yearMemories = memories[selectedYear];

    monthSelect.innerHTML = "";

    if (!yearMemories) {
        return;
    }

    Object.keys(yearMemories).forEach((monthFolder) => {
        const option = document.createElement("option");

        option.value = monthFolder;
        option.textContent = monthNames[monthFolder] || monthFolder;

        monthSelect.appendChild(option);
    });
}

function displayMemories() {
    if (!yearSelect || !monthSelect || !memoryResults) {
        return;
    }

    const year = yearSelect.value;
    const monthFolder = monthSelect.value;

    const photos = memories[year]?.[monthFolder];

    memoryResults.innerHTML = "";

    if (!photos || photos.length === 0) {
        const message = document.createElement("p");

        message.className = "empty-message";
        message.textContent = "No memories found for this month.";

        memoryResults.appendChild(message);

        return;
    }

    photos.forEach((photo) => {
        const photoCard = document.createElement("div");

        photoCard.className = "memory-photo-card";

        const image = document.createElement("img");

        image.src = `./images/${year}/${monthFolder}/${photo}`;
        image.alt = `${monthNames[monthFolder] || monthFolder} ${year} memory`;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.style.display = "none";

            const errorMessage = document.createElement("p");

            errorMessage.className = "empty-message";
            errorMessage.textContent = `Unable to load ${photo}.`;

            photoCard.appendChild(errorMessage);
        });

        const monthLabel = document.createElement("p");

        monthLabel.className = "memory-month";
        monthLabel.textContent = `${monthNames[monthFolder] || monthFolder} ${year}`;

        photoCard.appendChild(image);
        photoCard.appendChild(monthLabel);

        memoryResults.appendChild(photoCard);
    });
}

if (exploreButton) {
    exploreButton.addEventListener("click", openMemoryBrowser);
}

if (album2026) {
    album2026.addEventListener("click", openMemoryBrowser);
}

if (albumAdventures) {
    albumAdventures.addEventListener("click", openMemoryBrowser);
}

if (albumSpecial) {
    albumSpecial.addEventListener("click", openMemoryBrowser);
}

if (closeMemoryButton) {
    closeMemoryButton.addEventListener("click", closeMemoryBrowser);
}

if (yearSelect) {
    yearSelect.addEventListener("change", () => {
        updateMonthDropdown();

        if (memoryResults) {
            memoryResults.innerHTML = `
                <p class="empty-message">
                    Select a month to view memories.
                </p>
            `;
        }
    });
}

if (viewMemoriesButton) {
    viewMemoriesButton.addEventListener("click", displayMemories);
}

if (memoryModal) {
    memoryModal.addEventListener("click", (event) => {
        if (event.target === memoryModal) {
            closeMemoryBrowser();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        memoryModal &&
        memoryModal.classList.contains("active")
    ) {
        closeMemoryBrowser();
    }
});

updateMonthDropdown();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registered!");
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });
    });
}