import { useCallback, useEffect, useState, useContext } from "react"
import { useOutletContext } from 'react-router'
import Button from "../components/Button.jsx"
import AddTransactionPopup from "../components/modal_components/AddTransactionPopup.jsx"
import { UserContext } from "../contexts/UserContext.jsx"

const DashboardContent = () => {
    const { setHeaderButton, setModalType, setModalHeader, setModalOnConfirm } = useOutletContext()
    const { user } = useContext(UserContext)
    const [incomeCategories, setIncomeCategories] = useState([])
    const [expenseCategories, setExpenseCategories] = useState([])

    const fetchCategories = useCallback(async () => {
        if (!user?.id) return;
        try {
            // Fetch Income Categories
            const incResponse = await fetch('http://localhost:3001/api/income-categories', {
                headers: { 'user-id': user.id }
            });
            if (incResponse.ok) {
                setIncomeCategories(await incResponse.json());
            }

            // Fetch Expense Categories
            const expResponse = await fetch('http://localhost:3001/api/expense-categories', {
                headers: { 'user-id': user.id }
            });
            if (expResponse.ok) {
                setExpenseCategories(await expResponse.json());
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleAddTransaction = useCallback(async (formData) => {
        if (!user?.id) return;
        const transactionType = formData.get('transaction_type');

        try {
            let url = '';
            if (transactionType === 'income') {
                url = 'http://localhost:3001/api/income';
            } else if (transactionType === 'expense') {
                url = 'http://localhost:3001/api/expenses';
            } else {
                console.log("Other transaction types not yet implemented");
                setModalType(null);
                setModalOnConfirm(null);
                return;
            }

            const data = Object.fromEntries(formData);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': user.id
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log(`${transactionType} transaction added`);
                setModalType(null); // Close modal
                setModalOnConfirm(null);
            } else {
                console.error(`Failed to add ${transactionType} transaction`);
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    }, [user, setModalType, setModalOnConfirm]);

    const openAddModal = useCallback(() => {
        setModalType(<AddTransactionPopup incomeCategories={incomeCategories} expenseCategories={expenseCategories} />)
        setModalHeader('Add transaction')
        setModalOnConfirm(() => handleAddTransaction)
    }, [setModalType, setModalHeader, setModalOnConfirm, incomeCategories, expenseCategories, handleAddTransaction])

    useEffect(() => {
        const addTransactionButton = <Button text="➕ Add transaction" onClick={openAddModal} />

        setHeaderButton(addTransactionButton)

        return () => {
            setHeaderButton(null)
            setModalOnConfirm(null)
        }
    }, [setHeaderButton, openAddModal, setModalOnConfirm])

    return (
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