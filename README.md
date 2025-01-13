# Expense Tracker Application Frontend
A modern, responsive web application for tracking personal expenses with authentication, expense management, reporting, and analytics features.

## 🔗 Live Demo
Experience the application live at: https://expense-tracker-application-nine.vercel.app/

## 🎥 Demo Video
Watch a walkthrough of the application features:

## 📸 Screenshots
### Register:
![register](https://github.com/user-attachments/assets/b17c34e2-742c-48be-85ee-8156a47cd553)


## Features
### User Authentication

- Secure login and registration system
- JWT-based authentication
- Protected routes for authenticated users


### Expense Management

- Add, edit, and delete expenses
- Categorize expenses (food, transport, utilities, etc.)
- Date-based expense tracking
- Real-time updates


### Reports & Analytics

- Detailed expense reports with date filtering
- Visual analytics with charts
- Category-wise expense distribution
- Daily expense trends
- Predictive spending analysis


### Dashboard

- Clean and intuitive interface
- Quick expense entry
- Recent transactions list
- Overview of spending patterns

## Technology Stack

- **React** - Frontend framework
- **React Router** - Navigation and routing
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Tailwind CSS** - Styling
- **React Icons** - UI icons
- **React Toastify** - Toast notifications

## Installation

1. Clone the repository:
   ``` git clone https://github.com/rakibahmad007/Expense-Tracker-Application.git ```
2. Navigate to the project directory:
   ``` cd Expense-Tracker-Application ```
3. Install dependencies:
   ``` npm install ```
4. Create a **.env** file and configure your environment variables:
   ``` VITE_SERVER_URL=your_backend_server_url ```
5. Start the development server:
   ``` npm run dev ```

## Project Structure
```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthContext.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── Expense/
│       ├── ExpenseContext.jsx
│       ├── ExpenseForm.jsx
│       └── ExpenseList.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Reports.jsx
│   └── Analytics.jsx
└── App.jsx
```

## Key Features Implementation

### Authentication
- JWT-based authentication system
- Protected routes using React Router
- Persistent login state using localStorage
- Context-based auth state management

### Expense Management
- CRUD operations for expenses
- Real-time updates using React state management
- Category-based organization
- Date-based filtering

## Acknowledgements
- Chart.js for visualization capabilities
- Tailwind CSS for styling utilities





 
