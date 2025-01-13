# Expense Tracker Application Frontend
A modern, responsive web application for tracking personal expenses with authentication, expense management, reporting, and analytics features.

## 🔗 Live Demo
Experience the application live at: https://expense-tracker-application-nine.vercel.app/

## 🎥 Demo Video
Watch a walkthrough of the application features:

## 📸 Screenshots
### Register:
![register](https://github.com/user-attachments/assets/b17c34e2-742c-48be-85ee-8156a47cd553)

### Login:
![login](https://github.com/user-attachments/assets/85efe8ee-5a7b-4e80-a77d-89c2988921cc)

### Dashboard:
![dashboard](https://github.com/user-attachments/assets/85c1871e-bb16-45e2-8339-1ae4d4e06490)

### Update Function:
![update](https://github.com/user-attachments/assets/555c39c6-8c8e-457a-99bb-442a7c6c35ea)

### Delete Function:
![delete](https://github.com/user-attachments/assets/96251d2a-bf12-47a5-864e-201b1ff104fd)

### Reports Page:
![reports](https://github.com/user-attachments/assets/c0ce66c8-fac0-4ee1-8ac4-72a9865dad09)

### Analytics Page:
![Screenshot 2025-01-13 20-21-05](https://github.com/user-attachments/assets/aee43c9c-4c18-4926-93f0-25e93ebc4b93)



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





 
