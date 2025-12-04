import { useEffect, useCallback, useState } from "react"
import { useOutletContext } from "react-router"
import CategoryForm from "../components/forms_general/CategoryForm.jsx"
import Button from "../components/Button"
import { ModalContext } from "../contexts/ModalContext"
import BaseCard from "../components/cards/BaseCard.jsx"

const categories = [
  {
    "key": 2,
    "categoryName": "Food",
    "categoryType": "Expense",
    "currentBalance": 800,
    "emoji": "🍔",
    "isBudget": false,
    "totalBudget": 0,
    "currentSpend": 0
  },
  {
    "key": 3,
    "categoryName": "Rent",
    "categoryType": "Expense",
    "currentBalance": 1650,
    "emoji": "🏠",
    "isBudget": false,
    "totalBudget": 0,
    "currentSpend": 0
  },
  {
    "key": 4,
    "categoryName": "Transport",
    "categoryType": "Expense",
    "currentBalance": 250,
    "emoji": "🚗",
    "isBudget": false,
    "totalBudget": 0,
    "currentSpend": 0
  },
  {
    "key": 5,
    "categoryName": "Utilities",
    "categoryType": "Expense",
    "currentBalance": 180,
    "emoji": "💡",
    "isBudget": true,
    "totalBudget": 0,
    "currentSpend": 0
  },
  {
    "key": 6,
    "categoryName": "Subscriptions",
    "categoryType": "Expense",
    "currentBalance": 75,
    "emoji": "📺",
    "isBudget": true,
    "totalBudget": 0,
    "currentSpend": 0
  },
  {
    "key": 7,
    "categoryName": "Entertainment",
    "categoryType": "Expense",
    "currentBalance": 200,
    "emoji": "🎬",
    "isBudget": true,
    "totalBudget": 0,
    "currentSpend": 0
  }
]

const ExpenseCategories = () => {
  const { setHeaderButton, setModalType, setModalHeader } = useOutletContext()
  const [displayMode, setDisplayMode] = useState("monthly")

  const openAddModal = useCallback(() => {
    setModalType(<CategoryForm type="expense" mode="add" name_label="Enter name" icon_pick_label="Select icon" />)
    setModalHeader('Add expense category')
  }, [setModalType, setModalHeader])

  useEffect(() => {
    const addButton = <Button text="➕ Add expense category" onClick={openAddModal} />
    setHeaderButton(addButton)

    return () => {
      setHeaderButton(null)
    }
  }, [setHeaderButton, openAddModal])

  const toggleMode = useCallback((mode) => {
    setDisplayMode(mode)
  }, [setDisplayMode])

  return (
    <main className="flex flex-wrap gap-6 p-4">
      {categories.map((category) => (
        <BaseCard
          key={category.key}
          type="expense"
          expense_cat={category}
          display_mode={displayMode}
        />
      ))}
    </main>
  )
}

export default ExpenseCategories