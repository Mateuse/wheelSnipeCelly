const amountVisible = function() {
    const width = window.innerWidth;
    if(width < 700) {
        return 1;
    } else if (width > 700 && width < 1000) {
        return 2;
    } else if (width > 1000 && width < 2000) {
        return 3;
    } else {
        return 4;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const popularCarousel = document.querySelectorAll(".app__popular-carousel");

    popularCarousel.forEach(function(carousel) {
        const posts = Array.from(carousel.querySelectorAll('.carousel-card'))
        
        const hidden = [];
        let num = 0;
        let visible = amountVisible();
        
        while (posts.length > visible) {
            const removedElement = posts.splice(visible, 1)[0];
            hidden.push(removedElement);
        }

        hidden.forEach(function(element) {
            element.parentNode.removeChild(element); // Remove the parent container
        });

        console.log('Original Array: ', posts);
        console.log('Hidden Array: ', hidden)
    })
});
