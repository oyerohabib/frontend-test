# Student Council Election Supplementary System - Frontend

This is the frontend implementation for the Student Council Election Supplementary System, built using React and Vite. The system allows admins to upload CSV files containing eligible student voters' information and view them in a paginated table.

## Admin Login Credentials

To access the admin dashboard, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `Password1.`

These credentials allow you to log into the app and manage the student data upload and dashboard functionalities.

## Table of Contents

- [Student Council Election Supplementary System - Frontend](#student-council-election-supplementary-system---frontend)
  - [Admin Login Credentials](#admin-login-credentials)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [CSV File Format](#csv-file-format)
    - [Guidelines](#guidelines)
  - [Unique Fields](#unique-fields)
  - [Features](#features)
  - [Technologies](#technologies)

## Project Overview

The Student Council Election Supplementary System provides an admin interface where authorized users can:

- Upload CSV files containing eligible student voter information.
- View the uploaded student details in a paginated and responsive table.
- Handle authentication via JWT tokens and protect access to dashboard functionalities.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/guide/)

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/election-supplementary-system-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd election-supplementary-system-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the API base URL:

   ```bash
   VITE_API_BASE_URL=http://127.0.0.1:8000/
   ```

5. Run the project locally:

   ```bash
   npm run dev
   ```

6. Open your browser and go to `http://localhost:5173` to view the app.

## Usage

1. **Login**: Admins need to log in using their email and password.
2. **Upload**: After login, upload CSV files of students using the upload form on the dashboard.
3. **View Students**: After successful upload, the table will display the list of uploaded students with pagination.

## API Endpoints

- **POST `/api/v1/auth/login/`**: Authenticates the admin using email and password.
- **POST `/api/v1/auth/token/refresh/`**: Refreshes the access token using a refresh token.
- **POST `/api/v1/auth/users/upload-users/`**: Uploads a CSV file containing student voter information.
- **GET `/api/v1/auth/users/`**: Fetches the list of uploaded students.

## CSV File Format

When uploading students' data via CSV, the file should contain the following headers and data columns:

| Phone Number | Email                      | Department Code | Last Name | Matric Number | First Name | Middle Name |
| ------------ | -------------------------- | --------------- | --------- | ------------- | ---------- | ----------- |
| 9022421748   | <oyerohabib2305@gmail.com> | Agriculture     | Habib     | 215013        | Oyero      | sjj8        |

### Guidelines

- The file should be in `.csv` format.
- Ensure the headers are as specified above, and the columns are populated with the relevant data.

## Unique Fields

The following fields must be unique for each student:

- **Email**
- **Matric Number**
- **Phone Number**

Duplicate values in any of these fields will result in an error during the upload process.

## Features

- **JWT Authentication**: The system uses JWT tokens for authentication. Access to the dashboard and other functionalities is restricted to authenticated users only.
- **File Upload**: Admins can upload CSV files containing eligible students' data.
- **Paginated Table**: The table displaying student data is paginated, with 10 records displayed per page.
- **Error Handling**: Toast notifications are used for displaying error messages, including validation errors from the backend.
- **Protected Routes**: Users are redirected to the login page if they attempt to access protected routes without valid authentication.

## Technologies

- **React**: UI components.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making API requests.
- **React Router**: For navigation and routing.
- **React Toastify**: For showing toast notifications.
