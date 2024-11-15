import firebase_admin
from firebase_admin import credentials, firestore
from textblob import TextBlob
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# -----------------------------------------------------------
# Initialize Firebase
# -----------------------------------------------------------

# Path to your Firebase service account JSON file
service_account_path = "C:/Users/SHAFEEK RAHMAN.R/Downloads/project_hotelreview/hotel-review-system-15430-firebase-adminsdk-cqkar-f7b3516eb8.json"
cred = credentials.Certificate(service_account_path)

# Initialize Firebase Admin SDK
firebase_admin.initialize_app(cred)

# Initialize Firestore client to access the database
db = firestore.client()

# Define the collection name where reviews are stored
collection_name = 'reviews'

# -----------------------------------------------------------
# Fetch and Analyze Review Data
# -----------------------------------------------------------

# Fetch all reviews from the Firestore collection
reviews_ref = db.collection(collection_name)
reviews = reviews_ref.stream()

# Lists to store ratings and sentiment scores for visualization
ratings = []
sentiment_scores = []

# Process each review to extract ratings and perform sentiment analysis
for review in reviews:
    review_data = review.to_dict()
    
    # Get the rating and review text from Firestore document
    rating = review_data.get('rating')
    review_text = review_data.get('review')

    if review_text:
        # Perform sentiment analysis on the review text using TextBlob
        sentiment = TextBlob(review_text).sentiment.polarity

        # Adjust sentiment score from [-1, 1] to [0, 5] scale
        adjusted_sentiment_score = round((sentiment + 1) * 2.5)  # Scale sentiment
        adjusted_sentiment_score = min(adjusted_sentiment_score, 5)  # Cap at 5

        # Store data for visualization
        ratings.append(rating)
        sentiment_scores.append(adjusted_sentiment_score)

        # Store sentiment score back in Firebase
        # This updates the document to include the sentiment score
        review.reference.update({'sentiment_score': adjusted_sentiment_score})

# -----------------------------------------------------------
# Visualization: Improved Bar Chart - Average Sentiment Score by Rating
# -----------------------------------------------------------

# Create a DataFrame for easier manipulation
data = {'Rating': ratings, 'Sentiment Score': sentiment_scores}
df = pd.DataFrame(data)

# Calculate the average sentiment score for each rating category
average_sentiment_per_rating = df.groupby('Rating')['Sentiment Score'].mean().reset_index()

# Plot the improved bar chart with the 'hue' argument for future compatibility
plt.figure(figsize=(14, 8))
sns.set_style("whitegrid")
bar_plot = sns.barplot(
    x='Rating', 
    y='Sentiment Score', 
    data=average_sentiment_per_rating, 
    hue='Rating',  # Assign the 'Rating' to hue for color distinction
    palette='coolwarm',  # You can use your color palette
    edgecolor='black',
    saturation=0.8,
    legend=False  # Disable the legend to avoid cluttering
)

# Enhance the visual appeal
bar_plot.set_title('Average Sentiment Score by Rating', fontsize=20, weight='bold', pad=20)
bar_plot.set_xlabel('Rating', fontsize=16, weight='bold', labelpad=15)
bar_plot.set_ylabel('Average Sentiment Score', fontsize=16, weight='bold', labelpad=15)

# Customize x and y ticks
bar_plot.set_xticks(average_sentiment_per_rating['Rating'])  # Set fixed x-tick positions
bar_plot.set_xticklabels(bar_plot.get_xticklabels(), fontsize=14)
bar_plot.set_yticks([0, 1, 2, 3, 4, 5])  # Set fixed y-tick positions
bar_plot.set_yticklabels([f'{tick:.1f}' for tick in bar_plot.get_yticks()], fontsize=14)

# Add numerical labels above each bar for clarity
for index, row in average_sentiment_per_rating.iterrows():
    bar_plot.text(
        index, 
        row['Sentiment Score'] + 0.05, 
        f"{round(row['Sentiment Score'], 2)}", 
        color='black', 
        ha="center", 
        fontsize=12, 
        weight='bold'
    )

# Make the histogram visually impressive
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()
