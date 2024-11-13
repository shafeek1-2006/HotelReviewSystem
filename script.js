// Initialize Firebase
// Make sure you replace these values with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form and DOM elements
const submitButton = document.getElementById('submit-review');
const nameInput = document.getElementById('name');
const reviewInput = document.getElementById('review');
const ratingInputs = document.getElementsByName('rating');
const reviewsTableBody = document.getElementById('reviews-table-body');

// Review counts
const goodReviewsCount = document.getElementById('good-reviews-count');
const averageReviewsCount = document.getElementById('average-reviews-count');
const badReviewsCount = document.getElementById('bad-reviews-count');

// Counters
let goodCount = 0;
let averageCount = 0;
let badCount = 0;

// Listen for form submission
submitButton.addEventListener('click', function () {
    const name = nameInput.value;
    const review = reviewInput.value;
    const rating = getSelectedRating();

    if (!name || !review || !rating) {
        alert('Please fill out all fields and select a rating.');
        return;
    }

    // Determine the review type based on the rating
    let reviewType = '';
    if (rating >= 4) {
        reviewType = 'Good';
        goodCount++;
    } else if (rating === 3) {
        reviewType = 'Average';
        averageCount++;
    } else {
        reviewType = 'Bad';
        badCount++;
    }

    // Add review to Firebase
    db.collection('reviews').add({
        name: name,
        review: review,
        rating: rating,
        reviewType: reviewType,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // Clear form fields
        nameInput.value = '';
        reviewInput.value = '';
        ratingInputs.forEach(radio => radio.checked = false);

        // Update the review counts on the page
        updateReviewCounts();

        // Fetch and display the latest reviews
        fetchReviews();
    }).catch((error) => {
        console.error('Error saving review: ', error);
    });
});

// Function to get the selected rating
function getSelectedRating() {
    for (let i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].checked) {
            return parseInt(ratingInputs[i].value);
        }
    }
    return null;
}

// Function to update review counts
function updateReviewCounts() {
    goodReviewsCount.textContent = `Good Reviews: ${goodCount}`;
    averageReviewsCount.textContent = `Average Reviews: ${averageCount}`;
    badReviewsCount.textContent = `Bad Reviews: ${badCount}`;
}

// Function to fetch and display reviews from Firebase
function fetchReviews() {
    db.collection('reviews')
        .orderBy('timestamp', 'asc')
        .get()
        .then((snapshot) => {
            reviewsTableBody.innerHTML = ''; // Clear existing table rows
            let index = 1;

            snapshot.forEach((doc) => {
                const data = doc.data();

                // Create table row for each review
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index++}</td>
                    <td>${data.name}</td>
                    <td>${data.review}</td>
                    <td>${data.rating} Stars</td>
                    <td>${data.reviewType}</td>
                `;
                reviewsTableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error fetching reviews: ', error);
        });
}

// Initial fetch to populate reviews on page load
fetchReviews();
