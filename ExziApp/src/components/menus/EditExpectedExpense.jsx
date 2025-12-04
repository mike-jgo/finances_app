import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { VscKebabVertical } from 'react-icons/vsc'
import { useContext, useCallback } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import UpdateReservedExpense from "../modals_reserved_expense/UpdateReservedExpense.jsx"


const EditExpectedExpense = ({ expected_expense }) => {
  const { setModalType, setModalHeader } = useContext(ModalContext)

  const openEditModal = useCallback(() => {
    setModalType(<UpdateReservedExpense />)
    setModalHeader("Edit reserved expense")
  }, [setModalType, setModalHeader])

  return (
    <Menu>
      <MenuButton className="text-lg"><VscKebabVertical /></MenuButton>
      <MenuItems anchor="right" className="bg-[#0b1215] rounded-lg">
        <MenuItem>
          <button className="block data-focus:bg-gray-900 p-2" href="/settings" onClick={openEditModal}>
            Edit reserved expense
          </button>
        </MenuItem>
        <MenuItem>
          <button className="block data-focus:bg-gray-900 p-2" href="/support">
            Delete reserved expense
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default EditExpectedExpense