// Mwanga static site - UI helpers (mobile menu, back-to-top, copy email)
(function () {
  "use strict";

  // Mobile menu toggle
  const menuBtn = document.querySelector("[data-menu-btn]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (menuBtn && mobileNav) {
    const setExpanded = (isOpen) => {
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      mobileNav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("is-open");
      setExpanded(!isOpen);
    });

    // Close when clicking a link
    mobileNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setExpanded(false);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  }

  // Back to top button
  const toTopBtn = document.querySelector("[data-to-top]");
  if (toTopBtn) {
    const onScroll = () => {
      toTopBtn.classList.toggle("is-visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Copy email buttons
  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-copy-email");
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        const old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = old), 1200);
      } catch {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
    });
  });
})();