# Census Application

**Render link** https://server-deployment-ca-yyc1.onrender.com

## Description

The Census application is a web application that allows to manually capture participants' details. It provides functionality for adding, updating, retrieving, and deleting participant records.

The user MUST be an authenticated admin user to be a able to get, post, put or delete data from the app.

## Installation

Clone the repository:
git clone https://github.com/your-username/census-application.git

Navigate to the project directory:
cd census-application

Install dependencies:
npm install

Start the server: npm start

The application will be running at http://localhost:3000.

## Census Application API

GET /participants
This endpoint returns a list of all participants in the Census Application as a JSON object.

GET /participants/details
This endpoint returns the personal details of all active participants, including first name, last name and email.

GET /participants/details/:email
This endpoint returns the personal details of the specified participant by email, including first name, last name and email.

GET /participants/work/:email
This endpoint returns the work details of the specified participant by email, including company name and salary with currency.

GET /participants/home/:email
This endpoint returns the home details of the specified participant by email, including country and city.

POST /participants/add
This endpoint adds a new participant to the Census Application. The request body should contain all participant data in JSON format via postman.

PUT /participants/:email
This endpoint updates the participant with the provided email in the Census Application. The request body should have the exact same format as the POST request for adding participants.

DELETE /participants/:email
This endpoint deletes the participant with the provided email from the Census Application.