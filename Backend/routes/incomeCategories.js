// backend/routes/incomeCategories.js
import { Router } from 'express';
import pool from '../db.js'; // Your db connection

const router = Router();

router.get('/', async (req, res) => {
  try {
    // We assume you have the user's ID from a session or token
    const userId = req.user.id;

    // 1. Select the category details
    // 2. JOIN with the 'income' table to sum up transactions for this category
    // 3. COALESCE ensures we return 0 instead of NULL if there are no transactions
    const query = `
      SELECT 
        ic.inccatid AS id,
        ic.title AS "categoryName", 
        'Income' AS "categoryType",
        ic.icon AS emoji,
        COALESCE(SUM(i.amount), 0) AS total_income
      FROM income_category ic
      LEFT JOIN income i ON ic.inccatid = i.inc_cat
      WHERE ic.user_id = $1
      GROUP BY ic.inccatid
    `;

    const result = await pool.query(query, [userId]);

    // The query aliases (AS "categoryName") match your React component's expectations exactly
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, icon } = req.body;

    const newCategory = await pool.query(
      'INSERT INTO income_category (user_id, title, icon, amount) VALUES ($1, $2, $3, 0) RETURNING *',
      [userId, title, icon]
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
    const { title, icon } = req.body;
    const userId = req.user.id; // Ensure user owns the category

    const updateCategory = await pool.query(
      'UPDATE income_category SET title = $1, icon = $2 WHERE inccatID = $3 AND user_id = $4 RETURNING *',
      [title, icon, id, userId]
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
      'DELETE FROM income_category WHERE inccatID = $1 AND user_id = $2 RETURNING *',
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