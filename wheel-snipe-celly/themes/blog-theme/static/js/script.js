const menuButton = document.getElementById("menu-button");
const closeButton = document.getElementById("close-menu-button");
const navbarMenu = document.getElementById("navbar-menu");

menuButton.addEventListener("click", () => {
    navbarMenu.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    navbarMenu.style.display = "none";
});