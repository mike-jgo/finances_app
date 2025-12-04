import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Input } from "@headlessui/react"
import { useState } from "react"

const today = new Date()

const MonthSelector = () => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [currMonth, getCurrMonth] = useState(months[today.getMonth()])

    return (
        <Listbox as="div" className="w-full" value={currMonth} onChange={getCurrMonth}>
            <ListboxButton className="w-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">{currMonth}</ListboxButton>
            <ListboxOptions anchor="bottom" className="w-(--button-width)">
                {
                    months.map((month) => (
                        <ListboxOption key={month} value={month} className="bg-black data-focus:bg-gray-900">
                            {month}
                        </ListboxOption>
                    ))
                }
            </ListboxOptions>
        </Listbox>
    )
}

const YearSelector = () => {
    const [currYear, setCurrYear] = useState(today.getFullYear())
    const years = Array.from({length: (currYear - 1970) + 1}, (_, i) => currYear - i)
    return (
        <Listbox as="div" className="w-full" value={currYear} onChange={setCurrYear}>
            <ListboxButton className="w-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">{currYear}</ListboxButton>
            <ListboxOptions anchor="bottom" className="!max-h-60 overflow-y-scroll w-(--button-width)">
                {
                    years.map((year) => (
                        <ListboxOption key={year} value={year} className="bg-black data-focus:bg-gray-900">{year}</ListboxOption>
                    ))
                }
            </ListboxOptions>
        </Listbox>
    )
}


const Transactions = () => {
    return (
        <main className="w-full p-4">
            <div className="flex justify-between items-center w-full">
                <h2>Filter entries</h2>
                <div className="flex w-1/2 gap-4 flex-row-reverse">
                    <div className="flex flex-col w-1/4">
                        <h3>Select month</h3>
                        <MonthSelector />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <h3>Select year</h3>
                        <YearSelector />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Transactions