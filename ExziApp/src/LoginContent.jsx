import { Outlet } from "react-router"

const LoginContent = () => {
    return (
        <div className="w-screen h-screen">
            <Outlet />
        </div>
    )
}

export default LoginContent