/********************************************************************
 *  main.js  – Araç listesi, araç detayı, kampanya detayı, auth-modal
 *  (kiralama “Hemen Kirala” butonu **kaldırıldı**, geri butonu eklendi)
 ********************************************************************/

document.addEventListener("DOMContentLoaded", () => {
   /* =========== 0) ŞEHİR ve ARAMA FONKSİYONU (yeni) =================== */
   (async () => {
    const pickSel  = document.getElementById('pickup');
    const dropSel  = document.getElementById('dropoff');
    const searchBt = document.getElementById('searchBtn');
    const gridEl   = document.getElementById('resultGrid');
    if (!pickSel || !dropSel || !searchBt || !gridEl) return;

    /* ---- şehirleri doldur ---- */
    let cities = [];
    try {
      const r = await fetch('backend/cities.php');
      if (!r.ok) throw 0;
      cities = await r.json();                 // [{id,name,total_cars}]
    } catch {
      cities = [
        {id:1,name:'İstanbul',total_cars:3},
        {id:2,name:'Ankara',  total_cars:2},
        {id:3,name:'İzmir',   total_cars:1}
      ];
    }
    cities.forEach(c=>{
      pickSel.add(new Option(`${c.name} (${c.total_cars})`, c.id));
      dropSel.add(new Option(c.name, c.id));
    });

    /* ---- Ara butonu ---- */
    searchBt.addEventListener('click', ()=>{
      const cityId = Number(pickSel.value);
      const matches = cars.filter(c=>c.cities.includes(cityId));   // cars dizisi altta
      gridEl.innerHTML = matches.length
        ? matches.map(c=>`
            <div class="card">
              <img src="${c.image}" alt="${c.name}">
              <h3>${c.name}</h3>
              <p><strong>${c.price} TL/gün</strong></p>
              <a class="btn" href="car-detail.html?id=${c.id}">Detay</a>
            </div>`).join('')
        : '<p style="grid-column:1/-1;color:#fff">Bu şehirde uygun araç yok.</p>';
      gridEl.classList.remove('hidden');
      gridEl.scrollIntoView({behavior:'smooth'});
    });
  })();


  });
  