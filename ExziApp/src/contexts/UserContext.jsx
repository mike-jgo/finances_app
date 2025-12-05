import { createContext, useEffect, useMemo, useState } from 'react'

export const UserContext = createContext({
    user: null,
    setUser: () => {},
})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    const value = useMemo(() => ({ user, setUser }), [user])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
