import { TabGroup, TabPanels, TabList, Tab, TabPanel } from '@headlessui/react'
import { useState, useContext, useEffect, useCallback } from "react"
import { UserContext } from "../contexts/UserContext.jsx"
import ExpensePieChart from '../components/charts/ExpensePieChart.jsx'
import IncomePieChart from '../components/charts/IncomePieChart.jsx'
import DailyIncomeExpenseGraph from '../components/charts/DailyIncomeExpenseGraph.jsx'

const AnalyticsContent = () => {
    const { user } = useContext(UserContext)
    const [incomeData, setIncomeData] = useState([])
    const [expenseData, setExpenseData] = useState([])
    const [graphData, setGraphData] = useState([])

    const fetchAnalytics = useCallback(async () => {
        if (!user?.id) return;
        try {
            const [incomeRes, expenseRes, graphRes] = await Promise.all([
                fetch('http://localhost:3001/api/analytics/income-pie', { headers: { 'user-id': user.id } }),
                fetch('http://localhost:3001/api/analytics/expense-pie', { headers: { 'user-id': user.id } }),
                fetch('http://localhost:3001/api/analytics/daily', { headers: { 'user-id': user.id } })
            ]);

            if (incomeRes.ok) setIncomeData(await incomeRes.json());
            if (expenseRes.ok) setExpenseData(await expenseRes.json());
            if (graphRes.ok) setGraphData(await graphRes.json());

        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return (
        <TabGroup defaultIndex={0} as="div" className="h-full w-full p-4 flex flex-col gap-4">
            <TabList as="div" className="w-full h-[10%] bg-[#18272e] p-2 rounded-lg">
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Monthly Income Breakdown</Tab>
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Monthly Expense Breakdown</Tab>
                <Tab className="h-full w-1/3 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Income vs Expense Graph</Tab>
            </TabList>
            <TabPanels as="div" className="h-[90%]">
                <TabPanel as="div" className="h-full">
                    <IncomePieChart data={incomeData} />
                </TabPanel>
                <TabPanel as="div" className="h-full">
                    <ExpensePieChart data={expenseData} />
                </TabPanel>
                <TabPanel as="div" className="h-full">
                    <DailyIncomeExpenseGraph data={graphData} />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default AnalyticsContent

