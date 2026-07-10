/* Plumbing Emergency Boston — main.js */
(function () {
  "use strict";

  /* Sticky header shadow */
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }, { passive: true });

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  /* Close mobile nav after tapping a link */
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && navLinks.classList.contains("is-open")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));

      /* Close any other open item */
      document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          document.getElementById(other.getAttribute("aria-controls")).style.maxHeight = "0";
        }
      });

      btn.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? "0" : panel.scrollHeight + "px";
    });
  });

  /* Scroll reveal (respects reduced motion via CSS) */
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Contact form — swap this handler for a real backend/Formspree endpoint */
  var form = document.getElementById("contactForm");
  var success = document.getElementById("formSuccess");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    /* TODO: POST to form handler, e.g.
       fetch("https://formspree.io/f/XXXX", { method: "POST", body: new FormData(form) }) */
    form.querySelectorAll("input, select, textarea, button").forEach(function (el) {
      el.disabled = true;
    });
    success.classList.add("is-visible");
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  /* Footer year */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
