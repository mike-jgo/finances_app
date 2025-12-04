import { Input, Field, RadioGroup } from "@headlessui/react"
import { useState } from 'react'
import { CategoryNameField, IconPicker } from "./CategoryFormComponents";
import Icon from "@mui/material/Icon";
import { BudgetSetter } from "./CategoryFormComponents.jsx";

const emojiIcons = [
    // --- Income & Business ---
    "💰", "💵", "🤑", "💸", "💼", "📈", "💹", "🏦", "🏛️", "💻",
    "🛠️", "🧑‍🏫", "🎁", "🧧", "🏠", "💲",

    // --- Home & Utilities ---
    "🏡", "🔑", "🧾", "💡", "⚡️", "💧", "🔥", "💨", "🗑️", "🌐",
    "📱", "☎️", "🛋️", "🪴", "🌱", "🧼", "🧻", "🧹", "🔨", "🔧",

    // --- Food & Dining ---
    "🛒", "🍓", "🥦", "🍞", "🥩", "🧀", "🍔", "🍕", "🍽️", "🥡",
    "☕️", "🍵", "🍩", "🍪", "🍻", "🍷", "🍸",

    // --- Transportation ---
    "🚗", "🚙", "🚌", "🚐", "🚆", "🚇", "✈️", "🚢", "⛽️", "🅿️",
    "🚦", "🗺️", "🚲", "🛴", "🚕", "🛡️",

    // --- Personal & Shopping ---
    "🛍️", "👕", "👖", "👗", "👟", "👠", "👜", "🎒", "💍", "🕶️",
    "💄", "💅", "🧴", "✂️", "💈", "💝", "💖", "💎",

    // --- Health & Wellness ---
    "🩺", "💊", "⚕️", "🏥", "🚑", "🦷", "👓", "💪", "🏋️‍♀️", "🧘",
    "🧠", "🥗", "🏃", "❤️",

    // --- Entertainment & Leisure ---
    "🎬", "🎟️", "🎭", "📺", "🎮", "👾", "🎨", "🖌️", "🎵", "🎶",
    "🎧", "🎤", "📚", "📖", "🏕️", "🏖️", "🏝️", "🥂", "🥳", "🎉",

    // --- Family & Kids ---
    "👶", "🍼", "🧸", "🪁", "🏫", "🖍️", "👨‍👩‍👧‍👦", "🐶", "🐱",
    "🐾", "🦴",

    // --- Finance & Other ---
    "🐷", "💳", "📉", "💯", "🪙", "🎓", "⚖️", "📦", "❓",
    "📎", "✏️", "🕊️", "🙏"
];



const CategoryForm = ({ type, mode, name_label, icon_pick_label }) => {
    const [currIcon, selectIcon] = useState(emojiIcons[0])

    const renderSection = () => {
        switch (mode) {
            case 'add':
                if (type === 'income') {
                    return (
                        <>
                            <CategoryNameField name_label="Enter name" />
                            <IconPicker type="income" icon_pick_label="Select icon" />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <CategoryNameField name_label="Enter name" />
                            <BudgetSetter budget_set_label="Enable budget limit?" budget_enter_amount="Enter limit" />
                            <IconPicker type="income" icon_pick_label="Select icon" />
                        </>
                    )
                }
            case 'update':
                if (type === 'income') {
                    return (
                        <>
                            <CategoryNameField name_label="Enter name" />
                            <IconPicker type="income" icon_pick_label="Select icon" />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <CategoryNameField name_label="Enter name" />
                            <IconPicker type="income" icon_pick_label="Select icon" />
                        </>
                    )
                }
            case 'budget_toggle':
                return (
                    <>
                        <BudgetSetter budget_set_label="Set budget limit?" budget_enter_amount="Enter amount" />
                    </>
                )
        }
    }

    return (
        <div className="h-full flex flex-col gap-4 p-4">
            {renderSection()}
        </div>
    )
}

export default CategoryForm