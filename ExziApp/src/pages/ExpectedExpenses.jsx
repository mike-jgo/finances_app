import React, { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { useOutletContext } from 'react-router'
import Button from "../components/Button.jsx"
import { ModalContext } from "../contexts/ModalContext.js"
import TransactionForm from "../components/forms_general/TransactionForm.jsx"
import ExpectedExpenseCard from "../components/cards/ExpectedExpenseCard.jsx"

const expected_expenses = [
  {
    "id": 1,
    "amount": 1250.00,
    "title": "Rent / Mortgage",
    "deadline": "2025-12-01",
    "is_paid": false
  },
  {
    "id": 2,
    "amount": 85.50,
    "title": "Electricity Bill",
    "deadline": "2025-11-15",
    "is_paid": true
  },
  {
    "id": 3,
    "amount": 59.99,
    "title": "Internet Bill",
    "deadline": "2025-11-20",
    "is_paid": false
  },
  {
    "id": 4,
    "amount": 45.00,
    "title": "Water Bill",
    "deadline": "2025-11-20",
    "is_paid": false
  },
  {
    "id": 5,
    "amount": 110.00,
    "title": "Phone Plan",
    "deadline": "2025-11-22",
    "is_paid": false
  },
  {
    "id": 6,
    "amount": 65.00,
    "title": "Streaming Services",
    "deadline": "2025-11-18",
    "is_paid": true
  },
  {
    "id": 7,
    "amount": 250.00,
    "title": "Student Loan",
    "deadline": "2025-11-28",
    "is_paid": false
  },
  {
    "id": 8,
    "amount": 250.00,
    "title": "Student Loan",
    "deadline": "2025-11-28",
    "is_paid": false
  },
  {
    "id": 9,
    "amount": 250.00,
    "title": "Student Loan",
    "deadline": "2025-11-28",
    "is_paid": false
  },
  {
    "id": 10,
    "amount": 250.00,
    "title": "Student Loan",
    "deadline": "2025-11-28",
    "is_paid": false
  }
]

const ExpectedExpenses = () => {
    const {setHeaderButton, setModalType, setModalHeader} = useOutletContext()

    const openExpectedExpenseModal = useCallback(() => {
        setModalType(<TransactionForm transaction_type="expected_expense" inc_cat_label="Select income source" exp_dst_label="Select category"/>)
        setModalHeader("Add expected expense")
    }, [setModalHeader, setModalType])

    const modalContext = useMemo(() => ({
      setModalType, 
      setModalHeader
    }), [setModalHeader, setModalType])

    useEffect(() => {
        const addExpectedExpenseButton = <Button text="📅 Add expected expense" onClick={openExpectedExpenseModal}></Button>
        setHeaderButton(addExpectedExpenseButton)

        return () => {
            setHeaderButton(null)
        }
    }, [setHeaderButton, openExpectedExpenseModal])

    return (
        <main className="h-full w-full overflow-y-scroll">
            <div className="h-[10%] w-full p-8 sticky top-0 bg-[#0b1215] z-[20]">
                <div className="grid gap-4 grid-cols-6 grid-rows-1 w-[80%]">
                    <h3 className="col-start-1 col-end-2">Name</h3>
                    <h3 className="col-start-2 col-end-3">Amount</h3>
                    <h3 className="col-start-3 col-end-4">Deadline</h3>
                    <h3 className="col-start-4 col-end-5">Spent from</h3>
                    <h3 className="col-start-5 col-end-6">Recorded to</h3>
                    <h3 className="col-start-6 col-end-7">Status</h3>
                </div>
            </div>
            <div className="flex flex-col w-full h-[90%] gap-4 p-4">
                {
                    expected_expenses.map((expected_expense) => (
                        <ExpectedExpenseCard key={expected_expense.id} expected_expense={expected_expense}/>
                    ))
                }
            </div>
        </main>
    )
}

export default ExpectedExpenses