import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASDqLWAJ6AEcpNUuwT2lSaPGGcHAkARSE",
    authDomain: "hotel-review-system-15430.firebaseapp.com",
    projectId: "hotel-review-system-15430",
    storageBucket: "hotel-review-system-15430.appspot.com",
    messagingSenderId: "31016766719",
    appId: "1:31016766719:web:a1853a9e0a33e40113d0ca",
    measurementId: "G-S4M0DB2MG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rating = parseInt(document.getElementById('rating').value);
    const review = document.getElementById('review').value;

    if (name && review && rating) {
        await saveReview(name, rating, review);
    } else {
        alert("Please fill all fields before submitting the review.");
    }

    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('review').value = '';
});

async function saveReview(name, rating, review) {
    try {
        await addDoc(collection(db, "reviews"), { name, rating, review, timestamp: new Date() });
        loadReviews();
    } catch (error) {
        console.error("Error adding review:", error);
    }
}

async function loadReviews() {
    const goodReviews = document.getElementById('good-reviews').querySelector('.reviews-list');
    const averageReviews = document.getElementById('average-reviews').querySelector('.reviews-list');
    const badReviews = document.getElementById('bad-reviews').querySelector('.reviews-list');

    goodReviews.innerHTML = '';
    averageReviews.innerHTML = '';
    badReviews.innerHTML = '';

    const reviewsQuery = query(collection(db, "reviews"), orderBy("timestamp", "desc"));

    try {
        const querySnapshot = await getDocs(reviewsQuery);
        querySnapshot.forEach(doc => {
            const { name, rating, review } = doc.data();
            addReviewToSection(name, rating, review, goodReviews, averageReviews, badReviews);
        });
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

function addReviewToSection(name, rating, review, goodSection, avgSection, badSection) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `<h4>${name} - ${rating} Stars</h4><p>${review}</p>`;

    if (rating >= 4) {
        goodSection.appendChild(reviewItem);
    } else if (rating === 3) {
        avgSection.appendChild(reviewItem);
    } else {
        badSection.appendChild(reviewItem);
    }
}

window.onload = loadReviews;
