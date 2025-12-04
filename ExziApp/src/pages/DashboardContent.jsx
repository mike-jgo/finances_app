import { useCallback, useEffect, useState } from "react"
import { useOutletContext } from 'react-router'
import Button from "../components/Button.jsx"
import AddTransactionPopup from "../components/modal_components/AddTransactionPopup.jsx"
const DashboardContent = () => {
    const { setHeaderButton, setModalType, setModalHeader } = useOutletContext()

    const openAddModal = useCallback(() => {
        setModalType(<AddTransactionPopup />)
        setModalHeader('Add transaction')
    }, [setModalType, setModalHeader])

    useEffect(() => {
        const addTransactionButton = <Button text="➕ Add transaction" onClick={openAddModal}/>
        
        setHeaderButton(addTransactionButton)

        return () => {
            setHeaderButton(null)
        }
    }, [setHeaderButton, openAddModal])

    return(
        <main className="h-full grid gap-8 grid-rows-12 grid-cols-12 p-4">
            <section className="rounded-md p-4 h-full row-start-[1] row-end-[5] col-start-[1] col-end-[7] bg-[linear-gradient(137deg,rgba(58,254,254,1)_0%,rgba(251,36,233,1)_100%)]">
                <h2>Total Budget</h2>
                <h1>10,000.00</h1>
            </section>
            <section className="flex justify-between items-center rounded-lg p-4 col-start-[7] col-end-[13] row-start-[1] row-end-[3] bg-[#0d1518]">
                <h2>Budget for November 2025</h2>
                <p className="text-green-400 text-3xl font-bold">10,000.00</p> 
            </section>
            <section className="flex justify-between items-center bg-[#0d1518] p-4 rounded-sm col-start-[7] col-end-[13] row-start-[3] row-end-[5]">
                <h2>Expenses in November 2025</h2>
                <p className="text-red-700 text-3xl font-bold">10,000.00</p>
            </section>
                <section className="bg-[#0d1518] rounded-sm p-4 col-start-[1] col-end-[7] row-start-[5] row-end-[13]">
                <h2>Recent Transactions</h2>
            </section>
            <section className="bg-[#0d1518] p-4 col-start-[7] col-end-[13] row-start-[5] row-end-[13]">
                <h2>Expense Summary</h2>
            </section>
        </main>
    )
}

export default DashboardContent