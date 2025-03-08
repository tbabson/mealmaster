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


import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        cartItems: [
            {
                mealID: { type: String, required: true },
                name: { type: String, required: true },
                image: { type: String },
                ingredients: [
                    {
                        name: { type: String, required: true },
                        price: { type: Number, required: true },
                        quantity: { type: Number, required: true, default: 1 },
                        unit: { type: String, required: true },
                    },
                ],
            },
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);