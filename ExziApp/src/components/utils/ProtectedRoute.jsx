import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { UserContext } from '../../contexts/UserContext'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext)

    if (!user) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute
