/* ====== UI Helpers ====== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Year in footer */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Theme toggle (persist in localStorage) */
const themeToggle = $("#theme-toggle");
const root = document.documentElement;
const body = document.body;
const savedTheme = localStorage.getItem("site-theme");
if (savedTheme) body.className = savedTheme;
else body.className = "theme-dark";

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = body.className === "theme-dark" ? "theme-dark" : "theme-light";
    const next = current === "theme-dark" ? "theme-light" : "theme-dark";
    body.className = next;
    localStorage.setItem("site-theme", next);
  });
}

/* Mobile menu toggle */
const hamburger = $("#hamburger");
const mobileMenu = $("#mobile-menu");
hamburger?.addEventListener("click", () => {
  const open = mobileMenu.style.display === "block";
  mobileMenu.style.display = open ? "none" : "block";
});

/* Close mobile menu on link click */
$$(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.style.display = "none";
}));

/* Custom cursor */
const cursor = $("#cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
["a","button",".btn",".icon-btn"].forEach(sel => {
  $$(sel).forEach(el => {
    el.addEventListener("mouseenter", () => { cursor.style.transform = "translate(-50%,-50%) scale(2.2)"; });
    el.addEventListener("mouseleave", () => { cursor.style.transform = "translate(-50%,-50%) scale(1)"; });
  });
});

/* Highlight active nav link by pathname */
$$(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === location.pathname.split("/").pop() || (a.getAttribute("href")==="index.html" && location.pathname.endsWith("/"))) {
    a.classList.add("active");
  }
});

/* Simple client-side auth (demo only) */
function authSignup(email, password){
  // WARNING: client-side storage is NOT secure. This is just a demo.
  const users = JSON.parse(localStorage.getItem("demo-users") || "[]");
  if (users.some(u => u.email === email)) return { ok:false, message: "User exists" };
  users.push({ email, password });
  localStorage.setItem("demo-users", JSON.stringify(users));
  return { ok:true };
}
function authLogin(email, password){
  const users = JSON.parse(localStorage.getItem("demo-users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (user) { localStorage.setItem("demo-session", JSON.stringify({ email })); return { ok:true }; }
  return { ok:false, message: "Invalid credentials" };
}

/* Expose for pages */
window.DemoAuth = { signup: authSignup, login: authLogin };
