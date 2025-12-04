import { Field, Input, Textarea, Switch } from '@headlessui/react'
import TranscDatePicker from '../form_components/TranscDatePicker'
import {DatePicker, IncomeSourceField, ExpenseCategoryField, TransferSourceField, TransferDestField} from './TransactionFormComponents'

const TransactionForm = ({transaction_type, inc_cat_label, exp_src_label, exp_dst_label, transfer_src_label, transfer_dst_label}) => {

    const renderSection = () => {
        switch (transaction_type) {
            case 'income':
                return (
                    <>
                        <IncomeSourceField transaction_type={transaction_type} inc_cat_label={inc_cat_label}/>
                        <DatePicker transaction_type={transaction_type} />
                    </>
                )
            case 'expected_expense':
            case 'expense':
                return (
                    <>
                        <IncomeSourceField transaction_type={transaction_type} inc_cat_label={inc_cat_label}/>
                        <ExpenseCategoryField exp_dst_label={exp_dst_label} />
                        <DatePicker transaction_type={transaction_type} />
                    </>
                )
            case 'transfer':
                return (
                    <>
                        <TransferSourceField transfer_src_label={transfer_src_label} />
                        <TransferDestField transfer_dst_label={transfer_dst_label} />
                    </>
                )
        }
    }

    return (
        <div className="h-full flex flex-col p-4 gap-4">
            <div className="flex justify-between w-full gap-4 shrink-0">
                {renderSection()}
            </div>
            <Field as="div" className="flex flex-col shrink-0">
                <label>Enter amount</label>
                <Input className="p-4 border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow"/>
            </Field>
            <Field as="div" className="flex flex-col shrink-0 grow">
                <label>Enter note</label>
                <Textarea className="p-4 border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow"/>
            </Field>
        </div>
    )
}

export default TransactionForm