import mongoose from 'mongoose';

const ShoppingListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'List name is required'],
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', // Linking ingredients to the shopping list
    }],
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal', // Link the shopping list to a specific meal
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming user authentication
        required: false,
    },
}, { timestamps: true });

export default mongoose.model('ShoppingList', ShoppingListSchema);
