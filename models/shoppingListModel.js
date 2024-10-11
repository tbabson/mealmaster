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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming user authentication
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('ShoppingList', ShoppingListSchema);
