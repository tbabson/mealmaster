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
router.get('/:userId', authenticateUser, getCart);
router.post("/sync", authenticateUser, syncCart);  // New endpoint for syncing the entire cart
router.post("/add", authenticateUser, addToCart);  // Kept for backward compatibility
router.delete("/:userId/remove/:mealID", authenticateUser, removeMeal);
router.delete("/:userId/remove/:mealID/:ingredientName", authenticateUser, removeIngredient);  // New endpoint
router.patch("/:userId/update/:mealID", authenticateUser, updateIngredientQuantity);  // New endpoint
router.delete("/:userId/clear", authenticateUser, clearCart);

export default router;
