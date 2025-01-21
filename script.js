// Data roti
const rotiList = [
    { name: "Croissant", img src="Croissant.png" },
    { name: "Donut", img src="Donut.png" },
    { name: "Baguette", img src=".png" },
    { name: "Roti Tawar", img src=".png" }
    { name: "Roti Canai", img src=".png" }
    { name: "Bagel", img src=".png" }
    { name: "Tortilla", img src=".png" }
    { name: "Sourdough ", img src=".png" }
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

