import { formatPrice } from "../utils/formatPrice";
import { generateAmountOptions } from "../utils/GenAmountOptions";
import { useDispatch } from "react-redux";
import {
  removeIngredient,
  editItem,
  removeMeal,
} from "../Features/Cart/cartSlice";

const CartItem = ({ meal }) => {
  const dispatch = useDispatch();

  if (!meal) return null; // ✅ Ensure meal exists before rendering

  const removeIngredientHandler = (ingredient) => {
    if (!ingredient || !meal) return;
    dispatch(
      removeIngredient({ mealID: meal.mealID, ingredientName: ingredient.name })
    );
  };

  const editIngredientHandler = (ingredient, newQuantity) => {
    if (!ingredient || !meal) return;
    dispatch(
      editItem({
        mealID: meal.mealID,
        ingredientName: ingredient.name,
        newQuantity,
      })
    );
  };

  const removeMealHandler = (meal) => {
    if (!meal) return;
    dispatch(removeMeal({ mealID: meal.mealID }));
  };

  const calculateMealTotal = () => {
    return meal.ingredients.reduce(
      (total, ingredient) => total + ingredient.price * ingredient.quantity,
      0
    );
  };

  const { mealID, name, ingredients, image } = meal;

  return (
    <div className="cart-item" key={mealID}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: {formatPrice(calculateMealTotal())}</p>

      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.name} -
            <select
              value={ingredient.quantity}
              onChange={(e) =>
                editIngredientHandler(ingredient, Number(e.target.value))
              }
            >
              {generateAmountOptions(10).map((amount) => (
                <option key={amount} value={amount}>
                  {amount}
                </option>
              ))}
            </select>
            <button onClick={() => removeIngredientHandler(ingredient)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => removeMealHandler(meal)}>Remove meal</button>
    </div>
  );
};

export default CartItem;
