import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name of the meal"],
    },
    mealType: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
        required: [true, "Please provide the meal type"],
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', // Reference to Ingredient schema
        required: [true, 'Please provide ingredients for the meal'],
    }],
    cuisine: {
        type: String,
        enum: ["Nigeria", "America", "French", "Uk"],
        required: [true, "Please specify the cuisine type"],
    },
    preparationSteps: {
        type: [String],
        required: [true, "Please provide preparation steps for the meal"],
    },
    picture: {
        type: String, // URL for the image stored in Cloudinary
        required: [true, "Please upload a meal image"],
    },
    cloudinaryId: {
        type: String, // To store Cloudinary public ID for deletion, if needed
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
},
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


export default mongoose.model("Meal", MealSchema);
