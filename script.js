// Import Firebase modules (must use 'type="module"' in your HTML <script> tag)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";

// Firebase configuration (same as in the HTML)
const firebaseConfig = {
  apiKey: "AIzaSyASDqLWAJ6AEcpNUuwT2lSaPGGcHAkARSE",
  authDomain: "hotel-review-system-15430.firebaseapp.com",
  projectId: "hotel-review-system-15430",
  storageBucket: "hotel-review-system-15430.firebasestorage.app",
  messagingSenderId: "31016766719",
  appId: "1:31016766719:web:a1853a9e0a33e40113d0ca",
  measurementId: "G-S4M0DB2MG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore initialization
const analytics = getAnalytics(app); // Optional Analytics

// Function to save the review to Firestore
async function saveReview(name, rating, review) {
  try {
    await addDoc(collection(db, "reviews"), {
      name: name,
      rating: rating,
      review: review,
      timestamp: new Date() // Store the timestamp for sorting
    });
    console.log("Review added successfully!");
    loadReviews(); // Reload reviews after a new one is added
  } catch (error) {
    console.error("Error adding review: ", error);
  }
}

// Function to load reviews from Firestore
async function loadReviews() {
  const reviewsContainer = document.getElementById('reviews');
  reviewsContainer.innerHTML = ''; // Clear existing reviews before reloading

  const reviewsQuery = query(collection(db, "reviews"), orderBy("timestamp", "desc")); // Order by timestamp

  try {
    const querySnapshot = await getDocs(reviewsQuery);
    querySnapshot.forEach((doc) => {
      const reviewData = doc.data();
      addReviewToPage(reviewData.name, reviewData.rating, reviewData.review);
    });
  } catch (error) {
    console.error("Error loading reviews: ", error);
  }
}

// Function to add a review to the page dynamically
function addReviewToPage(name, rating, review) {
  const reviewsContainer = document.getElementById('reviews');
  const reviewItem = document.createElement('div');
  reviewItem.classList.add('review-item');
  reviewItem.innerHTML = `<h3>${name} - ${rating} Stars</h3><p>${review}</p>`;
  reviewsContainer.appendChild(reviewItem);
}

// Submit form event listener
document.getElementById('reviewForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const rating = document.getElementById('rating').value;
  const review = document.getElementById('review').value;

  // Add the review to Firestore
  await saveReview(name, rating, review);

  // Clear the form
  document.getElementById('name').value = '';
  document.getElementById('rating').value = '5';
  document.getElementById('review').value = '';
});

// Load reviews when the page is loaded
window.onload = loadReviews;
