let reviewCount = 0;  // To keep track of S.NO
let reviews = [];  // To store review data

// Function to update the review count
function updateReviewCounts() {
    let goodReviews = reviews.filter(review => review.points === 1).length;
    let averageReviews = reviews.filter(review => review.points === 0).length;
    let badReviews = reviews.filter(review => review.points === -1).length;

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

    // Determine the points for the review
    let points = 0;
    if (rating >= 4) points = 1; // Good review
    else if (rating === 3) points = 0; // Average review
    else points = -1; // Bad review

    // Add the new review to the reviews array
    reviewCount++;
    reviews.push({ sNo: reviewCount, name, reviewText, rating, points });

    // Add the new review to the table
    addReviewToTable({ sNo: reviewCount, name, reviewText, rating, points });

    // Update the review counts
    updateReviewCounts();

    // Clear form after submission
    document.getElementById('name').value = '';
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.getElementById('review').value = '';
}

// Function to add review to the table
function addReviewToTable(review) {
    let tableBody = document.getElementById('reviews-table-body');
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${review.sNo}</td>
        <td>${review.name} - ${review.reviewText}</td>
        <td>${review.rating} Stars</td>
        <td>${review.points}</td>
    `;
    tableBody.appendChild(row);
}

// Attach event listener to the submit button
document.getElementById('submit-review').addEventListener('click', submitReview);

// Initial count update on page load
updateReviewCounts();
