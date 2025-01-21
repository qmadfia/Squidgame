// Data roti
const rotiList = [
    { name: "Croissant", img: "<img src='images/Croissant.png' alt='Croissant'>" },
    { name: "Donut", img: "<img src='images/Donut.png' alt='Donut'>" },
    { name: "Baguette", img: "<img src='images/Baguette.png' alt='Baguette'>" },
    { name: "Roti Tawar", img: "<img src='images/Roti Tawar.png' alt='Roti Tawar'>" },
    { name: "Roti Canai", img: "<img src='images/Roti Canai.png' alt='Roti Canai'>" },
    { name: "Bagel", img: "<img src='images/Bagel.png' alt='Bagel'>" },
    { name: "Tortilla", img: "<img src='images/Tortilla.png' alt='Tortilla'>" },
    { name: "Sourdough", img: "<img src='images/Sourdough.png' alt='Sourdough'>" }
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
        ${randomRoti.img}
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

