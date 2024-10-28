import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, "Пожалуйста, введите корректный email"] }, // Валидация почты
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, unique: true, match: [/^\+?[1-9]\d{1,14}$/, "Пожалуйста, введите корректный номер телефона"] }, // Международный формат
        dateOfBirth: { type: Date },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);