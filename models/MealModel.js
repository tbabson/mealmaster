import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the meal'],
    },
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      required: [true, 'Please provide the meal type'],
    },
    cuisine: {
      type: String,
      enum: ['Nigeria', 'America', 'French', 'Uk'],
      required: [true, 'Please specify the cuisine type'],
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient', // Reference to Ingredient schema
        required: [false, 'Please provide ingredients for the meal'],
      },
    ],
    preparationSteps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreparationSteps', // Reference to Ingredient schema
        required: [false, 'Please provide preparation Step for the meal'],
      },
    ],
    picture: {
      type: String, // URL for the image stored in Cloudinary
      required: [false, 'Please upload a meal image'],
    },
    cloudinaryId: {
      type: String, // To store Cloudinary public ID for deletion, if needed
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// MealSchema.virtual('ingredients', {
//   ref: 'Ingredient',
//   localField: '_id',
//   foreignField: 'meal',
//   justOne: false,
//   // match: { rating: 5 },
// });

export default mongoose.model('Meal', MealSchema);
