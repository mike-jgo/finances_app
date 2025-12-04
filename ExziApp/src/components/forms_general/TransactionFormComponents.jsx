import { Field, Input, Textarea, Switch } from '@headlessui/react'
import TranscDatePicker from '../form_components/TranscDatePicker'
import { useState } from 'react'
import CategorySelector from '../form_components/CategorySelector'
const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

export const IncomeSourceField = ({ inc_cat_label, exp_src_label, transaction_type }) => {
    return (
        <Field as="div" className={`${transaction_type === 'expense' ? 'w-1/3' : 'w-1/2'} h-full flex flex-col`}>
            <label>{inc_cat_label || exp_src_label}</label>
            <CategorySelector categoryList={people} />
        </Field>
    )
}

export const ExpenseCategoryField = ({ exp_dst_label }) => {
    return (
        <Field as="div" className="flex flex-col w-1/3 h-full">
            <label>{exp_dst_label}</label>
            <CategorySelector categoryList={people} />
        </Field>
    )
}

export const TransferSourceField = ({ transfer_src_label }) => {
    return (
        <Field as="div" className="flex flex-col w-1/2">
            <label>{transfer_src_label}</label>
            <CategorySelector categoryList={people} />
        </Field>
    )
}

export const TransferDestField = ({ transfer_dst_label }) => {
    return (
        <Field as="div" className="flex flex-col w-1/2">
            <label>{transfer_dst_label}</label>
            <CategorySelector categoryList={people} />
        </Field>
    )
}

export const DatePicker = ({ transaction_type }) => {
    return (
        <Field as="div" className={`${transaction_type === 'expense' ? 'w-1/3' : 'w-1/2'} h-full flex flex-col`}>
            <label>Select date</label>
            <TranscDatePicker />
        </Field>
    )
}