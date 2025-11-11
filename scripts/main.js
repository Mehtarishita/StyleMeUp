// Inject components (navbar/footer)
document.querySelectorAll('[data-include]').forEach(async (slot) => {
  const file = slot.getAttribute('data-include');
  try{
    const res = await fetch(file);
    const html = await res.text();
    slot.outerHTML = html;
    if(file.includes('navbar')) hookNavbar();
  }catch(e){ console.warn('Include failed:', file, e); }
});

// Navbar mobile toggle
function hookNavbar(){
  const nav = document.querySelector('.nav');
  const toggle = nav?.querySelector('.nav__toggle');
  if(!toggle) return;
  toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
}

// Smooth scroll for in-page anchors
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  const target = document.querySelector(id);
  if(target){
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  }
});
// Navbar Load
fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch(err => console.error("Navbar load error:", err));

// Footer Load
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(err => console.error("Footer load error:", err));


// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for reaching out! We’ll get back to you soon.");
      form.reset();
    });
  }
});
