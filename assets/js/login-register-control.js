  
    /* ------------ 5)   AUTH MODAL + NAVBAR ----- */
    const modalBg   = document.getElementById("authModal");
    const authTitle = document.getElementById("authTitle");
    const authForm  = document.getElementById("authForm");
    const switchTxt = document.getElementById("authSwitchText");
    const authMsg   = document.getElementById("authMsg");
  
    window.toggleAuth = show => modalBg?.classList.toggle("active",show);
    modalBg?.addEventListener("click",e=>{ if(e.target.id==="authModal") toggleAuth(false); });
  
    window.switchToRegister = ()=>{
      authTitle.textContent="Kayıt Ol";
      authForm.action="backend/register.php";
      authForm.innerHTML=`
        <input type="text" name="name" placeholder="Ad Soyad" required>
        <input type="email" name="email" placeholder="E-Posta" required>
        <input type="password" name="password" placeholder="Şifre" required>
        <button class="btn">Kayıt Ol</button>`;
      switchTxt.innerHTML=`Zaten hesabınız var mı? <a href="#" onclick="switchToLogin()">Giriş Yap</a>`;
    };
  
    window.switchToLogin = ()=>{
      authTitle.textContent="Giriş Yap";
      authForm.action="backend/login.php";
      authForm.innerHTML=`
        <input type="email" name="email" placeholder="E-Posta" required>
        <input type="password" name="password" placeholder="Şifre" required>
        <button class="btn">Giriş</button>`;
      switchTxt.innerHTML=`Hesabınız yok mu? <a href="#" onclick="switchToRegister()">Kayıt Ol</a>`;
    };
  
    authForm.addEventListener("submit",async e=>{
      e.preventDefault();
      authMsg.classList.add("hidden");
      try{
        const r  = await fetch(authForm.action,{method:"POST",body:new FormData(authForm)});
        if(!r.ok) throw new Error("Sunucu hatası ("+r.status+")");
        const js = await r.json();
        if(!js.ok) throw new Error(js.msg||"İşlem başarısız");
  
        /* Başarılı */
        localStorage.setItem("rentoUser",js.name);
        toggleAuth(false);
        updateNavbar(true,js.name);
        if(!location.pathname.endsWith("/index.html") && location.pathname!=="/")
          location.href ="index.html";
        else
          location.reload();
      }catch(err){
        authMsg.textContent=err.message;
        authMsg.classList.remove("hidden");
      }
    });
  
    /* -------------- NAVBAR (SADECE BU KISIM GÜNCELLENDİ) -------------- */
    function updateNavbar (logged, name = '') {
        const loginL = document.getElementById('loginLink');
        const regL   = document.getElementById('registerLink');
        const profM  = document.getElementById('profileMenu');
        const profN  = document.getElementById('profileName');
      
        if (!loginL || !regL || !profM) return;     // güvenlik
      
        if (logged) {
          loginL.classList.add('hidden');
          regL.classList.add('hidden');
          profM.classList.remove('hidden');
          if (profN) profN.textContent = name;
        } else {
          loginL.classList.remove('hidden');
          regL.classList.remove('hidden');
          profM.classList.add('hidden');
          if (profN) profN.textContent = '';
        }
      }
      
      /* ---- ÇIKIŞ YAP ---- */
      window.logout = async () => {
        try { await fetch('backend/logout.php'); } catch {}
        localStorage.removeItem('rentoUser');   // tarayıcı tarafı
        updateNavbar(false);                    // linkleri geri getir
        location.reload();                      // ana sayfayı tazele
      };
      
      /* ---- Sayfa yüklenince oturum kontrolü ---- */
      (async () => {
        try {
          const res = await fetch('backend/me.php');
          if (!res.ok) throw 0;
          const d = await res.json();
          updateNavbar(d.logged, d.name);
        } catch {
          /* Sunucu cevap vermediyse localStorage’a bak */
          const name = localStorage.getItem('rentoUser');
          updateNavbar(!!name, name || '');
        }
      })();
  