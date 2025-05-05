import {
  Link,
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const AdminLogin = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const errors = useActionData();

  // This is to display submitting while submitting.
  const isSubmitting = navigation.state === "submitting";

  // Handle successful login via an action response
  useEffect(() => {
    // This should be triggered after your login action completes successfully
    if (navigation.state === "idle" && navigation.formData && !isSubmitting) {
      // Short timeout to ensure the login action has completed
      const timer = setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [navigation.state, navigate, isSubmitting, navigation.formData]);

  return (
    <Wrapper>
      <section>
        <div className="registerContainer">
          <div className="caption">
            <Link to="/" className="logo">
              <Logo />
            </Link>
            <p>
              <span>Admin Portal</span>
            </p>
            <p>
              <span>Manage your recipes and users</span>
            </p>
          </div>
          <div className="registerForm form">
            <h3>Admin Login</h3>
            <Form method="post">
              {errors?.msg && <p className="form-error">{errors.msg}</p>}

              <FormRow type="email" name="email" labelText="Admin Email" />
              <FormRow type="password" name="password" labelText="Password" />

              {/* Add the role as a hidden input */}
              <input type="hidden" name="role" value="admin" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-block"
              >
                {isSubmitting ? "Logging in..." : "Admin Login"}
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
                  <Link to="/login" className="member-btn">
                    User Login
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

export default AdminLogin;
