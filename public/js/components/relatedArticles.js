document.addEventListener('DOMContentLoaded', function () {

    function relatedArticlesSize() {
        const headerElement = document.querySelector('.related-articles-header');

        const tempElement = document.createElement('span');
        tempElement.style.visibility = 'hidden';
        tempElement.style.whiteSpace = 'nowrap';
        tempElement.innerText = headerElement.innerText;

        document.body.appendChild(tempElement);
        const textWidth = tempElement.getBoundingClientRect().width;
        document.body.removeChild(tempElement);

        const newWidth = textWidth + (window.innerWidth/10);
        console.log(newWidth)
        const relatedArticlesElement = document.querySelector('.related-articles');
        relatedArticlesElement.style.width = `${newWidth}px`;
    }

    relatedArticlesSize();
    window.addEventListener('resize', function () {
        relatedArticlesSize();
    })
});