body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f5;
    margin: 0;
    padding: 0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    color: #4CAF50; /* Colorful title */
    font-size: 2.5em;
    margin-bottom: 10px;
}

.subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 20px;
    font-style: italic;
}

.form label {
    color: #4CAF50;
    font-weight: bold;
}

.form input, .form textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submit-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #45a049;
}

.review-summary {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding: 10px;
    background-color: #e0f7fa;
    border-radius: 5px;
}

.review-count {
    font-size: 1.2em;
    padding: 5px;
}

.good {
    color: #388E3C;
}

.average {
    color: #FBC02D;
}

.bad {
    color: #D32F2F;
}

.review-table {
    margin-top: 20px;
}

.table-title {
    text-align: center;
    font-size: 1.8em;
    color: #009688;
    margin-bottom: 15px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
}

th {
    background-color: #009688;
    color: white;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}
