let goodReviewsCount = 0;
let averageReviewsCount = 0;
let badReviewsCount = 0;
let reviewCounter = 1;

let reviews = []; // This will store the reviews

document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let review = document.getElementById("review").value;

    let points;
    let reviewType;

    if (rating == "5") {
        points = 1;
        reviewType = "Good Reviews";
        goodReviewsCount++;
    } else if (rating == "3") {
        points = 0;
        reviewType = "Average Reviews";
        averageReviewsCount++;
    } else if (rating == "1") {
        points = -1;
        reviewType = "Bad Reviews";
        badReviewsCount++;
    }

    // Save review data in the array
    reviews.push({ name, rating, review, points });

    // Update the review count summary
    document.getElementById("goodReviewsCount").textContent = goodReviewsCount;
    document.getElementById("averageReviewsCount").textContent = averageReviewsCount;
    document.getElementById("badReviewsCount").textContent = badReviewsCount;

    // Update the reviews table
    updateReviewsTable();

    // Reset the form
    document.getElementById("reviewForm").reset();
});

// Function to update the reviews table with the latest reviews
function updateReviewsTable() {
    let table = document.getElementById("reviewsTable").getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing table rows

    reviews.forEach((reviewData, index) => {
        let newRow = table.insertRow();
        let rowClass = '';

        if (reviewData.rating == "5") {
            rowClass = 'good-review';
        } else if (reviewData.rating == "3") {
            rowClass = 'average-review';
        } else if (reviewData.rating == "1") {
            rowClass = 'bad-review';
        }

        newRow.className = rowClass;

        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${reviewData.name}</strong> - ${reviewData.rating} Stars<br>${reviewData.review}</td>
            <td>${reviewData.rating} Stars</td>
            <td>${reviewData.points}</td>
        `;
    });
}
