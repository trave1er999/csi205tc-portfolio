/* ==========================================================================
   Personal portfolio - behaviour layer
   Kept deliberately small: navigation, theme persistence, scroll reveal,
   an accessibility friendly typing effect and the footer year.
   ========================================================================== */

(function () {
  "use strict";

  const root = document.documentElement;
  const storeKey = "portfolio-theme";

  // The reveal animation is progressive enhancement: without JavaScript the
  // CSS keeps every section visible.
  root.classList.add("has-js");

  /* ---------------- theme ---------------- */
  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    const button = document.getElementById("themeSwitch");
    if (button) {
      button.setAttribute("aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  };

  const saved = localStorage.getItem(storeKey);
  // A ?theme=dark|light parameter makes it possible to share a link that opens
  // the site in a specific theme (also used for the screenshots in the report).
  const requested = new URLSearchParams(window.location.search).get("theme");
  const initial = requested === "dark" || requested === "light"
    ? requested
    : saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(initial);

  document.getElementById("themeSwitch").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(storeKey, next);
  });

  /* ---------------- mobile navigation ---------------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------------- scroll reveal ---------------- */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    // Failsafe: never leave content hidden, for example when a print or a
    // full page screenshot is taken before the user scrolls.
    window.setTimeout(() => {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }, 2000);
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---------------- active section highlighting ---------------- */
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = new Map([...document.querySelectorAll(".nav-menu a[href^='#']")]
    .map((link) => [link.getAttribute("href").slice(1), link]));

  const highlight = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.remove("is-active"));
      const link = links.get(entry.target.id);
      if (link) link.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((section) => highlight.observe(section));

  /* ---------------- typing effect ---------------- */
  const phrases = [
    "talk to each other.",
    "survive packet loss.",
    "scale across nodes.",
    "learn from data."
  ];
  const target = document.getElementById("typed");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (target && !reduceMotion) {
    let phrase = 0;
    let index = phrases[0].length;
    let deleting = false;

    const tick = () => {
      const text = phrases[phrase];
      index += deleting ? -1 : 1;
      target.textContent = text.slice(0, index);

      let delay = deleting ? 40 : 70;
      if (!deleting && index === text.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && index === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 350;
      }
      window.setTimeout(tick, delay);
    };
    window.setTimeout(tick, 1600);
  }

  /* ---------------- footer year ---------------- */
  document.getElementById("year").textContent = String(new Date().getFullYear());
}());
