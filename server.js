const express = require('express');
const { sql, pool, poolConnect } = require('./db');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());

// register
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        await poolConnect;

        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (result.recordset.length > 0) {
            return res.status(400).send('Email already registered');
        }

        await pool.request()
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO Users (firstName, lastName, email, password) VALUES (@firstName, @lastName, @email, @password)');

            res.send('Registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await poolConnect;
        
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Users WHERE email = @email AND password = @password');

        if (result.recordset.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = result.recordset[0];
        res.send(`Welcome back, ${user.firstName || 'Users'}!`);
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error');
    }
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'))