import { useEffect, useCallback, useState } from "react"
import { useOutletContext } from "react-router"
import Button from "../components/Button"
import CategoryForm from "../components/forms_general/CategoryForm.jsx"
import BaseCard from "../components/cards/BaseCard.jsx"
import { useAuth } from "../contexts/AuthContext.jsx"

const IncomeCategories = () => {
  const { setHeaderButton, setModalType, setModalHeader } = useOutletContext()
  const { user, token } = useAuth()
  const [displayMode, setDisplayMode] = useState("monthly")
  const [categories, setCategories] = useState([])

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

  useEffect(() => {
    if (!user?.id) return

    const fetchCategories = async () => {
      try {
        const headers = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'x-user-id': user.id,
        }

        const response = await fetch(`http://localhost:3001/api/income-categories/${user.id}`, {
          headers,
        })

        if (!response.ok) {
          throw new Error("Failed to fetch income categories")
        }

        const data = await response.json()
        const mappedCategories = (data || []).map((category) => ({
          id: category.id,
          categoryName: category.title,
          emoji: category.icon,
          total_income: category.amount,
        }))

        setCategories(mappedCategories)
      } catch (error) {
        console.error("Unable to load income categories", error)
      }
    }

    fetchCategories()
  }, [token, user?.id])

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
