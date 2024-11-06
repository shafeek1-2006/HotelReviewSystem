// JavaScript to handle form submission and display reviews
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form from refreshing the page

    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;

    addReview(name, rating, review); // Call function to add review
    clearForm(); // Clear form inputs after submission
});

// Function to add review to the reviews section
function addReview(name, rating, review) {
    const reviewsContainer = document.getElementById('reviews');

    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    reviewItem.innerHTML = `
        <h3>${name} - ${rating} Stars</h3>
        <p>${review}</p>
    `;

    reviewsContainer.appendChild(reviewItem); // Add new review to the reviews container
}

// Function to clear form inputs
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('review').value = '';
}
