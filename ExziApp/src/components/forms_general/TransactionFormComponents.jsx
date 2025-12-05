import { Field, Input, Textarea, Switch } from '@headlessui/react'
import TranscDatePicker from '../form_components/TranscDatePicker'
import { useState } from 'react'
import CategorySelector from '../form_components/CategorySelector'

export const IncomeSourceField = ({ inc_cat_label, exp_src_label, transaction_type, categories, name }) => {
    const fieldName = name || 'inc_cat'

    return (
        <Field as="div" className={`${transaction_type === 'expense' ? 'w-1/3' : 'w-1/2'} h-full flex flex-col`}>
            <label>{inc_cat_label || exp_src_label}</label>
            <CategorySelector categoryList={categories} name={fieldName} />
        </Field>
    )
}

export const ExpenseCategoryField = ({ exp_dst_label, categories }) => {
    return (
        <Field as="div" className="flex flex-col w-1/3 h-full">
            <label>{exp_dst_label}</label>
            <CategorySelector categoryList={categories} name="expcat_id" />
        </Field>
    )
}

export const TransferSourceField = ({ transfer_src_label }) => {
    const transferCategories = [{ id: 1, name: 'Bank' }, { id: 2, name: 'Cash' }]
    return (
        <Field as="div" className="flex flex-col w-1/2">
            <label>{transfer_src_label}</label>
            <CategorySelector categoryList={transferCategories} name="transfer_src" />
        </Field>
    )
}

export const TransferDestField = ({ transfer_dst_label }) => {
    const transferCategories = [{ id: 1, name: 'Bank' }, { id: 2, name: 'Cash' }]
    return (
        <Field as="div" className="flex flex-col w-1/2">
            <label>{transfer_dst_label}</label>
            <CategorySelector categoryList={transferCategories} name="transfer_dst" />
        </Field>
    )
}

export const DatePicker = ({ transaction_type }) => {
    return (
        <Field as="div" className={`${transaction_type === 'expense' ? 'w-1/3' : 'w-1/2'} h-full flex flex-col`}>
            <label>Select date</label>
            <TranscDatePicker name="date" />
        </Field>
    )
}