const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postSignup = async(req, res) => {
    try {
        const { username, mail, password } = req.body;

        // check if user exists
        const userExits = await User.exists({ mail: mail.toLowerCase() });

        if (userExits) {
            return res.status(409).send("E-mail already in use.");
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user document and save in database
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword,
        });

        // create JWT token
        const token = jwt.sign({
                userId: user._id,
                mail,
            },
            process.env.TOKEN_KEY, {
                expiresIn: "24h",
            }
        );

        res.status(201).json({
            userDetails: { mail: user.mail, token: token, user: user.name },
        });
    } catch (err) {
        return res.status(500).send("Error occurred. Please try again");
    }
};
module.exports = postSignup;