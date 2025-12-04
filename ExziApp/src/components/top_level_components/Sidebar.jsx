import React from "react"
import { NavLink } from "react-router"

const Sidebar = () => {
    return (
        <div className="bg-[#101a1e] h-full p-6 flex flex-col gap-4">
            <h1>⚡ExziApp</h1>
            <nav>
                <ul className="list-none">
                    <li className="rounded-md">
                        <NavLink
                            className={({ isActive }) =>
                                `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''
                                }`
                            }
                            to='/app'>
                            📊 Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="income_categories">💰 Income Sources</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="expense_categories">💸 Expense Categories</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="expected_expenses">📅 Expected Expenses</NavLink>
                    </li>
                    <li className="rounded-md">
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="analytics">📈 Analytics</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="transactions">🧾 Records</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar