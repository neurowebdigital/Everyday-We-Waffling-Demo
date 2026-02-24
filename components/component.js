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
        initHeader();
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

  // ---- ACTIVE PAGE HIGHLIGHT ----
  let currentPage = window.location.pathname.split("/").pop();

  // Handle root domain (e.g. yoursite.com/)
  if (currentPage === "") {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });

  // ---- MOBILE MENU TOGGLE ----
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // ---- OPTIONAL DARK MODE (SAFE) ----
  const darkToggle = document.querySelector(".dark-toggle");

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }
}

window.addEventListener("scroll", ()=>{
  const header = document.querySelector(".site-header");
  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});