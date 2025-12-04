import { MdClose } from "react-icons/md"

const BaseDialog = ({ dialog_type, icon, confirmButton, cancelButton, message, onClose }) => {
    return (
        <div className="flex justify-center items-center fixed inset-0 w-screen h-screen bg-black/90 z-[1999]">
            <div className="flex flex-col justify-between pointer-events-auto z-[1999] rounded-lg w-[30%] h-[30%] bg-[#040708] shadow-[0px_0px_5px_rgba(255,255,255,0.5)] p-4">
                <div className="flex justify-between items-center">
                    <p className="text-[2rem]">{dialog_type}</p>
                    <div className="text-[2rem] m-0 p-0" onClick={onClose}>
                        <MdClose></MdClose>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-[#101a1e] rounded-lg p-2 text-[2rem]">
                        {icon}
                    </div>
                    <p>{message}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="w-1/4 p-2 bg-white text-black rounded-sm">Confirm</button>
                    <button className="w-1/4 p-2 bg-white text-black rounded-sm">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default BaseDialog