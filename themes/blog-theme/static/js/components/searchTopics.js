document.addEventListener('DOMContentLoaded',   function() {

    const searchInput = document.querySelector('.topic-search-field-input input');
    
    searchInput.addEventListener('input', function() {

        const searchQuery = this.value.toLowerCase();

        const topicCards = document.querySelectorAll('.topic-card-container');

        topicCards.forEach(card => {
            const topicName = card.getAttribute('data-topic');
            console.log(topicName)
            if (topicName) {
                if (searchQuery === '' || topicName.startsWith(searchQuery)) {
                  card.style.display = 'block';
                } else {
                  card.style.display = 'none';
                }
              }
        });
    });
});