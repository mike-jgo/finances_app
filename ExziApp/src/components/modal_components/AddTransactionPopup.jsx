import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import TransactionForm from '../forms_general/TransactionForm.jsx'

const AddTransactionPopup = () => {
    return (
        <TabGroup defaultIndex={0} as="div" className="flex flex-col justify-between w-full h-full p-2">
            <TabList as="div" className="w-full bg-[#101010] p-1 rounded-lg h-[10%]">
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-white data-[selected]:text-black transition duration-300 ease-in-out">Income</Tab>
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-white data-[selected]:text-black transition duration-300 ease-in-out">Expense</Tab>
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-white data-[selected]:text-black transition duration-300 ease-in-out">Transfer</Tab>
            </TabList>
            <TabPanels as="div" className="h-[90%]">
                <TabPanel as="div" className="h-full">
                    <TransactionForm transaction_type="income" inc_cat_label="Select category" />
                </TabPanel>
                <TabPanel as="div" className="h-full">
                    <TransactionForm transaction_type="expense" inc_cat_label="Select source of funds" exp_dst_label="Select category" />
                </TabPanel>
                <TabPanel as="div" className="h-full">
                    <TransactionForm transaction_type="transfer" transfer_dst_label="To" transfer_src_label="From" />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default AddTransactionPopup