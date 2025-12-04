import { useEffect, useCallback, useState } from "react"
import { useOutletContext } from "react-router"
import Button from "../components/Button"
import { ModalContext } from "../contexts/ModalContext"
import CategoryForm from "../components/forms_general/CategoryForm.jsx"
import BaseCard from "../components/cards/BaseCard.jsx"


const categories = [
  {
    id: 1,
    categoryName: 'Salary',
    categoryType: 'Income',
    total_income: 5200,
    emoji: '💵',
  },
  {
    id: 2,
    categoryName: 'Food',
    categoryType: 'Expense', // Changed from 'Income' as it's a more common use case
    total_income: 800,
    emoji: '🍔',
  },
  {
    id: 3,
    categoryName: 'Rent',
    categoryType: 'Expense',
    total_income: 1650,
    emoji: '🏠',
  },
  {
    id: 4,
    categoryName: 'Transport',
    categoryType: 'Expense',
    total_income: 250,
    emoji: '🚗',
  },
  {
    id: 5,
    categoryName: 'Utilities',
    categoryType: 'Expense',
    total_income: 180,
    emoji: '💡',
  },
  {
    id: 6,
    categoryName: 'Subscriptions',
    categoryType: 'Expense',
    total_income: 75,
    emoji: '📺',
  },
  {
    id: 7,
    categoryName: 'Entertainment',
    categoryType: 'Expense',
    total_income: 200,
    emoji: '🎬',
  },
  {
    id: 8,
    categoryName: 'Freelance',
    categoryType: 'Income',
    total_income: 600,
    emoji: '💼',
  }
];

const IncomeCategories = () => {
  const { setHeaderButton, setModalType, setModalHeader } = useOutletContext()
  const [displayMode, setDisplayMode] = useState("monthly")

  const openAddModal = useCallback(() => {
    setModalType(<CategoryForm type="income" mode="add" name_label="Enter name" icon_pick_label="Select icon" />)
    setModalHeader('Add income category')
  }, [setModalType, setModalHeader])

  useEffect(() => {
    const addButton = <Button text="➕ Add income category" onClick={openAddModal} />
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
          key={category.id}
          type="income"
          income_cat={category}
          display_mode={displayMode}
        />
      ))}
    </main>
  )
}

export default IncomeCategories