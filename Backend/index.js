import express from 'express'
import cors from 'cors'
import pg from 'pg'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express();

const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    options: `-c search_path=${process.env.DB_SCHEMA}`
})
const PORT = 3001;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello from your Express backend!")
});

app.get('/api/users', async (req, res) => {
    try {
        console.log("Request received for /api/users");
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error fetching users");
    }
});

// Registration 
app.post('/api/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (firstname, lastname, email, passwords) VALUES ($1, $2, $3, $4) RETURNING userID',
            [firstname, lastname, email, hashedPassword]
        );
        const userId = newUser.rows[0].userid;

        const incomeCategories = [
            { title: 'Allowance', icon: '💰', amount: 0 },
            { title: 'Salary', icon: '💵', amount: 0 },
            { title: 'Investments', icon: '📈', amount: 0 }
        ];
        for (const cat of incomeCategories) {
            await pool.query(
                'INSERT INTO income_category (user_id, title, icon, amount) VALUES ($1, $2, $3, $4)',
                [userId, cat.title, cat.icon, cat.amount]
            );
        }

        const expenseCategories = [
            { title: 'Food', icon: '🍔', amount: 0 },
            { title: 'Entertainment', icon: '🎬', amount: 0 },
            { title: 'Rent', icon: '🏠', amount: 0 },
            { title: 'Transportation', icon: '🚗', amount: 0 },
            { title: 'Subscriptions', icon: '📅', amount: 0 },
            { title: 'Utilities', icon: '💡', amount: 0 }
        ];
        for (const cat of expenseCategories) {
            await pool.query(
                'INSERT INTO expense_category (user_id, title, icon, amount, has_limit, exp_limit) VALUES ($1, $2, $3, $4, $5, $6)',
                [userId, cat.title, cat.icon, cat.amount, false, 0]
            );
        }

        await pool.query(
            'INSERT INTO budget (user_id, curr_budget, total_budget) VALUES ($1, $2, $3)',
            [userId, 0, 0]
        );

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error during registration");
    }
});

// Login 
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = userResult.rows[0];

        const validPassword = await bcrypt.compare(password, user.passwords);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user: { id: user.userid, firstname: user.firstname, lastname: user.lastname, email: user.email } });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error during login");
    }
});

app.get('/api/income-categories/:userId', async (req, res) => {
    const { userId } = req.params;
    const parsedUserId = Number(userId);

    if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
        return res.status(400).json({ message: 'Invalid user id' });
    }

    const requestingUserId = req.header('x-user-id');
    if (requestingUserId && Number(requestingUserId) !== parsedUserId) {
        return res.status(403).json({ message: 'Not authorized to view these categories' });
    }

    try {
        const { rows } = await pool.query(
            'SELECT id, title, icon, amount FROM income_category WHERE user_id = $1 ORDER BY id',
            [parsedUserId]
        );

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching income categories', err);
        res.status(500).json({ message: 'Server error fetching income categories' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});