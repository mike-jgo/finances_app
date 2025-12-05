import { MdClose } from "react-icons/md";

const BaseForm = ({ onClose, display, displayName, onConfirm }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onConfirm) {
            const formData = new FormData(e.target);
            onConfirm(formData);
        }
    }
    return (
        <div className="flex justify-center items-center fixed inset-0 w-screen h-screen bg-black/90 z-[999]">
            <div className="flex flex-col pointer-events-auto z-[1000] rounded-lg w-[40%] h-[65%] bg-[#040708] shadow-[0px_0px_5px_rgba(255,255,255,0.5)] p-4">
                <div className="flex justify-between align-center h-[10%]">
                    <h1 className="leading-none m-0 p-0">{displayName}</h1>
                    <div className="text-[2rem] m-0 p-0" onClick={onClose}>
                        <MdClose></MdClose>
                    </div>
                </div>
                <form className="h-[90%]" onSubmit={handleSubmit}>
                    <div className="h-[90%]">
                        {display}
                    </div>
                    <div className="h-[10%] flex justify-center gap-4">
                        <button className="w-1/4 p-2 bg-white text-black rounded-sm" type="submit">Submit</button>
                        <button className="w-1/4 p-2 rounded-sm border border-white" type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BaseForm