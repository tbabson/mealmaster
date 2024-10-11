export const createMeal = async (req, res) => {

    try {
        const { name, mealType, ingredients, cuisine, preparationSteps } = req.body;


        let imageUrl = null;
        let imagePublicId = null;

        // Check if the image file is present
        if (!req.file) {
            // If no file is provided, return an error response
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please upload a meal image" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'mealmaster', // Cloudinary folder
            use_filename: true,
        });

        // Remove local file after upload
        await fs.unlink(req.file.path);

        // Store the Cloudinary URL and public ID
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;


        // Create the new meal in the database
        const meal = await Meal.create({
            name,
            mealType,
            ingredients,
            cuisine,
            preparationSteps,
            picture: imageUrl,         // URL for the image
            cloudinaryId: imagePublicId, // Save Cloudinary public ID
            createdBy: req.user.userId
        });



        // Respond with the created meal
        res.status(StatusCodes.CREATED).json({ meal });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};