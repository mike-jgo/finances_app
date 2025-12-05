
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Input, Switch } from "@headlessui/react"
import { useState, useContext, useEffect, useCallback, useMemo } from "react"
import { UserContext } from "../contexts/UserContext.jsx"
import BaseCard from "../components/cards/BaseCard.jsx"
// Creating a simple table for transactions as per typical design
import { format } from 'date-fns'

const today = new Date()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const MonthSelector = ({ currMonth, setCurrMonth }) => {
    return (
        <Listbox as="div" className="w-full" value={currMonth} onChange={setCurrMonth}>
            <ListboxButton className="w-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">{currMonth}</ListboxButton>
            <ListboxOptions anchor="bottom" className="w-(--button-width)">
                {
                    months.map((month) => (
                        <ListboxOption key={month} value={month} className="bg-black data-focus:bg-gray-900">
                            {month}
                        </ListboxOption>
                    ))
                }
            </ListboxOptions>
        </Listbox>
    )
}

const YearSelector = ({ currYear, setCurrYear }) => {
    const maxYear = today.getFullYear()
    const years = Array.from({ length: (maxYear - 1970) + 1 }, (_, i) => maxYear - i)
    return (
        <Listbox as="div" className="w-full" value={currYear} onChange={setCurrYear}>
            <ListboxButton className="w-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">{currYear}</ListboxButton>
            <ListboxOptions anchor="bottom" className="!max-h-60 overflow-y-scroll w-(--button-width)">
                {
                    years.map((year) => (
                        <ListboxOption key={year} value={year} className="bg-black data-focus:bg-gray-900">{year}</ListboxOption>
                    ))
                }
            </ListboxOptions>
        </Listbox>
    )
}


const Transactions = () => {
    const { user } = useContext(UserContext)
    const [transactions, setTransactions] = useState([])

    // Filter State
    const [currMonth, setCurrMonth] = useState(months[today.getMonth()])
    const [currYear, setCurrYear] = useState(today.getFullYear())
    const [showAll, setShowAll] = useState(false)

    const fetchTransactions = useCallback(async () => {
        if (!user?.id) return;
        try {
            const [incomeRes, expenseRes] = await Promise.all([
                fetch('http://localhost:3001/api/income', { headers: { 'user-id': user.id } }),
                fetch('http://localhost:3001/api/expenses', { headers: { 'user-id': user.id } })
            ]);

            const incomeData = incomeRes.ok ? await incomeRes.json() : [];
            const expenseData = expenseRes.ok ? await expenseRes.json() : [];

            // Add type to distinguish
            const incomes = incomeData.map(i => ({ ...i, type: 'income' }));
            const expenses = expenseData.map(e => ({ ...e, type: 'expense' }));

            const combined = [...incomes, ...expenses].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA.getTime() !== dateB.getTime()) {
                    return dateB - dateA; // Sort by date descending
                }
                // Tie-breaker: sort by created_at descending
                const createdAtA = new Date(a.created_at || 0);
                const createdAtB = new Date(b.created_at || 0);
                if (createdAtA.getTime() !== createdAtB.getTime()) {
                    return createdAtB - createdAtA;
                }

                // Final fallback to ID
                const idA = a.incomeid || a.expenseid;
                const idB = b.incomeid || b.expenseid;
                return idB - idA;
            });
            setTransactions(combined);

        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const filteredTransactions = useMemo(() => {
        if (showAll) return transactions;

        return transactions.filter(t => {
            const tDate = new Date(t.date);
            // new Date() might be timezone sensitive, but let's assume local or UTC consistency for now
            // months array is 0-indexed matches getMonth()
            const tMonth = months[tDate.getMonth()]; // Get text representation
            const tYear = tDate.getFullYear();

            return tMonth === currMonth && tYear === currYear;
        });
    }, [transactions, showAll, currMonth, currYear]);

    return (
        <main className="w-full p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <h2>Filter entries</h2>
                    <div className="flex items-center gap-2 ml-4">
                        <span className={showAll ? "text-gray-400" : "text-white"}>Filtered</span>
                        <Switch
                            checked={showAll}
                            onChange={setShowAll}
                            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition data-[checked]:bg-blue-600"
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                        </Switch>
                        <span className={showAll ? "text-white" : "text-gray-400"}>Show All</span>
                    </div>
                </div>

                <div className={`flex w-1/2 gap-4 flex-row-reverse transition-opacity duration-300 ${showAll ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex flex-col w-1/4">
                        <h3>Select month</h3>
                        <MonthSelector currMonth={currMonth} setCurrMonth={setCurrMonth} />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <h3>Select year</h3>
                        <YearSelector currYear={currYear} setCurrYear={setCurrYear} />
                    </div>
                </div>
            </div>

            <section className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#646464]">
                            <th className="p-4">Date</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Note</th>
                            <th className="p-4 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length === 0 ? (
                            <tr><td colSpan="4" className="p-4 text-center">No transactions found</td></tr>
                        ) : (
                            filteredTransactions.map((t) => (
                                <tr key={`${t.type}-${t.incomeid || t.expenseid}`} className="border-b border-[#303030] hover:bg-[#18272e]">
                                    <td className="p-4">{format(new Date(t.date), 'MM/dd/yyyy')}</td>
                                    <td className="p-4">{t.category_title || 'Uncategorized'}</td>
                                    <td className="p-4">{t.note}</td>
                                    <td className={`p-4 text-right ${t.type === 'income' ? 'text-green-400' : 'text-red-700'}`}>
                                        {t.type === 'income' ? '+' : '-'}{t.amount}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Transactions