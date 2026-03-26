document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("[data-menu-btn]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("is-open");
      const isOpen = mobileNav.classList.contains("is-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});