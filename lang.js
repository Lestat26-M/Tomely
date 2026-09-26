// Shows the Turkish or English version of the page.
// Order: ?lang=tr|en → saved choice → browser language → English.
(function () {
  var param = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("tomely-lang"); } catch (e) {}
  var browser = (navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
  var lang = param === "tr" || param === "en" ? param : saved || browser;

  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== l;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === l ? "true" : "false");
    });
    var title = document.querySelector("meta[name='title-" + l + "']");
    if (title) document.title = title.content;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-set");
        try { localStorage.setItem("tomely-lang", l); } catch (e) {}
        apply(l);
      });
    });
    apply(lang);
  });
})();
