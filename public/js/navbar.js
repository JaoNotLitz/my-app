function loadNavbar() {
  var width = window.innerWidth;
  var file = width < 990 ? "navbar-collapsed.html" : "navbar.html";

  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    });
}

window.addEventListener("resize", loadNavbar);

// Call the function once to load the navbar on page load
loadNavbar();
function loadFooter() {
  var file = "footer.html";

  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
}

// Call the function once to load the footer on page load
loadFooter();
// var count = 0;
