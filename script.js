// Data roti
const rotiList = [
    { name: "Croissant", image: "https://via.placeholder.com/100?text=Croissant" },
    { name: "Donut", image: "https://via.placeholder.com/100?text=Donut" },
    { name: "Baguette", image: "https://via.placeholder.com/100?text=Baguette" },
    { name: "Roti Tawar", image: "https://via.placeholder.com/100?text=Roti+Tawar" }
    { name: "Roti Canai", image: "https://via.placeholder.com/100?text=Roti+Tawar" }
    { name: "Bagel", image: "https://via.placeholder.com/100?text=Roti+Tawar" }
    { name: "Tortilla", image: "https://via.placeholder.com/100?text=Roti+Tawar" }
    { name: "Roti Maryam", image: "https://via.placeholder.com/100?text=Roti+Tawar" }
    { name: "Sourdough ", image: "https://via.placeholder.com/100?text=Roti+Tawar" }
];

// Elemen DOM
const btnRoti = document.getElementById("btn-roti");
const btnJudi = document.getElementById("btn-judi");
const result = document.getElementById("result");

// Pilih Roti
btnRoti.addEventListener("click", () => {
    const randomRoti = rotiList[Math.floor(Math.random() * rotiList.length)];
    result.innerHTML = `
        <p>Kamu mendapat: <strong>${randomRoti.name}</strong></p>
        <img src="${randomRoti.image}" alt="${randomRoti.name}">
    `;
});

// Pilih Judi
btnJudi.addEventListener("click", () => {
    const symbols = ["7", "Bom", "★"];
    const spinResults = Array(3)
        .fill()
        .map(() => symbols[Math.floor(Math.random() * symbols.length)]);

    result.innerHTML = `
        <p>Hasil spin: ${spinResults.join(" | ")}</p>
    `;

    if (spinResults.every(symbol => symbol === "7")) {
        result.innerHTML += `<p>🎉 Selamat! Kamu menang 1 Miliar! 🎉</p>`;
    } else if (spinResults.includes("Bom")) {
        result.innerHTML += `<p>💥 Kamu kalah karena ada bom! 💥</p>`;
    } else {
        result.innerHTML += `<p>😐 Tidak ada hadiah kali ini.</p>`;
    }
});

