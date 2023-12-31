document.addEventListener('DOMContentLoaded', function() {
    const popularCarousel = document.querySelector(".app__popular-carousel");
    const chevronLeft = document.querySelector(".carousel-chevron-left");
    const chevronRight = document.querySelector(".carousel-chevron-right");
    let currentIndex = 0;
    const totalPosts = popularCarousel.querySelectorAll('.carousel-card').length;

    function toggleChevronVisibility() {
        chevronLeft.style.display = (currentIndex <= 0) ? 'none' : 'inline';
        chevronRight.style.display = (currentIndex >= totalPosts - amountVisible()) ? 'none' : 'inline';
    }

    function amountVisible() {
        const width = window.innerWidth;
        if (width < 500) {
            return 1;
        }
        else if (width >= 500 && width < 700) {
            return 2;
        } else if (width >= 700 && width < 1120) {
            return 3;
        } else if (width >= 1120 && width <= 1440) {
            return 4;
        } else {
            return 4;
        }
    }

    chevronLeft.addEventListener('click', function() {
        if(currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel();
            toggleChevronVisibility();
        }
    });

    chevronRight.addEventListener('click', function() {
        if(currentIndex < totalPosts - amountVisible()) {
            currentIndex += 1;
            updateCarousel();
            toggleChevronVisibility();
        }
    });

    function updateCarousel() {
        const posts = Array.from(popularCarousel.querySelectorAll('.carousel-card'));
        const visible = amountVisible();

        posts.forEach((post, index) => {
            if (index >= currentIndex && index < (currentIndex + visible)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    setTimeout(updateCarousel, 100); 

    // Initialize
    toggleChevronVisibility();
    updateCarousel();

    window.addEventListener('resize', function() {
        currentIndex = 0; // Reset the index
        updateCarousel(); // Update the carousel on screen resize
        toggleChevronVisibility(); // Update the buttons
    });
});
