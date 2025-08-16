document.addEventListener("DOMContentLoaded", () => {
  // Signup
  const signupForm = document.getElementById("signup-form");
  if (signupForm){
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(signupForm);
      const email = fd.get("email").trim();
      const password = fd.get("password").trim();
      const msg = document.getElementById("message");
      const res = window.DemoAuth.signup(email, password);
      if (!res.ok){ msg.textContent = res.message; msg.style.color = "tomato"; }
      else { msg.textContent = "Account created! Redirecting to login…"; msg.style.color = "var(--muted)";
             setTimeout(()=> location.href = "login.html", 900); }
    });
  }

  // Login
  const loginForm = document.getElementById("login-form");
  if (loginForm){
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const email = fd.get("email").trim();
      const password = fd.get("password").trim();
      const msg = document.getElementById("login-message");
      const res = window.DemoAuth.login(email, password);
      if (!res.ok){ msg.textContent = res.message; msg.style.color = "tomato"; }
      else { msg.textContent = "Signed in — demo session saved. Redirecting…"; msg.style.color = "var(--muted)";
             setTimeout(()=> location.href = "index.html", 700); }
    });
  }
});
