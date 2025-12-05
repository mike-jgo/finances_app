import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        // Assuming expense_category pk is 'expcatID' and foreign key in expenses is 'exp_cat'
        // Matching the naming convention from incomeCategories.js
        const query = `
      SELECT 
        ec.expcatid AS id,
        ec.title AS "categoryName", 
        'Expense' AS "categoryType",
        ec.icon AS emoji,
        ec.has_limit,
        ec.exp_limit,
        COALESCE(SUM(e.amount), 0) AS "currentSpend"
      FROM expense_category ec
      LEFT JOIN expense e ON ec.expcatid = e.expcat_id
      WHERE ec.user_id = $1
      GROUP BY ec.expcatid
    `;

        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        // has_limit might come as string "true"/"false" from FormData
        let { title, icon, has_limit, exp_limit } = req.body;

        // Convert to boolean/number if needed
        const limitBoolean = has_limit === 'true' || has_limit === true;
        const limitAmount = exp_limit ? parseFloat(exp_limit) : 0;

        const newCategory = await pool.query(
            'INSERT INTO expense_category (user_id, title, icon, amount, has_limit, exp_limit) VALUES ($1, $2, $3, 0, $4, $5) RETURNING *',
            [userId, title, icon, limitBoolean, limitAmount]
        );

        res.json(newCategory.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { title, icon, has_limit, exp_limit } = req.body;
        const userId = req.user.id;

        const limitBoolean = has_limit === 'true' || has_limit === true;
        const limitAmount = exp_limit ? parseFloat(exp_limit) : 0;

        const updateCategory = await pool.query(
            'UPDATE expense_category SET title = $1, icon = $2, has_limit = $3, exp_limit = $4 WHERE expcatID = $5 AND user_id = $6 RETURNING *',
            [title, icon, limitBoolean, limitAmount, id, userId]
        );

        if (updateCategory.rows.length === 0) {
            return res.json("This category is not yours");
        }

        res.json("Category was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deleteCategory = await pool.query(
            'DELETE FROM expense_category WHERE expcatID = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );

        if (deleteCategory.rows.length === 0) {
            return res.json("This category is not yours");
        }

        res.json("Category was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;
