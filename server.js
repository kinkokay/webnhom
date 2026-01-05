const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./ooia-backend/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép mọi nguồn truy cập (Dev mode)
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'ooia-frontend')));
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

// 3. Đăng ký tài khoản (API Mới)
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate cơ bản
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập đủ thông tin' });
    }

    try {
        // a. Kiểm tra xem email đã tồn tại chưa
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ success: false, message: 'Email này đã được sử dụng' });
        }

        // b. Insert user mới vào database
        // Lưu ý: Ở đây username từ frontend mình sẽ lưu vào cột full_name
        const sql = 'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)';
        await db.query(sql, [username, email, password]);

        res.status(201).json({ success: true, message: 'Đăng ký thành công' });

    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ success: false, message: 'Lỗi server, vui lòng thử lại sau' });
    }
});


// 4. Đăng nhập (Đơn giản)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = users[0];

        if (password === user.password_hash) { 
             // Trả về thông tin user (trừ password)
            res.json({ 
                success: true,
                user:{
                id: user.id, 
                email: user.email, 
                full_name: user.full_name }
            });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Tạo đơn hàng (Transaction)
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ooia-frontend', 'index.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'ooia-frontend', 'shop.html'));
});

// Chạy server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});