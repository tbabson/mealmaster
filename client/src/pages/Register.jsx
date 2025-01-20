import { Form, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

//This is to change the meal according to the time of the day
const Register = () => {
  const currentHour = new Date().getHours();
  let mealOfDay;

  if (currentHour >= 5 && currentHour < 12) {
    mealOfDay = "Breakfast?";
  } else if (currentHour >= 12 && currentHour < 17) {
    mealOfDay = "Lunch?";
  } else {
    mealOfDay = "Dinner?";
  }

  //This is to display submitting while submitting.
  const navigation = useNavigation();
  //console.log(navigation);
  const isSubmitting = navigation.state === "Submitting";

  return (
    <Wrapper>
      <section>
        <div className="registerContainer">
          <div className="caption">
            <Link to="/" className="logo">
              <Logo />
            </Link>
            <p>
              Don't know <span>what to cook </span> <br />
              for {mealOfDay}
            </p>
            <p>
              <span>We got you covered.</span>
            </p>
          </div>
          <div className="registerForm form">
            <h3>Sign up</h3>
            <Form method="post">
              <FormRow type="text" name="fullName" labelText="Full Name" />
              <FormRow type="email" name="email" labelText="Email" />
              <FormRow
                type="password"
                name="password"
                labelText="Password"
                defaultValue="secretes"
              />
              <button
                type="submit"
                className="btn btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <div className="divider2"></div>

              <div className="member">
                <p>
                  Already a signed up?
                  <br />
                  <Link to="/login" className="member-btn">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Register;
