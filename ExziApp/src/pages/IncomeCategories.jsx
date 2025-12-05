import { useEffect, useCallback, useState, useContext } from "react"
import { useOutletContext } from "react-router"
import Button from "../components/Button"
import { ModalContext } from "../contexts/ModalContext"
import { DialogContext } from "../contexts/DialogContext"
import CategoryForm from "../components/forms_general/CategoryForm.jsx"
import BaseCard from "../components/cards/BaseCard.jsx"
import { UserContext } from "../contexts/UserContext.jsx"

const IncomeCategories = () => {
  const { setHeaderButton, setModalType, setModalHeader, setModalOnConfirm } = useOutletContext()
  const { setDialogType } = useContext(DialogContext)
  const { user } = useContext(UserContext)
  const [displayMode, setDisplayMode] = useState("monthly")
  const [categories, setCategories] = useState([])

  const fetchCategories = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await fetch('http://localhost:3001/api/income-categories', {
        headers: {
          'user-id': user.id
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
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
      const response = await fetch('http://localhost:3001/api/income-categories', {
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
      const response = await fetch(`http://localhost:3001/api/income-categories/${id}`, {
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
      const response = await fetch(`http://localhost:3001/api/income-categories/${id}`, {
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
    setModalType(<CategoryForm type="income" mode="add" name_label="Enter name" icon_pick_label="Select icon" />)
    setModalHeader('Add income category')
    setModalOnConfirm(() => handleAddCategory)
  }, [setModalType, setModalHeader, setModalOnConfirm, handleAddCategory])

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
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      ))}
    </main>
  )
}

export default IncomeCategories