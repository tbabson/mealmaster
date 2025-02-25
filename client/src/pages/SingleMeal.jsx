import { useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import Wrapper from "../assets/wrappers/SingleMeal";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addItem } from "../Features/Cart/cartSlice";
import { Loading } from "../components";

const SingleMeal = () => {
  const { meal } = useLoaderData();

  if (!meal) {
    return <Loading />;
  }

  const {
    _id,
    image,
    name,
    mealType,
    country,
    dietary,
    ingredients = [],
    preparationSteps = [],
    price,
    reviews = [],
    numOfReviews,
    averageRating,
  } = meal.meal;

  const nairaAmount = formatPrice(price);
  const dispatch = useDispatch();

  const cartMeal = {
    _id,
    name,
    image,
    country,
    mealType,
    ingredients,
  };

  const addToCart = () => {
    dispatch(addItem({ meal: cartMeal }));
  };

  const renderStars = (rating) => (
    <>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? (
          <IoMdStar key={index} />
        ) : (
          <IoMdStarOutline key={index} />
        )
      )}
    </>
  );

  return (
    <Wrapper>
      <section>
        <div key={_id} className="singleMeal">
          <div className="mealInfoContainer">
            <div className="mealImage">
              <img src={image} alt={name} />
            </div>
            <div className="mealDetail">
              <h1>{name}</h1>
              <div className="mealAndCountry">
                <p>{mealType}</p>
                <p>{country}</p>
                <p>{dietary}</p>
              </div>
              <div className="averageRating">
                <div className="spanRating">
                  <p>Average Rating: {renderStars(averageRating)}</p>
                  <span>
                    <p>{numOfReviews} reviews</p>
                  </span>
                </div>
              </div>

              <hr className="hr1" />

              <div className="ingredients">
                <h3>Ingredients:</h3>
                {ingredients.length > 0 ? (
                  <ol>
                    {ingredients.map(
                      ({
                        _id,
                        name,
                        quantity,
                        unit,
                        price,
                        substitutions = [],
                      }) => (
                        <li key={_id}>
                          <strong>{name}</strong> - {quantity} {unit} (₦
                          {price ?? "N/A"})
                          {substitutions.length > 0 && (
                            <span>
                              {" "}
                              | Substitute:{" "}
                              {substitutions.map(({ name }) => name).join(", ")}
                            </span>
                          )}
                        </li>
                      )
                    )}
                  </ol>
                ) : (
                  <p>No ingredients listed.</p>
                )}
              </div>

              <hr className="hr1" />

              <div className="howTo">
                <h3>How to Prepare:</h3>
                {preparationSteps.length > 0 ? (
                  preparationSteps.map(
                    ({ _id, description, skillLevel, steps = [] }) => (
                      <div key={_id} className="preparation-guide">
                        <p>
                          <strong>Description:</strong> {description}
                        </p>
                        <p>
                          <strong>Skill Level:</strong> {skillLevel}
                        </p>
                        {steps.length > 0 ? (
                          <ol>
                            {steps.map(({ stepNumber, instruction, _id }) => (
                              <li key={_id}>
                                <strong>Step {stepNumber}:</strong>{" "}
                                {instruction}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p>No specific steps provided.</p>
                        )}
                      </div>
                    )
                  )
                ) : (
                  <p>No preparation steps available.</p>
                )}
              </div>

              <hr className="hr1" />
              <div className="amount">{nairaAmount}</div>

              <div className="reviews">
                <h3>Buyers Reviews ({numOfReviews}):</h3>
                {reviews.length > 0 ? (
                  reviews.map(({ _id, user, title, comment, rating }) => (
                    <div key={_id}>
                      <h4>{user.fullName}</h4>
                      <h5>Rating: {renderStars(rating)}</h5>
                      <p>
                        <strong>{title}</strong>
                      </p>
                      <p>{comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>

              <div className="buttons">
                <button onClick={addToCart} className="btn btn-primary">
                  Add to Cart
                </button>
                <button className="btn btn-secondary">Create Reminder</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default SingleMeal;
