import { Link, Form, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Login = () => {
  const navigate = useNavigate();

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
  const isSubmitting = navigate.state === "Submitting";

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
            <h3>Log In</h3>
            <Form method="post">
              <FormRow type="email" name="email" labelText="Email" />
              <FormRow type="password" name="password" labelText="Password" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-block"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <div className="forgetPassword">
                <p>
                  <Link to="/changePassword" className="member-btn">
                    Forgot Password?
                  </Link>
                </p>
              </div>

              <div className="divider2"></div>

              <div className="member">
                <p>
                  Don't have an account?
                  <br />
                  <Link to="/register" className="member-btn">
                    Sign up
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

export default Login;
