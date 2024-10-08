import mongoose from 'mongoose';

// Substitution Schema to represent ingredient alternatives
const SubstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Substitution name is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    unit: {
        type: String, // E.g., grams, liters
        required: [true, 'Unit is required'],
    },
});

// Ingredient Schema
const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingredient name is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    unit: {
        type: String, // E.g., grams, liters
        required: [true, 'Unit is required'],
    },
    substitutions: {
        type: [SubstitutionSchema], // List of possible substitutions
    },
    price: {
        type: Number,
        required: [true, 'Quantity is required']
    }
}, { timestamps: true });

export default mongoose.model('Ingredient', IngredientSchema);
