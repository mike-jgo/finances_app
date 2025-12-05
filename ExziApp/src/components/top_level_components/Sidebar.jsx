import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"

const Sidebar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setUser(null)
        navigate('/')
    }

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
                            to='/dashboard'>
                            📊 Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="/income_categories">💰 Income Sources</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="/expense_categories">💸 Expense Categories</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="/expected_expenses">📅 Expected Expenses</NavLink>
                    </li>
                    <li className="rounded-md">
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="/analytics">📈 Analytics</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `rounded-md transition-colors duration-200 no-underline p-4 block hover:bg-[#18272e] ${isActive ? 'bg-[#447083]' : ''}`} to="/transactions">🧾 Records</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto flex flex-col gap-2">
                <p className="text-white">Welcome, {user?.firstname}!</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar