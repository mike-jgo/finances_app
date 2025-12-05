import { useEffect, useCallback, useState, useContext } from "react"
import { useOutletContext } from "react-router"
import CategoryForm from "../components/forms_general/CategoryForm.jsx"
import Button from "../components/Button"
import { ModalContext } from "../contexts/ModalContext"
import BaseCard from "../components/cards/BaseCard.jsx"
import { DialogContext } from "../contexts/DialogContext"
import { UserContext } from "../contexts/UserContext.jsx"

const ExpenseCategories = () => {
  const { setHeaderButton, setModalType, setModalHeader, setModalOnConfirm } = useOutletContext()
  const { setDialogType } = useContext(DialogContext)
  const { user } = useContext(UserContext)
  const [displayMode, setDisplayMode] = useState("monthly")
  const [categories, setCategories] = useState([])

  const fetchCategories = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await fetch('http://localhost:3001/api/expense-categories', {
        headers: {
          'user-id': user.id
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Map backend fields to frontend component expectations
        const mappedData = data.map(cat => ({
          ...cat,
          categoryName: cat.categoryName,
          categoryType: 'Expense',
          isBudget: cat.has_limit,
          totalBudget: cat.exp_limit,
          monthly_expense: cat.currentSpend, // Using total as monthly for now
          total_expense: cat.currentSpend
        }));
        setCategories(mappedData);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategory = useCallback(async (formData) => {
    if (!user?.id) return;
    try {
      const data = Object.fromEntries(formData);
      const response = await fetch('http://localhost:3001/api/expense-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.id
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        await fetchCategories();
        setModalType(null);
        setModalOnConfirm(null);
      }
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  }, [user, fetchCategories, setModalType, setModalOnConfirm]);

  const handleEditCategory = useCallback(async (id, formData) => {
    if (!user?.id) return;
    try {
      const data = Object.fromEntries(formData);
      const response = await fetch(`http://localhost:3001/api/expense-categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.id
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        await fetchCategories();
        setModalType(null);
        setModalOnConfirm(null);
      }
    } catch (error) {
      console.error("Failed to edit category:", error);
    }
  }, [user, fetchCategories, setModalType, setModalOnConfirm]);

  const handleDeleteCategory = useCallback(async (id) => {
    if (!user?.id) return;
    try {
      const response = await fetch(`http://localhost:3001/api/expense-categories/${id}`, {
        method: 'DELETE',
        headers: {
          'user-id': user.id
        }
      });
      if (response.ok) {
        await fetchCategories();
        setDialogType(null);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }, [user, fetchCategories, setDialogType]);

  const openAddModal = useCallback(() => {
    setModalType(<CategoryForm type="expense" mode="add" name_label="Enter name" icon_pick_label="Select icon" />)
    setModalHeader('Add expense category')
    setModalOnConfirm(() => handleAddCategory)
  }, [setModalType, setModalHeader, setModalOnConfirm, handleAddCategory])

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
          key={category.id}
          type="expense"
          expense_cat={category}
          display_mode={displayMode}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      ))}
    </main>
  )
}

export default ExpenseCategories