import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'

const PaymentStatusSelector = () => {
    const [currStatus, setStatus] = useState('Pending')

    return (
        <Listbox as="div" className="w-full h-full" value={currStatus} onChange={setStatus}>
            <ListboxButton className="w-full h-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">{currStatus}</ListboxButton>
            <ListboxOptions anchor="bottom" className="z-[1001] w-(--button-width) border border-[#646464] rounded-sm">
                <ListboxOption key='1' value="Pending" className="bg-black data-focus:bg-[#0b1215] p-2">
                    Pending
                </ListboxOption>
                <ListboxOption key='2' value="Paid" className="bg-black data-focus:bg-[#0b1215] p-2">
                    Paid
                </ListboxOption>
                <ListboxOption key='3' value="Cancelled" className="bg-black data-focus:bg-[#0b1215] p-2">
                    Cancelled
                </ListboxOption>
            
            </ListboxOptions>
        </Listbox>
    )
}

export default PaymentStatusSelector