import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';

// Define a list of colors for the pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#E319A0'];

const IncomePieChart = ({ isAnimationActive = true, data = [] }) => {
    return (
        <ResponsiveContainer width="100%" height='100%'>
            <PieChart>
                <Legend layout="vertical" verticalAlign="middle" align='right' />
                <Pie
                    data={data}
                    dataKey="value"         // Updated to match backend response
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    label
                    isAnimationActive={isAnimationActive}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default IncomePieChart;