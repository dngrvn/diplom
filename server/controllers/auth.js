import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Регистрация пользователя
export const register = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName, phoneNumber, dateOfBirth } = req.body;
        const isUsed = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });

        if (isUsed) {
            return res.json({ message: "Пользователь уже существует" });
        }
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
            email,
            firstName,
            lastName,
            phoneNumber,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        );

    await newUser.save();

    res.json({
        user: newUser,
        token,
        message: "Пользователь был создан.",
    });
    
    } catch (error) {
        res.json({message: "Что-то пошло не так."});
    }
}

// Авторизация пользователя
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token,
            user,
            message: 'Вы вошли в систему.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при авторизации.' })
    }
}

// Получить информацию о пользователе
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'Нет доступа.' })
    }
}