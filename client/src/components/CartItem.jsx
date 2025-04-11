import { formatPrice } from "../utils/formatPrice";
import { generateAmountOptions } from "../utils/GenAmountOptions";
import { useDispatch } from "react-redux";
import {
  removeIngredient,
  updateIngredientQuantity,
  removeMeal,
} from "../Features/Cart/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import Wrapper from "../assets/wrappers/CartItem";

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
      updateIngredientQuantity({
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
    <Wrapper>
      <div className="cartItem">
        <div className="cartItemContainer">
          <div className="mealImage">
            <img src={image} alt={name} />
          </div>
          <div className="ingredients">
            <h3>{name}</h3>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient._id || ingredient.name}>
                  <span>
                    {ingredient.name} - {ingredient.quantity}{" "}
                    {ingredient.unit || "pcs"}
                  </span>
                  <div>
                    <select
                      value={ingredient.quantity}
                      onChange={(e) =>
                        editIngredientHandler(
                          ingredient,
                          Number(e.target.value)
                        )
                      }
                    >
                      {generateAmountOptions(10).map((amount) => (
                        <option key={amount} value={amount}>
                          {amount}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeIngredientHandler(ingredient)}
                      className="removeIngredient"
                      aria-label="Remove ingredient"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p>Price: {formatPrice(calculateMealTotal())}</p>
            <button
              onClick={() => removeMealHandler(meal)}
              className="btn btn-primary"
            >
              <MdDeleteForever />
              Remove meal
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;
