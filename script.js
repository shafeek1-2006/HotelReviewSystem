// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    databaseURL: "YOUR_FIREBASE_DATABASE_URL",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

let goodReviewsCount = 0;
let averageReviewsCount = 0;
let badReviewsCount = 0;
let reviewCounter = 1;

document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let review = document.getElementById("review").value;

    let points;
    let reviewType;

    if (rating == "5") {
        points = 5;
        reviewType = "Good";
        goodReviewsCount++;
    } else if (rating == "4") {
        points = 4;
        reviewType = "Good";
        goodReviewsCount++;
    } else if (rating == "3") {
        points = 3;
        reviewType = "Average";
        averageReviewsCount++;
    } else if (rating == "2") {
        points = 2;
        reviewType = "Bad";
        badReviewsCount++;
    } else if (rating == "1") {
        points = 1;
        reviewType = "Bad";
        badReviewsCount++;
    }

    // Save the review data to Firebase
    const reviewData = {
        name: name,
        rating: rating,
        review: review,
        points: points,
        reviewType: reviewType
    };
    const newReviewKey = firebase.database().ref().child('reviews').push().key;
    firebase.database().ref('reviews/' + newReviewKey).set(reviewData);

    // Update review counts
    document.getElementById("goodReviewsCount").textContent = goodReviewsCount;
    document.getElementById("averageReviewsCount").textContent = averageReviewsCount;
    document.getElementById("badReviewsCount").textContent = badReviewsCount;

    // Reset form after submission
    document.getElementById("reviewForm").reset();
});

// Function to load reviews from Firebase
function loadReviews() {
    firebase.database().ref('reviews').on('value', function(snapshot) {
        const reviews = snapshot.val();
        const reviewsTable = document.getElementById("reviewsTable").getElementsByTagName('tbody')[0];
        reviewsTable.innerHTML = ''; // Clear the table

        let index = 1;
        for (let key in reviews) {
            const reviewData = reviews[key];
            const row = reviewsTable.insertRow();

            let rowClass = '';
            if (reviewData.reviewType === "Good") {
                rowClass = 'good-review';
            } else if (reviewData.reviewType === "Average") {
                rowClass = 'average-review';
            } else if (reviewData.reviewType === "Bad") {
                rowClass = 'bad-review';
            }

            row.className = rowClass;
            row.innerHTML = `
                <td>${index++}</td>
                <td><strong>${reviewData.name}</strong> - ${reviewData.rating} Stars<br>${reviewData.review}</td>
                <td>${reviewData.review
