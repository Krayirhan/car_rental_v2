// ✅ assets/js/load-cars.js

// Araba listesini al ve HTML'e bas

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("carsContainer");
  
    try {
      const res = await fetch("backend/get-cars.php");
      const cars = await res.json();
  
      if (!Array.isArray(cars) || cars.length === 0) {
        container.innerHTML = `<p style="color:#fff; grid-column:1/-1; text-align:center;">Henüz listelenecek araç yok.</p>`;
        return;
      }
  
      container.innerHTML = "";
      cars.forEach(car => {
        const card = document.createElement("div");
        card.className = "cars-card";
        card.innerHTML = `
          <img src="${car.image}" alt="${car.name}" />
          <h3>${car.name}</h3>
          <p>${car.description || "Açıklama mevcut değil."}</p>
          <a href="car-detail.html?id=${car.id}" class="btn">Detayları Gör</a>
        `;
        container.appendChild(card);
      });
    } catch (err) {
      container.innerHTML = `<p style="color:red;">Araçlar yüklenirken bir hata oluştu.</p>`;
      console.error("Hata:", err);
    }
  });
  