import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all expense transactions for a user
router.get('/', async (req, res) => {
    const userId = req.headers['user-id'];
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            `SELECT expense.*, expense.created_at, expense_category.title as category_title, income_category.title as income_source_title
             FROM expense 
             LEFT JOIN expense_category ON expense.expcat_id = expense_category.expcatid
             LEFT JOIN income_category ON expense.inccat_id = income_category.inccatid
             WHERE expense.user_id = $1 
             ORDER BY date DESC, created_at DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error fetching expense transactions");
    }
});

// Create a new expense transaction
router.post('/', async (req, res) => {
    const userId = req.headers['user-id'];
    const { amount, date, inccat_id, expcat_id, note } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO expense (user_id, amount, date, inccat_id, expcat_id, note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [userId, amount, date, inccat_id, expcat_id, note]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error creating expense transaction");
    }
});

// Update an expense transaction
router.put('/:id', async (req, res) => {
    const userId = req.headers['user-id'];
    const { id } = req.params;
    const { amount, date, inccat_id, expcat_id, note } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            'UPDATE expense SET amount = $1, date = $2, inccat_id = $3, expcat_id = $4, note = $5 WHERE expenseid = $6 AND user_id = $7 RETURNING *',
            [amount, date, inccat_id, expcat_id, note, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error updating expense transaction");
    }
});

// Delete an expense transaction
router.delete('/:id', async (req, res) => {
    const userId = req.headers['user-id'];
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            'DELETE FROM expense WHERE expenseid = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }

        res.json({ message: "Transaction deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error deleting expense transaction");
    }
});

export default router;
