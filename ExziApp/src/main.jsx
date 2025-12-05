import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import PageContent from './components/top_level_components/PageContent.jsx'
import DashboardContent from './pages/DashboardContent.jsx';
import AnalyticsContent from './pages/AnalyticsContent.jsx';
import ExpectedExpenses from './pages/ExpectedExpenses.jsx'
import IncomeCategories from './pages/IncomeCategories.jsx';
import ExpenseCategories from './pages/ExpenseCategories.jsx';
import Transactions from './pages/Transactions.jsx';
import LoginPage from './components/login_registration/LoginPage.jsx';
import LoginContent from './LoginContent.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import ProtectedRoute from './components/utils/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginContent />,
    children: [
      {
        index: true,
        element: <LoginPage />
      }
    ]
  },
  {
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        element: <PageContent />,
        children: [
          {
            path: 'dashboard',
            handle: {
              main_msg: "Good morning, Errol!",
              sub_msg: "Here's your financial overview.",
            },
            element: <DashboardContent />,
          },
          {
            handle: {
              main_msg: "Income Sources",
              sub_msg: "Your sources of income"
            },
            path: 'income_categories',
            element: <IncomeCategories />
          },
          {
            handle: {
              main_msg: "Expense Categories",
              sub_msg: "Your expense categories"
            },
            path: 'expense_categories',
            element: <ExpenseCategories />
          },
          {
            handle: {
              main_msg: "Expected Expenses",
              sub_msg: "Your schedules expenses",
            },
            path: 'expected_expenses',
            element: <ExpectedExpenses />
          },
          {
            handle: {
              main_msg: "Analytics",
              sub_msg: "Your spending insights and trends",
            },
            path: 'analytics',
            element: <AnalyticsContent />
          },
          {
            handle: {
              main_msg: "Records",
              sub_msg: "View your list of records"
            },
            path: 'transactions',
            element: <Transactions />
          },
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
