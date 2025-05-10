document.addEventListener("DOMContentLoaded", async () => {
  const dailyContainer = document.querySelector("#gunluk .grid");
  const monthlyContainer = document.querySelector("#aylik .grid");
  const campRoot = document.getElementById("campaign-details");

  // Kampanyaları getir (isteğe bağlı tip: 'gunluk' veya 'aylik' veya boş)
  const fetchCampaigns = async (type = "") => {
    try {
      const endpoint = type ? `backend/get-campaigns.php?type=${type}` : `backend/get-campaigns.php`;
      const res = await fetch(endpoint);
      return await res.json();
    } catch (err) {
      console.error("Kampanyalar alınamadı:", err);
      return [];
    }
  };

  // Kart HTML'i oluştur
  const createCard = (c) => `
    <div class="card">
      <img src="${c.image}" alt="${c.title}">
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <a href="kampanya.html?id=${c.id}" class="btn">Detayları Gör</a>
    </div>
  `;

  // kampanyalar.html sayfasıysa:
  if (dailyContainer && monthlyContainer) {
    const gunluk = await fetchCampaigns("gunluk");
    const aylik = await fetchCampaigns("aylik");

    dailyContainer.innerHTML = gunluk.map(createCard).join("");
    monthlyContainer.innerHTML = aylik.map(createCard).join("");
  }

  // kampanya.html sayfasıysa:
  if (campRoot) {
    const id = new URLSearchParams(window.location.search).get("id");
    const allCampaigns = await fetchCampaigns();

    const campaign = allCampaigns.find(c => String(c.id) === String(id));

    if (!campaign) {
      campRoot.innerHTML = `<p style="text-align:center">Kampanya bulunamadı.</p>`;
    } else {
      campRoot.innerHTML = `
        <h2 class="text-glow" style="text-align:center">${campaign.title}</h2>
        <img src="${campaign.image}" alt="${campaign.title}" class="rounded"
            style="display:block;margin:1rem auto;max-width:600px;width:100%">
        <div class="card" style="padding:1.5rem;margin-top:1rem">
          <p>${campaign.description}</p>
          <hr style="margin:1rem 0; opacity:.3">
          <h4 style="color:#00fff7; margin-bottom:.5rem;">Kampanya Detayları</h4>
          <p style="line-height:1.6">${(campaign.details || "").replace(/\n/g, "<br>")}</p>
        </div>
      `;
    }
  }
});
