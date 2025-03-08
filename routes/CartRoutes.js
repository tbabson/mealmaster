// import { Router } from 'express';
// const router = Router();

// import {
//     getCart,
//     addToCart,
//     removeMeal,
//     clearCart,
// } from '../controllers/CartController.js';

// import {
//     authenticateUser,
//     authorizePermissions,
// } from '../middleware/authMiddleware.js';

// // Routes 

// router.get('/:userId', getCart);
// router.post("/add", addToCart);
// router.delete("/:userId/remove/:mealID", removeMeal);
// router.delete("/:userId/clear", clearCart);

// export default router;



import { Router } from 'express';
const router = Router();
import {
    getCart,
    syncCart,
    addToCart,
    removeMeal,
    removeIngredient,
    updateIngredientQuantity,
    clearCart,
} from '../controllers/CartController.js';
import {
    authenticateUser,
    authorizePermissions,
} from '../middleware/authMiddleware.js';

// Cart Routes
router.get('/:userId', getCart);
router.post("/sync", syncCart);  // New endpoint for syncing the entire cart
router.post("/add", addToCart);  // Kept for backward compatibility
router.delete("/:userId/remove/:mealID", removeMeal);
router.delete("/:userId/remove/:mealID/:ingredientName", removeIngredient);  // New endpoint
router.patch("/:userId/update/:mealID", updateIngredientQuantity);  // New endpoint
router.delete("/:userId/clear", clearCart);

export default router;
