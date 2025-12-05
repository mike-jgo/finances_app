import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { VscKebabVertical } from 'react-icons/vsc'
import { useContext, useCallback } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import CategoryForm from "../forms_general/CategoryForm.jsx"
import { DialogContext } from '../../contexts/DialogContext.js'
import BaseDialog from '../dialogs/BaseDialog.jsx'

const BaseMenu = ({ category_type, category_obj, onEdit, onDelete }) => {

    const { setModalType, setModalHeader, setModalOnConfirm } = useContext(ModalContext)
    const { setDialogType } = useContext(DialogContext)

    const openModal = useCallback(() => {
        setModalType(<CategoryForm type={category_type} mode="update" name_label="Enter new name" icon_pick_label="Select new icon" initialName={category_obj.categoryName || category_obj.title} initialIcon={category_obj.emoji || category_obj.icon} initialHasLimit={category_obj.has_limit} initialLimit={category_obj.exp_limit} />)
        setModalHeader("Edit name and icon")
        setModalOnConfirm(() => (formData) => onEdit(category_obj.id, formData))
    }, [setModalHeader, setModalType, setModalOnConfirm, category_type, category_obj, onEdit])

    const openDeleteDialog = useCallback(() => {
        setDialogType(<BaseDialog dialog_type="Warning" icon="⚠️" message="Are you sure you want to delete this category?" onClose={() => setDialogType(null)} confirmButton={() => onDelete(category_obj.id)} cancelButton={() => setDialogType(null)} />)
    }, [setDialogType, onDelete, category_obj])

    const openToggleBudgetForm = useCallback(() => {
        setModalType(<CategoryForm type={category_type} mode="budget_toggle" initialName={category_obj.categoryName || category_obj.title} initialIcon={category_obj.emoji || category_obj.icon} initialHasLimit={category_obj.has_limit} initialLimit={category_obj.exp_limit} />)
        setModalHeader("Toggle budget limit")
        setModalOnConfirm(() => (formData) => onEdit(category_obj.id, formData))
    }, [setModalType, setModalHeader, setModalOnConfirm, category_type, category_obj, onEdit])

    const renderOptions = () => {
        switch (category_type) {
            case 'income':
                return (
                    <>
                        <MenuItem>
                            <button className="block data-focus:bg-gray-900 p-2 w-full" onClick={openModal}>
                                Edit name and icon
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="block data-focus:bg-gray-900 p-2 w-full" onClick={openDeleteDialog}>
                                Delete category
                            </button>
                        </MenuItem>
                    </>
                )
            case 'expense':
                return (
                    <>
                        <MenuItem>
                            <button className="block data-focus:bg-gray-900 p-2 w-full" onClick={openModal}>
                                Edit name and icon
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="block data-focus:bg-gray-900 p-2 w-full" onClick={openDeleteDialog}>
                                Delete category
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="block bg-[#0b1215] data-focus:bg-gray-900 p-2 w-full" onClick={openToggleBudgetForm}>
                                Edit/toggle budget limits
                            </button>
                        </MenuItem>
                    </>
                )
            case 'reserved_expense':
                return (
                    <>
                        <MenuItem>
                            <button className="block data-focus:bg-gray-900 p-2 w-full">
                                Edit reserved expense
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="block data-focus:bg-gray-900 p-2 w-full">
                                Delete reserved expense
                            </button>
                        </MenuItem>
                    </>
                )
        }
    }

    return (
        <Menu>
            <MenuButton><VscKebabVertical /></MenuButton>
            <MenuItems anchor="bottom" className="rounded-lg bg-[#0b1215]">
                {renderOptions()}
            </MenuItems>
        </Menu>
    )
}

export default BaseMenu