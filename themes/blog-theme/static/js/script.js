document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("close-menu-button");
    const navbarMenu = document.getElementById("navbar-menu");

    menuButton.addEventListener('click', function() {
        navbarMenu.style.display = "block";
    });

    closeButton.addEventListener('click', function() {
        navbarMenu.style.display = "none";
    });
});
