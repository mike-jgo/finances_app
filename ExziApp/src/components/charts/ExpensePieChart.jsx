import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: "Food",
        TotalExpenses: 850,
    },
    {
        name: "Transport",
        TotalExpenses: 420,
    },
    {
        name: "Bills",
        TotalExpenses: 1200,
    },
    {
        name: "Entertainment",
        TotalExpenses: 280,
    },
    {
        name: "Health",
        TotalExpenses: 150,
    },
    {
        name: "Shopping",
        TotalExpenses: 320,
    }
]

// Define a list of colors for the pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#E319A0'];

const ExpensePieChart = ({isAnimationActive = true}) => {
    return (
        // Wrap the chart in ResponsiveContainer, which you imported
        // This is the standard way to make recharts responsive
        <ResponsiveContainer width="100%" height='100%'> 
            <PieChart>
                <Legend layout="vertical" verticalAlign="middle" align='right'/>
                <Pie
                    data={data}
                    dataKey="TotalExpenses" // The value for each slice
                    nameKey="name"          // The label for each slice
                    cx="50%"                // Center x-coordinate
                    cy="50%"                // Center y-coordinate
                    outerRadius="80%"       // Size of the pie
                    fill="#8884d8"          // Default fill
                    label                   // Show labels on the slices
                    isAnimationActive={isAnimationActive}
                >
                    {/* Map over the data to assign a color to each Cell */}
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default ExpensePieChart;