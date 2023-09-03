document.addEventListener('DOMContentLoaded', function() {
    const headerElement = document.querySelector('.related-articles-header');

    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.innerText = headerElement.innerText;

    document.body.appendChild(tempElement);
    const textWidth = tempElement.getBoundingClientRect().width;
    document.body.removeChild(tempElement);

    const newWidth = textWidth + 150;
    
    const relatedArticlesElement = document.querySelector('.related-articles');
    relatedArticlesElement.style.width = `${newWidth}px`;
});