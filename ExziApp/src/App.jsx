import styles from './App.module.css'
import Sidebar from './components/top_level_components/Sidebar.jsx'
import { Outlet } from 'react-router'
import LoginPage from './components/login_registration/LoginPage.jsx'

function App() {
    return (
        <div className={styles.app_layout}>
            <div className={styles.app_sidebar}>
                <Sidebar/>
            </div>
            <div className={styles.app_content}>
                <Outlet/>
            </div>
        </div>
    )
}

export default App
