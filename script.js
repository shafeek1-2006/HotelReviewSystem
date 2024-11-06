document.addEventListener("DOMContentLoaded", loadReviews);

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;

    addReview(name, rating, review);
    saveReview(name, rating, review);
    clearForm();
});

function addReview(name, rating, review) {
    const reviewsContainer = document.getElementById('reviews');
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `<h3>${name} - ${rating} Stars</h3><p>${review}</p>`;
    reviewsContainer.appendChild(reviewItem);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('review').value = '';
}

function saveReview(name, rating, review) {
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    existingReviews.push({ name, rating, review });
    localStorage.setItem('reviews', JSON.stringify(existingReviews));
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => addReview(review.name, review.rating, review.review));
}
