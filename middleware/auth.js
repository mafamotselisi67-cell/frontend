// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('./config/database');
// const router = express.Router();

// // 🔒 JWT secret
// const SECRET = process.env.JWT_SECRET || 'mysecret';

// // ✅ REGISTER
// router.post('/register', async (req, res) => {
//   const { firstName, lastName, email, password, role, department } = req.body;
//   try {
//     const [existing] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
//     if (existing.length > 0) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Normalize role name
//     let cleanRole = role.trim().toLowerCase();
//     const roleMap = {
//       prl: 'principal_lecturer',
//       pl: 'program_leader',
//       lecturer: 'lecturer',
//       student: 'student'
//     };
//     cleanRole = roleMap[cleanRole] || cleanRole;

//     await db.promise().query(
//       'INSERT INTO users (first_name, last_name, email, password, role, department) VALUES (?, ?, ?, ?, ?, ?)',
//       [firstName, lastName, email, hashedPassword, cleanRole, department]
//     );

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ LOGIN
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

//     // Normalize role
//     const role = (user.role || '').toLowerCase().trim();

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role },
//       SECRET,
//       { expiresIn: '8h' }
//     );

//     res.json({
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         firstName: user.first_name,
//         lastName: user.last_name,
//         email: user.email,
//         role
//       },
//       token
//     });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
