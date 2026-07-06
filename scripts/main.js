/* ==========================================================================
   Susan Rossman — Portfolio
   Small, dependency-free enhancements. The site works without JS; this just
   makes it nicer: mobile nav, work filtering, a reading modal, scroll reveal.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Footer year --------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav ---------------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close the menu after tapping a link.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Work filtering ------------------------------------------------ */
  var filterBtns = document.querySelectorAll(".filters__btn");
  var cards = document.querySelectorAll(".work-card");
  var emptyMsg = document.querySelector(".work__empty");

  function applyFilter(value) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = value === "all" || card.getAttribute("data-category") === value;
      card.hidden = !match;
      if (match) shown++;
    });
    if (emptyMsg) emptyMsg.hidden = shown !== 0;
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  /* ---- Reading modal ------------------------------------------------- */
  var reader = document.getElementById("reader");
  var readerContent = document.getElementById("reader-content");
  var lastFocused = null;

  function openReader(card) {
    var tpl = card.querySelector(".work-card__detail");
    var title = card.querySelector(".work-card__title");
    var client = card.querySelector(".work-card__client");
    if (!tpl || !readerContent || !reader) return;

    // Build the panel: title + client + the detail template contents.
    readerContent.innerHTML = "";
    if (title) {
      var h = document.createElement("h3");
      h.id = "reader-title";
      h.textContent = title.textContent;
      readerContent.appendChild(h);
    }
    if (client) {
      var c = document.createElement("p");
      c.className = "detail__meta";
      c.innerHTML = "<strong>" + client.innerHTML + "</strong>";
      readerContent.appendChild(c);
    }
    readerContent.appendChild(tpl.content.cloneNode(true));

    lastFocused = document.activeElement;
    reader.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = reader.querySelector(".reader__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeReader() {
    if (!reader) return;
    reader.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  cards.forEach(function (card) {
    var opener = card.querySelector(".work-card__open");
    if (opener) opener.addEventListener("click", function () { openReader(card); });
  });

  if (reader) {
    reader.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeReader();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !reader.hidden) closeReader();
    });
    // Simple focus trap while the dialog is open.
    reader.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || reader.hidden) return;
      var focusable = reader.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  /* ---- Scroll reveal ------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".hero, .section-head, .work-card, .about__inner, .service, .contact__inner"
  );
  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  }
})();
