// ==========================================
// DATA OUTFIT GALERI
// ==========================================

const outfits = [
    {
        id: 1,
        title: "Simple Campus Look",
        category: "CASUAL CAMPUS",
        image: "img-galeri/simple-cl.jpg",
        description: "Collegiate Casual Look",
        tags: ["Basic T-Shirt",
            "Jeans",
            "Sneakers"],
        colorPalette: ["#FFFFFF", "#4169E1", "#FFFFFF"]
    },
    {
        id: 2,
        title: "Clean Campus Outfit",
        category: "CASUAL CAMPUS",
        image: "img-galeri/clean-cl.jpg",
        description: "Collegiate Casual Look",
        tags: [
            "Shirt",
            "Straight Pants",
            "Sneakers"],
        colorPalette: ["#fdfafa", "#dbc88d", "#ffffff"]
    },
    {
        id: 3,
        title: "Campus Formal",
        category: "FORMAL CAMPUS",
        image: "img-galeri/formal-cl.jpg",
        description: "Formal Presentation Look",
        tags: [
            "Shirt",
            "Chinos",
            "Loafers"
        ],
        colorPalette: ["#1B365D", "#452c17", "#4A3B32"]
    },
    {
        id: 4,
        title: "Relaxed Streetwear",
        category: "STREETWEAR",
        image: "img-galeri/street-cl.jpg",
        description: "Relaxed Street Style",
        tags: [
            "Hoodie",
            "Cargo",
            "Sneakers"
        ],
        colorPalette: ["#333333", "#556B2F", "#111111"]
    },
    {
        id: 5,
        title: "Soft Campus Look",
        category: "ELEGANT CAMPUS",
        image: "img-galeri/soft-cl.jpg",
        description: "Soft & Elegant Look",
        tags: [
            "Blouse",
            "Kulot",
            "Flats"
        ],
        colorPalette: ["#FFF0F5", "#8B008B", "#E6E6FA"]
    },
    {
        id: 6,
        title: "Hijab Daily Look",
        category: "HIJAB CAMPUS",
        image: "img-galeri/hijab-cl.jpg",
        description: "Daily Hijab Outfit",
        tags: [
            "Sweater",
            "Jeans",
            "Sneakers"
        ],
        colorPalette: ["#3f3d3a", "#3B5998", "#070505"]
    },
    {
        id: 7,
        title: "Modern Campus",
        category: "MODERN CAMPUS",
        image: "img-galeri/modern-cl.jpg",
        description: "Modern Campus Outfit",
        tags: ["Basic Top",
            "Wide Pants",
            "Sneakers"],
        colorPalette: ["#000000", "#44494e", "#010101"]
    },
    {
        id: 8,
        title: "Elegant Hijab Look",
        category: "HIJAB CAMPUS",
        image: "img-galeri/elegant-cl.jpg",
        description: "Elegant Hijab Style",
        tags: ["Blouse",
            "Long Skirt",
            "Boots"
        ],
        colorPalette: ["#FAF0E6", "#f7f1f1", "#432b02"]
    }
];

// Helper: Mencari item berdasarkan nama tag
function findItemByName(tagName) {
    if (!tagName) return null;
    const cleanTag = tagName.toLowerCase().trim();

    const safeShirts = typeof shirts !== 'undefined' ? shirts : [];
    const safePants = typeof pants !== 'undefined' ? pants : [];
    const safeShoes = typeof shoes !== 'undefined' ? shoes : [];

    const shirtMatch = safeShirts.find(s => s.name && s.name.toLowerCase() === cleanTag);
    if (shirtMatch) return { ...shirtMatch, type: "ATASAN" };

    const pantMatch = safePants.find(p => p.name && p.name.toLowerCase() === cleanTag);
    if (pantMatch) return { ...pantMatch, type: "BAWAHAN" };

    const shoeMatch = safeShoes.find(sh => sh.name && sh.name.toLowerCase() === cleanTag);
    if (shoeMatch) return { ...shoeMatch, type: "SEPATU" };

    return null;
}

// Helper: Menhitung Indeks Harmoni Gaya dan Gaya Dominan
function calculateAnalysis(tags) {
    const totalScores = { casual: 0, modern: 0, streetwear: 0, formal: 0, elegant: 0 };
    let matchedCount = 0;

    if (!tags || !Array.isArray(tags)) return { score: 0, dominantStyle: "-" };

    tags.forEach(tag => {
        const item = findItemByName(tag);
        if (item && item.style) {
            matchedCount++;
            for (const key in totalScores) {
                totalScores[key] += item.style[key] || 0;
            }
        }
    });

    if (matchedCount === 0) return { score: 85, dominantStyle: "Casual Modern" };

    let highestScore = 0;
    let primaryStyle = "Casual";
    let secondaryStyle = "Modern";

    // Hitung rata-rata
    for (const key in totalScores) {
        totalScores[key] = Math.round(totalScores[key] / matchedCount);
    }

    // Cari 2 gaya tertinggi
    const sortedStyles = Object.keys(totalScores).sort((a, b) => totalScores[b] - totalScores[a]);
    
    primaryStyle = sortedStyles[0].charAt(0).toUpperCase() + sortedStyles[0].slice(1);
    secondaryStyle = sortedStyles[1].charAt(0).toUpperCase() + sortedStyles[1].slice(1);
    
    // Nilai persentase keberhasilan harmoni gaya
    const harmonyScore = Math.min(98, Math.max(75, Math.round((totalScores[sortedStyles[0]] + totalScores[sortedStyles[1]]) / 2)));

    return {
        score: harmonyScore,
        dominantStyle: `${primaryStyle} ${secondaryStyle}`
    };
}

// ==========================================
// ELEMENT DOM
// ==========================================

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const noResult = document.getElementById("noResult");
const modal = document.getElementById("outfitModal");
const closeModal = document.getElementById("closeModal");

let currentFilter = "all";

// ==========================================
// DISPLAY GALLERY
// ==========================================

function displayGallery() {
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const filteredOutfits = outfits.filter(outfit => {
        const matchesFilter = currentFilter === "all" || outfit.category.toLowerCase().includes(currentFilter.toLowerCase());
        const searchableText = (
            outfit.title + " " +
            outfit.category + " " +
            outfit.tags.join(" ")
        ).toLowerCase();

        const matchesSearch = searchableText.includes(searchText);
        return matchesFilter && matchesSearch;
    });

    if (!galleryGrid) return;
    galleryGrid.innerHTML = "";

    if (filteredOutfits.length === 0) {
        if (noResult) noResult.classList.remove("hidden");
        return;
    }

    if (noResult) noResult.classList.add("hidden");

    filteredOutfits.forEach(outfit => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.innerHTML = `
            <img src="${outfit.image}" alt="${outfit.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${outfit.title}</h3>
                <span>${outfit.category}</span>
            </div>
        `;

        item.addEventListener("click", function () {
            openOutfitModal(outfit);
        });

        galleryGrid.appendChild(item);
    });
}

// ==========================================
// OPEN & CLOSE MODAL
// ==========================================

function openOutfitModal(outfitData) {
    if (!modal) return;

    // Set Info Dasar
    document.getElementById("modalImage").src = outfitData.image;
    document.getElementById("modalImage").alt = outfitData.title;
    document.getElementById("modalCategory").textContent = outfitData.category;
    document.getElementById("modalTitle").textContent = outfitData.title;

    // Analysis Calculation
    const analysis = calculateAnalysis(outfitData.tags);
    document.getElementById("harmonyScore").textContent = `${analysis.score}%`;
    document.getElementById("dominantStyle").textContent = `Gaya Dominan: ${analysis.dominantStyle}`;

// Render Rincian Item Busana (Kartu Kapsul Baru)
    const itemsList = document.getElementById("modalItemsList");
    itemsList.innerHTML = "";

    outfitData.tags.forEach((tagName, index) => {
        const itemInfo = findItemByName(tagName);
        const itemType = itemInfo ? itemInfo.type : (index === 0 ? "ATASAN" : index === 1 ? "BAWAHAN" : "SEPATU");
        const hexColor = outfitData.colorPalette[index] || "#FFFFFF";

        const itemCard = document.createElement("div");
        itemCard.className = "item-card";
        itemCard.innerHTML = `
            <div class="item-left">
                <div class="color-dot" style="background-color: ${hexColor};"></div>
                <div class="item-info">
                    <div class="item-category-subtitle">${itemType}</div>
                    <div class="item-name">${tagName}</div>
                </div>
            </div>
            <div class="item-color-code">${hexColor} ✓</div>
        `;
        itemsList.appendChild(itemCard);
    });

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeOutfitModal() {
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

// ==========================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================

if (filterButtons) {
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            currentFilter = this.dataset.filter;
            displayGallery();
        });
    });
}

if (searchInput) {
    searchInput.addEventListener("input", displayGallery);
}

if (closeModal) {
    closeModal.addEventListener("click", closeOutfitModal);
}

if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeOutfitModal();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeOutfitModal();
    }
});

// Load awal galeri
displayGallery();