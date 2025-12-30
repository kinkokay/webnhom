const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./ooia-backend/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép mọi nguồn truy cập (Dev mode)
app.use(bodyParser.json());
app.use(express.json());
// --- ROUTES (API) ---

// 1. Lấy danh sách Categories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Lấy danh sách Products
app.get('/api/products', async (req, res) => {
    try {
        // Join để lấy luôn tên category nếu cần
        const sql = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Đăng nhập (Đơn giản)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = users[0];
        // Lưu ý: Thực tế bạn cần dùng bcrypt để so sánh password hash
        if (password === user.password_hash) { 
             // Trả về thông tin user (trừ password)
            res.json({ 
                id: user.id, 
                email: user.email, 
                full_name: user.full_name 
            });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Tạo đơn hàng (Transaction)
app.post('/api/orders', async (req, res) => {
    const { customer_name, customer_phone, shipping_address, cart, total_amount } = req.body;
    
    // Cần dùng connection riêng để quản lý Transaction
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Bước 1: Insert vào bảng orders
        const [orderResult] = await connection.query(
            `INSERT INTO orders (customer_name, customer_phone, shipping_address, total_amount, status) 
             VALUES (?, ?, ?, ?, 'pending')`,
            [customer_name, customer_phone, shipping_address, total_amount]
        );
        
        const orderId = orderResult.insertId;

        // Bước 2: Insert từng món vào order_items
        for (const item of cart) {
            await connection.query(
                `INSERT INTO order_items (order_id, product_id, size, quantity, price_at_purchase) 
                 VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.id, item.size, item.quantity, item.price]
            );
        }

        await connection.commit(); // Xác nhận lưu
        res.status(201).json({ message: 'Order placed successfully', orderId });

    } catch (err) {
        await connection.rollback(); // Hoàn tác nếu lỗi
        console.error(err);
        res.status(500).json({ error: 'Failed to place order' });
    } finally {
        connection.release();
    }
});

// Chạy server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});