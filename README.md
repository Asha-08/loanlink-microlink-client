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
