document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const container = document.querySelector(".contact-container");
  
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const fd = new FormData(form);
      const inputs = form.querySelectorAll("input, textarea, select");
      const [name, surname, email, subject, message] = [...inputs].map(el => el.value);
  
      fd.set("name", name);
      fd.set("surname", surname);
      fd.set("email", email);
      fd.set("subject", subject);
      fd.set("message", message);
  
      try {
        const res = await fetch("backend/admin/contact.php", {
          method: "POST",
          body: fd,
        });
  
        const data = await res.json();
  
        const msg = document.createElement("div");
        msg.className = data.ok ? "success-message" : "error-message";
        msg.textContent = data.ok
          ? "Talebiniz başarıyla iletildi. En kısa sürede size geri dönüş yapılacaktır."
          : "Gönderim başarısız: " + data.msg;
  
        form.reset();
        form.insertAdjacentElement("afterend", msg);
  
        setTimeout(() => msg.remove(), 6000);
      } catch (err) {
        const errMsg = document.createElement("div");
        errMsg.className = "error-message";
        errMsg.textContent = "Gönderim sırasında teknik bir hata oluştu.";
        form.insertAdjacentElement("afterend", errMsg);
        setTimeout(() => errMsg.remove(), 6000);
        console.error(err);
      }
    });
  });