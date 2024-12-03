import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

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
              <FormRow
                type="email"
                name="email"
                labelText="Email"
                defaultValue="tbabson20@gmail.com"
              />
              <FormRow
                type="password"
                name="password"
                labelText="Password"
                defaultValue="secret123"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-block"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <div className="forgetPassword">
                <p>
                  <br />
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
