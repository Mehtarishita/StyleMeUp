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
