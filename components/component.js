// ==========================
// LOAD COMPONENT FUNCTION
// ==========================

async function loadComponent(id, file) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    const data = await response.text();
    const element = document.getElementById(id);

    if (element) {
      element.innerHTML = data;

      if (id === "header") {
        initHeader();   // 🔥 THIS runs AFTER header loads
      }
    }

  } catch (error) {
    console.error(error);
  }
}

// ==========================
// LOAD HEADER & FOOTER
// ==========================

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");

// ==========================
// HEADER INITIALISATION
// ==========================

function initHeader() {

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  const menuClose = document.getElementById("menuClose");
  const menuOverlay = document.getElementById("menuOverlay");

  // ---- ACTIVE PAGE HIGHLIGHT ----
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  function closeMenu() {
    navMenu.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("active");
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.add("active");
      if (menuOverlay) menuOverlay.classList.add("active");
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// ==========================
// SCROLL EFFECT
// ==========================

window.addEventListener("scroll", ()=>{
  const header = document.querySelector(".site-header");
  if(header){
    if(window.scrollY > 50){
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});