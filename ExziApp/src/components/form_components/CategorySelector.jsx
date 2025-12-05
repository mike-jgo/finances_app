import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState, useEffect } from 'react'

const CategorySelector = ({ categoryList, name }) => {
    const [currCategory, setCurrCategory] = useState(categoryList?.[0] || { name: 'Select Category', id: '' })

    // Update selected category when list populates if currently not set or invalid
    useEffect(() => {
        const currentId = currCategory.id || currCategory.inccatid;
        if (categoryList?.length > 0 && (!currentId || !categoryList.find(c => (c.id || c.inccatid) === currentId))) {
            setCurrCategory(categoryList[0])
        }
    }, [categoryList, currCategory])

    return (
        <Listbox as="div" className="w-full h-full" value={currCategory} onChange={setCurrCategory} name={name}>
            <input type="hidden" name={name} value={currCategory.id || currCategory.inccatid} />
            <ListboxButton className="w-full h-full border border-[#646464] rounded-sm data-focus:border-white hover:border hover:border-white hover:transition duration-300 ease-in-out">
                {currCategory.name || currCategory.title || currCategory.categoryName || 'Select Category'}
            </ListboxButton>
            <ListboxOptions anchor="bottom" className="z-[1001] w-(--button-width) border border-[#646464] rounded-sm">
                {(categoryList || []).map((category) => (
                    <ListboxOption key={category.id} value={category} className="bg-black data-focus:bg-gray-900">
                        {category.name || category.title || category.categoryName}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}

export default CategorySelector