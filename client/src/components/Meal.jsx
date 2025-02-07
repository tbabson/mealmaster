import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Meal";

const Meal = ({ _id, image, name, mealType, country, dietary }) => {
  return (
    <Wrapper>
      <div className="mealCard">
        <Link key={_id} to={`/meals/${_id}`}>
          <figure className="mealCardImage">
            <img src={image} alt={name} />
          </figure>
          <div className="mealInfo">
            <h3 className="mealName">{name}</h3>
            <div className="mc">
              <p className="meal">{mealType}</p>
              <p className="country">{country}</p>
              <p className="dietary">{dietary}</p>
            </div>
            <div className="mealOption">
              <p> Ingredients</p>
              <p> How to prepare</p>
            </div>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};
export default Meal;
