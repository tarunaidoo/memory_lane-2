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
        "Sept26": [
            "Sept26_1.jpeg",
            "Sept26_2.jpeg",
            "Sept26_3.jpeg"
        ]
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
    Sept26: "September",
    Sept25: "September",
    Oct25: "October",
    Nov25: "November",
    Dec25: "December"
};


const monthNumbers = {
    Jan26: 1,
    Feb26: 2,
    Mar26: 3,
    Apr26: 4,
    May26: 5,
    Jun26: 6,
    Jul26: 7,
    Aug26: 8,
    Sept26: 9,
    Sept25: 9,
    Oct25: 10,
    Nov25: 11,
    Dec25: 12
};


const exploreButton =
    document.getElementById("exploreButton");

const albumGrid =
    document.getElementById("albumGrid");

const monthSection =
    document.getElementById("monthSection");

const monthList =
    document.getElementById("monthList");

const selectedYearLabel =
    document.getElementById("selectedYearLabel");

const selectedYearTitle =
    document.getElementById("selectedYearTitle");

const backToYearsButton =
    document.getElementById("backToYearsButton");

const mainGallery =
    document.getElementById("mainGallery");

const memoriesEyebrow =
    document.getElementById("memoriesEyebrow");

const memoriesTitle =
    document.getElementById("memoriesTitle");

const memoriesDescription =
    document.getElementById("memoriesDescription");


let selectedYear = null;
let selectedMonth = null;


function scrollToAlbums() {
    const albumsSection =
        document.getElementById("albums");

    if (!albumsSection) {
        return;
    }

    albumsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function createYearCards() {
    if (!albumGrid) {
        return;
    }

    albumGrid.innerHTML = "";

    const years = Object.keys(memories)
        .sort((a, b) => Number(b) - Number(a));

    years.forEach((year) => {

        const card =
            document.createElement("button");

        card.type = "button";
        card.className = "album-card";

        const content =
            document.createElement("div");

        content.className =
            "album-card-content";

        const eyebrow =
            document.createElement("p");

        eyebrow.className = "eyebrow";
        eyebrow.textContent = "MEMORIES";

        const title =
            document.createElement("h3");

        title.textContent = year;

        const description =
            document.createElement("p");

        const monthCount =
            Object.keys(memories[year]).length;

        description.textContent =
            `${monthCount} ${monthCount === 1 ? "month" : "months"} of memories`;

        content.appendChild(eyebrow);
        content.appendChild(title);
        content.appendChild(description);

        card.appendChild(content);

        card.addEventListener("click", () => {
            selectYear(year);
        });

        albumGrid.appendChild(card);
    });
}


function selectYear(year) {

    selectedYear = year;
    selectedMonth = null;

    if (!monthSection) {
        return;
    }

    monthSection.hidden = false;

    if (selectedYearLabel) {
        selectedYearLabel.textContent =
            `${year} MEMORIES`;
    }

    if (selectedYearTitle) {
        selectedYearTitle.textContent =
            `Choose a month`;
    }

    createMonthButtons(year);

    displayLatestMemories();

    monthSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function createMonthButtons(year) {

    if (!monthList) {
        return;
    }

    monthList.innerHTML = "";

    const months =
        Object.keys(memories[year] || {});

    months.sort((a, b) => {
        return monthNumbers[a] - monthNumbers[b];
    });

    months.forEach((monthFolder) => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "month-button";

        button.textContent =
            monthNames[monthFolder] || monthFolder;

        button.addEventListener("click", () => {
            selectMonth(year, monthFolder);
        });

        monthList.appendChild(button);
    });
}


function selectMonth(year, monthFolder) {

    selectedYear = year;
    selectedMonth = monthFolder;

    const buttons =
        document.querySelectorAll(".month-button");

    buttons.forEach((button) => {
        button.classList.remove("active");

        if (
            button.textContent ===
            monthNames[monthFolder]
        ) {
            button.classList.add("active");
        }
    });

    displayMemories(year, monthFolder);

    const memoriesSection =
        document.getElementById("memories");

    if (memoriesSection) {
        memoriesSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


function displayMemories(year, monthFolder) {

    if (!mainGallery) {
        return;
    }

    const photos =
        memories[year]?.[monthFolder];

    mainGallery.innerHTML = "";

    if (!photos || photos.length === 0) {

        const message =
            document.createElement("p");

        message.className =
            "empty-message";

        message.textContent =
            "No memories found for this month.";

        mainGallery.appendChild(message);

        return;
    }

    if (memoriesEyebrow) {
        memoriesEyebrow.textContent =
            "MEMORIES";
    }

    if (memoriesTitle) {
        memoriesTitle.textContent =
            `${monthNames[monthFolder]} ${year}`;
    }

    if (memoriesDescription) {
        memoriesDescription.textContent =
            `${photos.length} ${
                photos.length === 1
                    ? "memory"
                    : "memories"
            } from this month.`;
    }

    photos.forEach((photo) => {

        const photoCard =
            document.createElement("div");

        photoCard.className =
            "photo-card";

        const image =
            document.createElement("img");

        image.src =
            `./images/${year}/${monthFolder}/${photo}`;

        image.alt =
            `${monthNames[monthFolder]} ${year} memory`;

        image.loading = "lazy";

        image.addEventListener("error", () => {

            image.style.display = "none";

            const errorMessage =
                document.createElement("p");

            errorMessage.className =
                "empty-message";

            errorMessage.textContent =
                `Unable to load ${photo}.`;

            photoCard.appendChild(errorMessage);
        });

        const caption =
            document.createElement("p");

        caption.textContent =
            `${monthNames[monthFolder]} ${year}`;

        photoCard.appendChild(image);
        photoCard.appendChild(caption);

        mainGallery.appendChild(photoCard);
    });
}


function displayLatestMemories() {

    if (!mainGallery) {
        return;
    }

    const currentDate =
        new Date();

    const allMemories = [];

    Object.keys(memories).forEach((year) => {

        Object.keys(memories[year]).forEach((monthFolder) => {

            const monthNumber =
                monthNumbers[monthFolder];

            if (!monthNumber) {
                return;
            }

            const memoryDate =
                new Date(
                    Number(year),
                    monthNumber - 1,
                    1
                );

            if (memoryDate <= currentDate) {

                memories[year][monthFolder].forEach(
                    (photo) => {

                        allMemories.push({
                            year: Number(year),
                            monthFolder: monthFolder,
                            photo: photo,
                            date: memoryDate
                        });

                    }
                );
            }
        });
    });

    allMemories.sort((a, b) => {
        return b.date - a.date;
    });

    const latestMemories =
        allMemories.slice(0, 3);

    mainGallery.innerHTML = "";

    if (memoriesEyebrow) {
        memoriesEyebrow.textContent =
            "LATEST MEMORIES";
    }

    if (memoriesTitle) {
        memoriesTitle.textContent =
            "Latest Memories";
    }

    if (memoriesDescription) {
        memoriesDescription.textContent =
            "The latest moments added to Memory Lane.";
    }

    latestMemories.forEach((memory) => {

        const photoCard =
            document.createElement("div");

        photoCard.className =
            "photo-card";

        const image =
            document.createElement("img");

        image.src =
            `./images/${memory.year}/${memory.monthFolder}/${memory.photo}`;

        image.alt =
            `${monthNames[memory.monthFolder]} ${memory.year} memory`;

        image.loading = "lazy";

        const caption =
            document.createElement("p");

        caption.textContent =
            `${monthNames[memory.monthFolder]} ${memory.year}`;

        photoCard.appendChild(image);
        photoCard.appendChild(caption);

        mainGallery.appendChild(photoCard);
    });
}


function showLatestMemories() {

    selectedYear = null;
    selectedMonth = null;

    if (monthSection) {
        monthSection.hidden = true;
    }

    displayLatestMemories();
}


if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        scrollToAlbums
    );
}


if (backToYearsButton) {

    backToYearsButton.addEventListener(
        "click",
        showLatestMemories
    );
}


createYearCards();

displayLatestMemories();


if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(() => {
                console.log(
                    "Service Worker registered!"
                );
            })

            .catch((error) => {
                console.error(
                    "Service Worker registration failed:",
                    error
                );
            });

    });
}