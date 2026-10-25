// KING CLASSIC BARBERSHOP — interactivity and animated wave field
// IMPORTANT: Badilisha namba hapa iwe namba ya WhatsApp ya biashara yako (country code bila +).
const WHATSAPP_NUMBER = "255700000000";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();
const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
dateInput.min = localToday;
dateInput.value = localToday;

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const service = String(data.get("service") || "");
  const date = String(data.get("date") || "");
  const time = String(data.get("time") || "");
  if (!name || !phone || !date) return;
  const message = `Habari King Classic Barbershop! Naomba miadi ya kunyoa.%0A%0AJina: ${encodeURIComponent(name)}%0ANamba yangu: ${encodeURIComponent(phone)}%0AHuduma: ${encodeURIComponent(service)}%0ATarehe: ${encodeURIComponent(date)}%0AMuda: ${encodeURIComponent(time)}%0A%0ANaomba mnithibitishie miadi.`;
  const result = document.getElementById("formResult");
  if (WHATSAPP_NUMBER === "255700000000") {
    result.textContent = "Ombi limeandaliwa. Kabla ya kutumia booking, fungua script.js na ubadilishe WHATSAPP_NUMBER iwe namba halisi ya biashara yako, mfano 2557XXXXXXXX.";
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  result.innerHTML = 'Ombi lako liko tayari. <a href="' + url + '" target="_blank" rel="noopener" style="color:#f6e3a6;text-decoration:underline">Bonyeza hapa kufungua WhatsApp na kutuma</a>.';
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Lightweight canvas wave inspired by the supplied Scroll Wave Field concept.
// This is a vanilla JavaScript/CSS implementation, so it works without React.
const canvas = document.getElementById("waveCanvas");
const ctx = canvas?.getContext("2d");
let width = 0, height = 0, dpr = 1, animationFrame = 0, pointerX = 0, pointerY = 0;
function resizeWave() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  width = rect.width; height = rect.height;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function drawWave(time) {
  if (!ctx || !width || !height) { animationFrame = requestAnimationFrame(drawWave); return; }
  ctx.clearRect(0, 0, width, height);
  const t = time * 0.00025;
  const spacing = width < 600 ? 24 : 19;
  for (let row = 0; row < 27; row++) {
    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += spacing) {
      const nx = x / Math.max(width, 1);
      const ny = row / 26;
      const mouseDist = Math.hypot(x - pointerX, row * 18 - pointerY);
      const lift = Math.exp(-mouseDist / 170) * 14;
      const y = height * .40 + row * 13 + Math.sin(nx * 7 + t + row * .22) * 13
        + Math.sin(nx * 13 - t * 1.7 + row * .11) * 6 - lift;
      if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    const alpha = 0.035 + (row / 27) * 0.14;
    ctx.strokeStyle = `rgba(231,199,125,${alpha})`;
    ctx.lineWidth = row % 5 === 0 ? 1.1 : .65;
    ctx.stroke();
  }
  animationFrame = requestAnimationFrame(drawWave);
}
if (canvas && ctx) {
  resizeWave();
  window.addEventListener("resize", resizeWave, { passive: true });
  canvas.parentElement.addEventListener("pointermove", e => {
    const rect = canvas.getBoundingClientRect();
    pointerX = e.clientX - rect.left;
    pointerY = e.clientY - rect.top;
  }, { passive: true });
  canvas.parentElement.addEventListener("pointerleave", () => { pointerX = width * .5; pointerY = height * .5; }, { passive: true });
  animationFrame = requestAnimationFrame(drawWave);
}
window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame));
