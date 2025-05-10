document.addEventListener("DOMContentLoaded", async () => {
  const detailRoot = document.getElementById("car-details");
  const id = Number(new URLSearchParams(location.search).get("id"));

  if (!id || !detailRoot) {
    detailRoot.innerHTML = `<p style="color:red;">Geçersiz ID parametresi.</p>`;
    return;
  }

  try {
    const res = await fetch(`backend/get-cars.php?id=${id}`);
    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Geçersiz JSON cevabı:\n" + text.slice(0, 300));
    }

    if (!data.ok) throw new Error(data.msg);
    const car = data.car;

    detailRoot.innerHTML = `
      <a href="cars.html" class="btn back-btn"><i class="fa-solid fa-angle-left"></i> Araçlara Dön</a>

      <div class="car-card">
        <div class="detail-header">
          <p class="category">${car.segment}</p>
          <h3>${car.name}</h3>
        </div>

        <img src="${car.image}" alt="${car.name}" class="detail-img">

        <div class="detail-bottom">
          <div>
            <h4>Araç Özellikleri</h4>
            <ul>
              <li><i class="fa-solid fa-user-group"></i> ${car.passengers} Yetişkin</li>
              <li><i class="fa-solid fa-suitcase-rolling"></i> ${car.luggage} Bagaj</li>
              <li><i class="fa-solid fa-airbag"></i> ${car.airbag ? "Airbag Var" : "Yok"}</li>
              <li><i class="fa-solid fa-shield-halved"></i> ${car.abs ? "ABS Var" : "Yok"}</li>
              <li><i class="fa-solid fa-gas-pump"></i> ${car.fuel}</li>
              <li><i class="fa-solid fa-gear"></i> ${car.gearbox}</li>
              <li><i class="fa-solid fa-calendar"></i> ${car.year}</li>
              <li><i class="fa-solid fa-money-bill-wave"></i> ${car.price} ₺/gün</li>
            </ul>
          </div>

          <div>
            <h4>Kiralama Koşulları</h4>
            <ul>
              <li><i class="fa-solid fa-id-card"></i> Ehliyet Yaşı 1 ve Üzeri</li>
              <li><i class="fa-solid fa-cake-candles"></i> 21 Yaş ve Üstü</li>
              <li><i class="fa-solid fa-credit-card"></i> 1 Kredi Kartı</li>
            </ul>
          </div>
        </div>
      </div>

      <form id="rentForm" class="reserve-box">
        <h4>Rezervasyon Yap</h4>
        <label for="start">Başlangıç Tarihi</label>
        <input type="date" id="start" name="start" required>

        <label for="end">Bitiş Tarihi</label>
        <input type="date" id="end" name="end" required>

        <button type="submit" class="btn rent-btn">Kirala</button>
        <p id="rentMsg" class="error hidden" style="margin-top:.5rem"></p>
      </form>
    `;

    const rentFrm = document.getElementById("rentForm");
    const rentMsg = document.getElementById("rentMsg");

    rentFrm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      rentMsg.classList.add("hidden");

      const fd = new FormData(rentFrm);
      fd.append("car_id", car.id);

      try {
        const r = await fetch("backend/reserve-car.php", {
          method: "POST",
          body: fd,
        });

        const js = await r.json();

        if (!r.ok || !js.ok) throw new Error(js.msg || "Sunucu hatası");
        alert("✅ Rezervasyon başarıyla oluşturuldu.");
        location.href = "cars.html";
      } catch (err) {
        rentMsg.textContent = err.message;
        rentMsg.classList.remove("hidden");
      }
    });
  } catch (err) {
    detailRoot.innerHTML = `<p style="color:red;">${err.message}</p>`;
    console.error("🔴 get-cars.php cevabı:", err);
  }
});
