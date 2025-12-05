import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all income transactions for a user
router.get('/', async (req, res) => {
    const userId = req.headers['user-id']; // Assuming user ID is passed in headers for now as per other routes
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            `SELECT income.*, income.created_at, income_category.title as category_title 
             FROM income 
             LEFT JOIN income_category ON income.inc_cat = income_category.inccatid 
             WHERE income.user_id = $1 
             ORDER BY date DESC, created_at DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error fetching income transactions");
    }
});

// Create a new income transaction
router.post('/', async (req, res) => {
    const userId = req.headers['user-id'];
    const { amount, date, inc_cat, note } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO income (user_id, amount, date, inc_cat, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, amount, date, inc_cat, note]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error creating income transaction");
    }
});

// Update an income transaction
router.put('/:id', async (req, res) => {
    const userId = req.headers['user-id'];
    const { id } = req.params;
    const { amount, date, inc_cat, note } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            'UPDATE income SET amount = $1, date = $2, inc_cat = $3, note = $4 WHERE incomeid = $5 AND user_id = $6 RETURNING *',
            [amount, date, inc_cat, note, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error updating income transaction");
    }
});

// Delete an income transaction
router.delete('/:id', async (req, res) => {
    const userId = req.headers['user-id'];
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await pool.query(
            'DELETE FROM income WHERE incomeid = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }

        res.json({ message: "Transaction deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error deleting income transaction");
    }
});

export default router;
