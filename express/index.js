// const express = require('express');
import express from 'express';
import db from './config/db.js';
const app = express();
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import 'dotenv/config';
import orderRoutes from './routes/OrderRoutes.js';
import AdressRoutes from './routes/AdressRoute.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import adminRoutes from './routes/adminRoutes.js'
import http from "http";
import { Server } from "socket.io";
import colorRoutes from './routes/colorRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';


app.use(express.json());      

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:5174","https://bhatticlothing.store",];

  console.log("Allowed origins:", allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      'https://my-shop-tawny-three.vercel.app/',
      "https://bhatticlothing.store",
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);


  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});
export { io };

app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);

app.use('/api/user', userRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/cartitems', cartRoutes);

app.use('/api/removeFromCart', cartRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api', orderRoutes);


app.use('/api/update/', userRoutes);

app.use('/api/addresses', AdressRoutes);

app.use('/api', colorRoutes);


app.use('/api/products', adminRoutes);

app.use('/api/products', productRoutes);

app.use('/api', adminRoutes);

app.use('/api/orders', adminRoutes);

app.use('/api/users', adminRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use("/api/reviews", reviewRoutes);



// app.get('/api/products', (req, res) => {

// });  before we were using like this , 

//register jwt in this file 
const signToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}


app.post('/api/user/register', async (req, res) => {

  const {
    email,
    firstname,
    lastname,
    username,
    phonenumber,
    password,
    adress,
    postalcode,
  } = req.body;

  // check empty fields
  if (!email || !firstname || !lastname || !username || !password) {
    return res.json({
      status: false,
      message: "All required fields must be filled!"
    });
  }

  try {
    // check if user already exists
    const checkUser = "SELECT * FROM users WHERE email = ?";
    const [result] = await db.query(checkUser, [email]);

    if (result.length > 0) {
      return res.json({
        status: false,
        message: "User already registered!"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const insertSql = `
      INSERT INTO users 
      (email, firstname, lastname, username, phonenumber, password, adress, postalcode, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const [newUser] = await db.query(
      insertSql,
      [email, firstname, lastname, username, phonenumber, hashedPassword, adress, postalcode, "user"]
    );

    const userId = newUser.insertId;


    if (adress) {
      await db.query(
        `INSERT INTO addresses (user_id, full_name, phone, address_line1, city, state, pincode, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        userId,
        `${firstname} ${lastname}`,   // full_name
        phonenumber || '',            // phone
        adress,                       // address_line1
        '',                           // city — not in your form, empty for now
        '',                           // state — not in your form, empty for now
        postalcode || '',             // pincode
        'Pakistan'                    // country default
      ]
      );
    }
    const token = signToken(userId, "user");
    res.status(201).json({
      success: true,
      message: 'user registered successfully',
      token: token
    })

    res.json({
      status: true,
      message: "User registered successfully!"
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.json({
      status: false,
      message: "Registration failed!"
    });
  }

});

app.post('/api/admin/register', async (req, res) => {


  const {
    email,
    firstname,
    lastname,
    username,
    phonenumber,
    password
  } = req.body;


  try {


    const hashedPassword = await bcrypt.hash(password, 10);



    const insertSql = `
INSERT INTO users
(email,firstname,lastname,username,phonenumber,password,role)

VALUES (?,?,?,?,?,?,?)
`;


    const [newAdmin] = await db.query(
      insertSql,
      [
        email,
        firstname,
        lastname,
        username,
        phonenumber,
        hashedPassword,
        "admin"
      ]
    );



    const token = signToken(newAdmin.insertId, "admin");



    res.status(201).json({

      status: true,
      message: "Admin created",
      token

    });


  }
  catch (err) {

    console.log(err);

    res.json({

      status: false,
      message: "Admin registration failed"

    })

  }


});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Example app listening now ${PORT}`)
});
