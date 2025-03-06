document.addEventListener("DOMContentLoaded", function() {
    // Load the navigation component
    fetch('../components/navComponent.html')
        .then(response => response.text())
        .then(data => {
            // Find where to insert the navigation
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading navigation component:', error));
});