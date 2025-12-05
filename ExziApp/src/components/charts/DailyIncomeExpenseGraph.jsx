import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-[#0b1215] rounded-lg">
        <h4>{label}</h4>
        <p>Income: {payload[0].payload.income}</p>
        <span>Expense: {payload[0].payload.expense} </span>
      </div>
    )
  }
}

const DailyIncomeExpenseGraph = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="95%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip label="Income vs Expense" />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#bb4a31"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DailyIncomeExpenseGraph;