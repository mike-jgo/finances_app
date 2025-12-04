import { TabGroup, TabPanels, TabList, Tab, TabPanel } from '@headlessui/react'
import ExpensePieChart from '../components/charts/ExpensePieChart.jsx'
import IncomePieChart from '../components/charts/IncomePieChart.jsx'
import DailyIncomeExpenseGraph from '../components/charts/DailyIncomeExpenseGraph.jsx'

const AnalyticsContent = () => {
    return (
        <TabGroup defaultIndex={0} as="div" className="h-full w-full p-4 flex flex-col gap-4">
            <TabList as="div" className="w-full h-[10%] bg-[#18272e] p-2 rounded-lg">
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Monthly Income Breakdown</Tab>
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Monthly Expense Breakdown</Tab>
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Income vs Expense Graph</Tab>
            </TabList>
            <TabPanels as="div" className="h-[90%]">
                <TabPanel as="div" className="h-full">
                    <IncomePieChart />
                </TabPanel>
                <TabPanel as="div" className="h-full">
                    <ExpensePieChart />
                </TabPanel>
                <TabPanel as="div" className="h-full">
                    <DailyIncomeExpenseGraph />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default AnalyticsContent

