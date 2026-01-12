# Loanlink-Microloan

A full-featured **Loan Management System** with **role-based dashboards**, **secure API**, and **modern UI/UX**. Built with **React, Tailwind CSS, Node.js, Express, MongoDB**, and **Firebase Authentication**.

---

## 🛠️ Features

### 1. Role-Based Access
- **Admin**: Full control over users and loan applications, monitor overall system performance.
- **Manager**: View and manage loan applications, track loan status via charts.
- **User / Borrower**: Apply for loans, track application status, view personal loan data.

### 2. Dashboards
- **Admin Dashboard**
  - Glassy UI with pink–violet theme
  - Loan statistics cards (Pending, Approved, Rejected, Fee Not Paid)
  - Pie chart visualization
  - User role distribution cards
- **Manager Dashboard**
  - Bar chart of loan types and counts
  - Real-time loan data
  - Cards for loan statistics
- **User Dashboard**
  - Personal loan overview
  - Pie chart for loan status
  - Total amount requested
  - Glassy styled stats cards

### 3. Secure API
- **JWT / Firebase token authentication**
- **Role-based middleware**:
  - `verifyUserOrBorrower` → Secures POST, DELETE routes
  - `verifyAdmin` → Secures admin-specific routes
  - `verifyManager` → Secures manager-specific routes
- Users can only see or manipulate their own loans

### 4. Modern UI / UX
- Glassmorphism (glassy cards)
- Pink & violet theme
- Dark & Light mode friendly
- Animated charts (Pie & Bar charts)
- Animated error pages with floating coins & money
- Responsive design

### 5. Loan Functionality
- **Create Loan**: User / Borrower can apply for loans
- **View Loans**: User sees own loans, Manager/Admin sees all loans
- **Delete Loan**: Only owner can delete
- **Loan Status**: Pending, Approved, Rejected, Fee Not Paid
- **Application Fee**: Default $10 with fee status tracking

---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS, Recharts, React Router, React Query
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment gateway**: Stripe
- **Authentication**: Firebase Auth
- **API Security**: Role-based middleware, JWT/Firebase token validation
- **Other**: SweetAlert2 for confirmations, Lucide-React icons

---

## 🚀 Live URL

Live URL (https://loanlink-microloan.web.app/)

🖥️ How to Run the Project Locally (Overview)

This project follows a standard client–server architecture. To run it locally, the following high-level steps are required.

### Step 1: Clone the Repository

Download the project from GitHub to your local machine and open it in a code editor (VS Code recommended).

### Step 2: Install Dependencies

## The project has two parts:

-Client (Frontend)

-Server (Backend)

Install required packages separately for both frontend and backend using a Node package manager.

### Step 3: Environment Configuration

Create environment configuration files for both frontend and backend.

## --Frontend .env :

-Firebase configuration keys

-API base URL

-Stripe public key

## --Backend .env :

-Server port

-MongoDB connection string

-JWT secret

-Stripe secret key

These environment variables are required for authentication, database connection, and payment processing.

### Step 4: Firebase Setup

-Create a Firebase project

-Enable Authentication (Email & Password)

-Use Firebase credentials in the frontend environment file

Firebase is used for secure user authentication.

### Step 5: Database Setup

-Connect the backend to MongoDB (local or cloud)

-Ensure database connection is successful before starting the server

MongoDB stores users, loans, roles, and application data.

### Step 6: Start the Application

-Start the backend server first

-Then start the frontend client

Once both are running, the application will be accessible from the browser.

### Step 7: Role-Based Access

-Normal users can register and apply for loans

-Admin and Manager roles can be assigned manually from the database or admin controls

-Dashboards are shown based on user role

### Step 8: Ready to Use

After completing the above steps, the Loanlink-Microloan system will run locally with:

Secure authentication

Role-based dashboards

Loan application & management features
