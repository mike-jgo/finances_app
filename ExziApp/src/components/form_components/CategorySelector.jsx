import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'

const CategorySelector = ({ categoryList }) => {
    const [currCategory, setCurrCategory] = useState(categoryList[0])

    return (
        <Listbox as="div" className="w-full h-full" value={currCategory} onChange={setCurrCategory}>
            <ListboxButton className="w-full h-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">{currCategory.name}</ListboxButton>
            <ListboxOptions anchor="bottom" className="z-[1001] w-(--button-width) border border-[#646464] rounded-sm">
                {categoryList.map((person) => (
                <ListboxOption key={person.id} value={person} className="bg-black data-focus:bg-gray-900">
                    {person.name}
                </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}

export default CategorySelector