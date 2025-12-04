import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This is the data from above
const mergedData = [
  {
    "date": "Oct 17",
    "income": 263,
    "expense": 195
  },
  {
    "date": "Oct 18",
    "income": 292,
    "expense": 210
  },
  {
    "date": "Oct 19",
    "income": 292,
    "expense": 205
  },
  {
    "date": "Oct 20",
    "income": 284,
    "expense": 180
  },
  {
    "date": "Oct 21",
    "income": 278,
    "expense": 195
  },
  {
    "date": "Oct 22",
    "income": 265,
    "expense": 245
  },
  {
    "date": "Oct 23",
    "income": 280,
    "expense": 230
  },
  {
    "date": "Oct 24",
    "income": 234,
    "expense": 190
  },
  {
    "date": "Oct 25",
    "income": 238,
    "expense": 185
  },
  {
    "date": "Oct 26",
    "income": 190,
    "expense": 160
  },
  {
    "date": "Oct 27",
    "income": 184,
    "expense": 155
  },
  {
    "date": "Oct 28",
    "income": 190,
    "expense": 170
  },
  {
    "date": "Oct 29",
    "income": 202,
    "expense": 195
  },
  {
    "date": "Oct 30",
    "income": 228,
    "expense": 210
  },
  {
    "date": "Oct 31",
    "income": 235,
    "expense": 265
  },
  {
    "date": "Nov 01",
    "income": 254,
    "expense": 200
  },
  {
    "date": "Nov 02",
    "income": 272,
    "expense": 190
  },
  {
    "date": "Nov 03",
    "income": 302,
    "expense": 215
  },
  {
    "date": "Nov 04",
    "income": 301,
    "expense": 225
  },
  {
    "date": "Nov 05",
    "income": 302,
    "expense": 210
  },
  {
    "date": "Nov 06",
    "income": 276,
    "expense": 195
  },
  {
    "date": "Nov 07",
    "income": 248,
    "expense": 180
  },
  {
    "date": "Nov 08",
    "income": 241,
    "expense": 175
  },
  {
    "date": "Nov 09",
    "income": 236,
    "expense": 185
  },
  {
    "date": "Nov 10",
    "income": 187,
    "expense": 150
  },
  {
    "date": "Nov 11",
    "income": 194,
    "expense": 280
  },
  {
    "date": "Nov 12",
    "income": 188,
    "expense": 165
  },
  {
    "date": "Nov 13",
    "income": 225,
    "expense": 190
  },
  {
    "date": "Nov 14",
    "income": 216,
    "expense": 205
  },
  {
    "date": "Nov 15",
    "income": 242,
    "expense": 215
  }
];

const CustomTooltip = ({active, payload, label}) => {
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

const DailyIncomeExpenseGraph = () => {
  return (
    <ResponsiveContainer width="95%" height="100%">
      <LineChart
        data={mergedData}
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
        <Tooltip content={<CustomTooltip label="Income vs Expense" />}/>
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