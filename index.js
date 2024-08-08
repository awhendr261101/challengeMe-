import express, { Router } from 'express';
import path from 'path';

import bodyParser from 'body-parser';


import { dbconnection } from './config/index.js';
import { log } from 'console';




const app = express();
const db = dbconnection
const router = express.Router();
const port = process.env.PORT || 5000

// middleware 
app.use(router, express.static('./static'), express.urlencoded({extended: true}) )

// endpoints
app.get('/', (req, res) =>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

app.get('/Users', (req, res) =>{

    try {
        db.query('SELECT * FROM Users', (err, body) =>{
            if(err) throw new Error(err)
            res.status(200).json(body)
        })
    } catch (err) {
        res.json(
            {
                message : err.message
            }
        )
    }
})

// to register a new user
app.get('/Register', (req, res) =>{
    res.status(200).sendFile(path.resolve('./static/html/register.html'))
})


app.post('/register', bodyParser.json(),(req, res) => {
    const { firstname, lastname, age, email, password } = req.body;

    const ageInt = parseInt(age, 10);

    try {
        db.query(`
        INSERT INTO Users (userName, userSurname, userAge, userEmail, userPwd)
        VALUES ('${firstname}', '${lastname}',${ageInt} , '${email}', '${password}')
        `, (err, body) => {
            if (err) throw new Error(err)
            console.log('User registered:', req.body);
        });
        console.log('User registered:', req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/User/:id',(req, res) => {
    const { id } = req.params;
    try {
        res.status(200).sendFile(path.resolve('./static/html/Update.html'))
    } catch (err) {
        res.json(
            {
                statusCode: 404,
                message: err.message
            }
        )
    }
});

app.patch('/User/:id', bodyParser.json(), (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, email, password } = req.body;

    const ageInt = parseInt(age);
    const intID = parseInt(id);

    try {

        db.query(`
        UPDATE Users
        SET userName ='${firstname}', userSurname='${lastname}', userAge=2, userEmail='${email}', userPwd='${password}'
        WHERE userID= ${intID}
        `, (err, body) => {
            if (err) throw new Error(err.message)
            console.log('User registered:', req.body);
        });
        console.log('User updated:', req.body);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('ooops Something went wrong:', err.message);
        res.status(500).json({ message: err.message });
    }
})

app.delete('/User/:id', (req, res) => {
    const { id } = req.params;

    const intID = parseInt(id);
    try {

        db.query(`DELETE FROM Users WHERE userID= ${intID}`
        );
        console.log('User deleted:', id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('ooops Something went wrong:', err.message);
        res.status(500).json({ message: err.message });
    }
})

// products endpoints
app.get('/products', (req, res) => {
    try {
        db.query('SELECT * FROM Products', (err, body) =>{
            if(err) throw new Error(err)
            res.status(200).json(body)
        })
    } catch (err) {
        res.json(
            {
                message : err.message
            }
        )
    }
})


app.post('/addProduct', bodyParser.json(),(req, res) => {

    const { name, quantity, price, url, user } = req.body;
    const priceInt = parseFloat(price);
//     prodName VARCHAR(15),
// prodQuantity INT,
// prodPrice DECIMAL(9,2),
// prodURL TEXT,
// userID INT,

    try {
        db.query(`
        INSERT INTO Products (prodName, prodQuantity, prodPrice, prodURL,userID)
        VALUES ('${name}', ${quantity} ,${price}, '${url}', ${user})
        `, (err, body) => {
            if (err) throw new Error(err)
            console.log('Product registered:', req.body);
        });
        console.log('Product registered:', req.body);
        res.status(201).json({ message: 'Product registered successfully' });
    } catch (err) {
        console.error('Error registering product:', err.message);
        res.status(500).json({ message: err.message });
    }
})

app.get('/Product/:id',(req, res) => {
    const { id } = req.params;
    try {
        db.query(`SELECT * FROM Products WHERE prodID = ${id}`, (err, body) =>{
            if(err) throw new Error(err)
            res.status(200).json(body)
        })
    } catch (err) {
        res.json(
            {
                message : err.message
            }
        )
    }
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)

})