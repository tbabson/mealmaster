// import mongoose from "mongoose";

// const CartSchema = new mongoose.Schema(
//     {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//         cartItems: [
//             {
//                 mealID: { type: String, required: true },
//                 name: { type: String, required: true },
//                 image: { type: String },
//                 ingredients: [
//                     {
//                         name: { type: String, required: true },
//                         price: { type: Number, required: true },
//                         quantity: { type: Number, required: true, default: 1 },
//                         unit: { type: String, required: true },
//                     },
//                 ],
//             },
//         ],
//         cartTotal: { type: Number, default: 0 },
//         shipping: { type: Number, default: 300 },
//         tax: { type: Number, default: 0 },
//         orderTotal: { type: Number, default: 0 },
//     },
//     { timestamps: true }
// );

// export default mongoose.model("Cart", CartSchema);


// CartModel.js
// import mongoose from 'mongoose';

// const IngredientSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     unit: {
//         type: String,
//         default: 'g'
//     }
// });

// const MealSchema = new mongoose.Schema({
//     mealID: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         default: ''
//     },
//     ingredients: [IngredientSchema]
// });

// const CartSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     cartItems: [MealSchema],
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Update the updatedAt timestamp before saving
// CartSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// export default mongoose.model('Cart', CartSchema);


import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, default: 'g' }
});

const MealSchema = new mongoose.Schema({
    mealID: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true }, // If referencing Meal model
    name: { type: String, required: true },
    image: { type: String, default: '' },
    ingredients: [IngredientSchema]
});

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // Ensures one cart per user
        cartItems: [MealSchema],
        // cartTotal: { type: Number, default: 0 },
        // shipping: { type: Number, default: 300 },
        // tax: { type: Number, default: 0 },
        // orderTotal: { type: Number, default: 0 }
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

export default mongoose.model('Cart', CartSchema);
