import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Function to handle review submission
document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rating = parseInt(document.getElementById('rating').value);
    const review = document.getElementById('review').value;

    if (name && review && rating) {
        await saveReview(name, rating, review);
        showSuccessMessage(); // Show success message upon submission
    } else {
        alert("Please fill all fields before submitting the review.");
    }

    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('review').value = '';
});

// Function to save the review to Firestore
async function saveReview(name, rating, review) {
    try {
        await addDoc(collection(db, "reviews"), { name, rating, review, timestamp: new Date() });
        loadReviews(); // Reload the reviews after submission
    } catch (error) {
        console.error("Error adding review:", error);
    }
}

// Function to load reviews from Firestore
async function loadReviews() {
    const goodReviews = document.getElementById('good-reviews').querySelector('.reviews-list');
    const averageReviews = document.getElementById('average-reviews').querySelector('.reviews-list');
    const badReviews = document.getElementById('bad-reviews').querySelector('.reviews-list');

    // Reset review counts and contents
    goodReviews.innerHTML = '';
    averageReviews.innerHTML = '';
    badReviews.innerHTML = '';

    let goodCount = 0;
    let averageCount = 0;
    let badCount = 0;

    const reviewsQuery = query(collection(db, "reviews"), orderBy("timestamp", "desc"));

    try {
        const querySnapshot = await getDocs(reviewsQuery);
        querySnapshot.forEach(doc => {
            const { name, rating, review } = doc.data();
            categorizeAndAddReview(name, rating, review, goodReviews, averageReviews, badReviews);

            // Categorize review based on keywords in the content
            if (isGoodReview(review)) {
                goodCount++;
            } else if (isBadReview(review)) {
                badCount++;
            } else {
                averageCount++;
            }
        });

        // Update counts in the UI
        document.getElementById('good-count').textContent = goodCount;
        document.getElementById('average-count').textContent = averageCount;
        document.getElementById('bad-count').textContent = badCount;
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

// Function to categorize and add reviews based on content
function categorizeAndAddReview(name, rating, review, goodSection, avgSection, badSection) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `<h4>${name} - ${rating} Stars</h4><p>${review}</p>`;

    if (isGoodReview(review)) {
        goodSection.appendChild(reviewItem);
    } else if (isBadReview(review)) {
        badSection.appendChild(reviewItem);
    } else {
        avgSection.appendChild(reviewItem); // Default to average if no keywords match
    }
}

// Helper function to determine if a review is good
function isGoodReview(review) {
    const goodKeywords = [_{{{CITATION{{{_1{](https://github.com/agusID/dwsmarketplace/tree/eb551836513fdc844417a2172784d5112faefc69/views%2Fproduct%2Fproduct_detail.php)[_{{{CITATION{{{_2{](https://github.com/thinkful-ei-panda/seyi-bookmark-app/tree/5d3e3843d72886327b25d96c7a9f98b0bdc21355/scripts%2Ftemplate.js)
