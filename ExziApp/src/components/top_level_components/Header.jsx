// header component -> will receive Section Title, Sub-message (optional), list of buttons

const Header = ({ main_msg, sub_msg, button, className="",}) => {
    return (
        <header className={`flex justify-between items-center p-4 ${className}`}>
            <div>
                <h1>{main_msg}</h1>
                <p>{sub_msg}</p>
            </div>
            {
                button && (
                    <div>
                        {button}
                    </div>
                )
            }
            
        </header>
    )
}

export default Header;