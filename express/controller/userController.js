import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signToken = (id, role) => {

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);
    
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export const userLogin = async (req, res) => {
    console.log("req.body:", req.body); // check if password is here

    const { email, password } = req.body;
  console.log("email:", email, "password:", password); // check destructuring

    const sql = "SELECT * FROM users WHERE email = ?";


    try {

        const [result] = await db.query(sql, [email]);


        if (result.length === 0) {

            return res.json({
                status: false,
                message: "user is not registered!"
            });

        }


        const user = result[0];

        // only check admin for admin route

        if (req.originalUrl.includes("/admin/login")) {
            if (user.role !== "admin") {

                return res.json({

                    status: false,

                    message: "Not admin"

                })

            }
        }
        console.log(req.body);
        console.log(user);
        const match = await bcrypt.compare(
            password,
            user.password
        );


        if (!match) {

            return res.json({
                status: false,
                message: "Wrong password"
            });

        }


        const token = signToken(user.id, user.role);


        return res.json({

            status: true,

            message: "login success!",

            token: token,

            user: {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                phonenumber: user.phonenumber,
                email: user.email,
                role: user.role

            }

        });


    } catch (err) {

        console.log("userLogin error:", err.message);

        return res.status(500).json({
            status: false,
            message: "unable to login user!"
        });

    }

}
// update user address and location

export const updateAddress = async (req, res) => {
    const {
        user_id,
        adress,
        postalcode,
        latitude,
        longitude
    } = req.body;

    try {
        await db.query(
            `UPDATE users 
             SET adress = ?, postalcode = ?, latitude = ?, longitude = ? 
             WHERE id = ?`,
            [
                adress,
                postalcode,
                latitude,
                longitude,
                user_id
            ]
        );

        return res.json({
            success: true,
            message: "Address updated"
        });

    } catch (err) {
        console.error("updateAddress error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update address",
            error: err.message
        });
    }
}