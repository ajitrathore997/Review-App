 Review System
A MERN stack application for managing companies and their reviews, built with Vite for the frontend, Node.js/Express.js for the backend, and MongoDB for data storage. The application allows users to add companies (with optional logo uploads), list all companies, and submit/list reviews with star ratings, styled to match the provided Figma prototype.
Features

Add Company: Create a new company with a name, description, and optional logo upload.
Company Listing: Display a list of all companies with their names and descriptions.
Review Listing: Submit and view reviews for a selected company, with a 1-5 star rating and review text, styled per the Figma design.
File Upload: Uses Multer for handling company logo uploads.

Tech Stack

Frontend: Vite, React
Backend: Node.js, Express.js, MongoDB, Mongoose, Multer
Database: MongoDB
File Upload: Multer for handling image uploads

Setup Instructions

Clone the Repository
cd company-review-system


Backend Setup

Navigate to the server directory:cd server


Install dependencies:npm install


Configure the .env file (included for testing purposes):MONGO_URI=mongodb://localhost:27017/company_reviews
PORT=3000

Ensure MongoDB is running (locally or via Atlas).
Start the backend:npm start



Frontend Setup

Navigate to the client directory:cd client


Install dependencies:npm install


Start the frontend:npm run dev


Access the app at http://localhost:5173 (default Vite port).


File Uploads

The uploads directory in server stores company logos uploaded via Multer.
Ensure the uploads directory exists or is created automatically on first upload.

Usage

Access the Application

Open http://localhost:5173 in your browser.
The main page displays forms to add a company, list companies, and submit/view reviews for a selected company.


Add a Company

Enter a company name, location, city, founded date and upload a logo (optional).
Submit to add the company to the database.


View Companies

The company list displays all companies with their names and location.
Click a company to select it for adding/viewing reviews.


Submit and View Reviews

Select a 1-5 star rating from the dropdown and enter review text (per Figma design).
View reviews for the selected company, displayed with star icons and user-provided text.


No Authentication: As specified, Sign In and Sign Up features are excluded for this test implementation, despite their presence in the Figma prototype.
File Uploads: Multer stores company logos in the server/uploads directory. Logos are accessible via http://localhost:3000/uploads/filename.
Environment Variables: The .env file is included for testing purposes. In production, secure sensitive data (e.g., MONGO_URI).


