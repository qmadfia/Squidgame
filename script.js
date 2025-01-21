// Data roti
const rotiList = [
    { name: "Croissant", img: "<img src='Images/Croissant.png' alt='Croissant'>" },
    { name: "Donut", img: "<img src='Images/Donut.png' alt='Donut'>" },
    { name: "Baguette", img: "<img src='Images/Baguette.png' alt='Baguette'>" },
    { name: "Roti Tawar", img: "<img src='Images/Roti Tawar.png' alt='Roti Tawar'>" },
    { name: "Roti Canai", img: "<img src='Images/Roti Canai.png' alt='Roti Canai'>" },
    { name: "Bagel", img: "<img src='Images/Bagel.png' alt='Bagel'>" },
    { name: "Tortilla", img: "<img src='Images/Tortilla.png' alt='Tortilla'>" },
    { name: "Sourdough", img: "<img src='Images/Sourdough.png' alt='Sourdough'>" }
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

    const spinResultContainer = document.getElementById("spin-result");
    spinResultContainer.innerHTML = ""; // Kosongkan hasil sebelumnya

    // Menampilkan hasil spin dengan efek rolling
    spinResults.forEach((symbol, index) => {
        const spinBox = document.createElement("div");
        spinBox.className = "spin-box rolling";
        spinBox.innerText = symbol; // Simbol awal
        spinResultContainer.appendChild(spinBox);

        // Simulasi rolling
        setTimeout(() => {
            spinBox.innerText = symbol; // Ganti dengan simbol akhir
            spinBox.classList.remove("rolling"); // Hapus efek rolling
        }, (index + 1) * 1000); // Delay untuk setiap simbol
    });

    // Menentukan hasil akhir setelah semua simbol ditampilkan
    setTimeout(() => {
        if (spinResults.every(symbol => symbol === "7")) {
            result.innerHTML += `<p>🎉 Selamat! Kamu menang 1 Miliar! 🎉</p>`;
        } else if (spinResults.includes("Bom")) {
            result.innerHTML += `<p>💥 Kamu kalah karena ada bom! 💥</p>`;
        } else {
            result.innerHTML += `<p>😐 Tidak ada hadiah kali ini.</p>`;
        }
    }, (spinResults.length + 1) * 1000); // Delay untuk menampilkan hasil akhir
});

