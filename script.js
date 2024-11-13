// Function to update the review count
function updateReviewCounts() {
    let goodReviews = document.querySelectorAll('#good-reviews .review-item').length;
    let averageReviews = document.querySelectorAll('#average-reviews .review-item').length;
    let badReviews = document.querySelectorAll('#bad-reviews .review-item').length;

    // Update the counts displayed in the HTML
    document.getElementById('good-reviews-count').innerText = `Good Reviews: ${goodReviews}`;
    document.getElementById('average-reviews-count').innerText = `Average Reviews: ${averageReviews}`;
    document.getElementById('bad-reviews-count').innerText = `Bad Reviews: ${badReviews}`;
}

// Function to submit the review
function submitReview() {
    let name = document.getElementById('name').value;
    let rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value);
    let reviewText = document.getElementById('review').value;

    if (!name || !rating || !reviewText) {
        alert("Please fill all fields.");
        return;
    }

    // Create a new review element
    let newReview = document.createElement('div');
    newReview.classList.add('review-item');
    newReview.innerHTML = `<h4>${name} - ${rating} Stars</h4><p>${reviewText}</p>`;

    // Categorize the review based on rating
    if (rating >= 4) {
        document.getElementById('good-reviews').appendChild(newReview);
    } else if (rating === 3) {
        document.getElementById('average-reviews').appendChild(newReview);
    } else {
        document.getElementById('bad-reviews').appendChild(newReview);
    }

    // Update the review counts
    updateReviewCounts();

    // Clear form after submission
    document.getElementById('name').value = '';
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.getElementById('review').value = '';
}

// Attach event listener to the submit button
document.getElementById('submit-review').addEventListener('click', submitReview);

// Initial count update on page load
updateReviewCounts();
