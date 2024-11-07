// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASDqLWAJ6AEcpNUuwT2lSaPGGcHAkARSE",
    authDomain: "hotel-review-system-15430.firebaseapp.com",
    projectId: "hotel-review-system-15430",
    storageBucket: "hotel-review-system-15430.firebasestorage.app",
    messagingSenderId: "31016766719",
    appId: "1:31016766719:web:a1853a9e0a33e40113d0ca",
    measurementId: "G-S4M0DB2MG9"
};

// Initialize Firebase and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load reviews from Firestore on page load
document.addEventListener("DOMContentLoaded", loadReviews);

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;

    addReview(name, rating, review);  // Update the page with the new review
    saveReview(name, rating, review); // Save the review to Firestore
    clearForm();
});

function addReview(name, rating, review) {
    const reviewsContainer = document.getElementById('reviews');
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `<h3>${name} - ${rating} Stars</h3><p>${review}</p>`;
    reviewsContainer.appendChild(reviewItem);
}

// Clear the review form after submission
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('review').value = '';
}

// Save the review to Firestore
function saveReview(name, rating, review) {
    db.collection("reviews").add({
        name: name,
        rating: rating,
        review: review,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Review added with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding review: ", error);
    });
}

// Load reviews from Firestore and display them
function loadReviews() {
    db.collection("reviews").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const reviewData = doc.data();
            addReview(reviewData.name, reviewData.rating, reviewData.review);
        });
    }).catch((error) => {
        console.error("Error loading reviews: ", error);
    });
}
