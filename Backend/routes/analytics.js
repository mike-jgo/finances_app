import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get Income Pie Chart Data
router.get('/income-pie', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
        const query = `
            SELECT ic.title as name, SUM(i.amount) as value 
            FROM income i 
            JOIN income_category ic ON i.inc_cat = ic.inccatid 
            WHERE i.user_id = $1 
            GROUP BY ic.title
        `;
        const result = await pool.query(query, [userId]);
        // Format for Recharts: needs number, not string from SUM
        const formatted = result.rows.map(row => ({
            name: row.name,
            value: parseFloat(row.value)
        }));
        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Get Expense Pie Chart Data
router.get('/expense-pie', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
        const query = `
            SELECT ec.title as name, SUM(e.amount) as value 
            FROM expense e 
            JOIN expense_category ec ON e.expcat_id = ec.expcatid 
            WHERE e.user_id = $1 
            GROUP BY ec.title
        `;
        const result = await pool.query(query, [userId]);
        const formatted = result.rows.map(row => ({
            name: row.name,
            value: parseFloat(row.value)
        }));
        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Get Daily Income vs Expense
router.get('/daily', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
        // Fetch Daily Income
        const incomeQuery = `
            SELECT date, SUM(amount) as total 
            FROM income 
            WHERE user_id = $1 
            GROUP BY date
        `;
        const incomeResult = await pool.query(incomeQuery, [userId]);

        // Fetch Daily Expense
        const expenseQuery = `
            SELECT date, SUM(amount) as total 
            FROM expense 
            WHERE user_id = $1 
            GROUP BY date
        `;
        const expenseResult = await pool.query(expenseQuery, [userId]);

        // Combine Data
        const dataMap = new Map();

        const formatDate = (date) => {
            const d = new Date(date);
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');
            const year = d.getFullYear();
            return `${month}/${day}/${year}`;
        }

        incomeResult.rows.forEach(row => {
            const dateStr = formatDate(row.date);
            if (!dataMap.has(dateStr)) dataMap.set(dateStr, { date: dateStr, income: 0, expense: 0 });
            dataMap.get(dateStr).income = parseFloat(row.total);
        });

        expenseResult.rows.forEach(row => {
            const dateStr = formatDate(row.date);
            if (!dataMap.has(dateStr)) dataMap.set(dateStr, { date: dateStr, income: 0, expense: 0 });
            dataMap.get(dateStr).expense = parseFloat(row.total);
        });

        // Convert Map to Array and Sort by Date
        const combinedData = Array.from(dataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

        res.json(combinedData);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

export default router;
