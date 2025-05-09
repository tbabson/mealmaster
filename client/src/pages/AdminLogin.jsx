import {
  Link,
  Form,
  useNavigation,
  useActionData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const AdminLogin = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const actionResult = useActionData();
  const { user } = useSelector((state) => state.user);

  // This is to display submitting while submitting.
  const isSubmitting = navigation.state === "submitting";

  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from || "/admin/dashboard";

  // Handle redirections based on user state
  useEffect(() => {
    // If user is already logged in as admin, redirect to dashboard
    if (user && user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user]);

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
              {actionResult?.msg && (
                <p className="form-error">{actionResult.msg}</p>
              )}
              <FormRow type="email" name="email" labelText="Admin Email" />
              <FormRow type="password" name="password" labelText="Password" />
              {/* Add the role as a hidden input */}
              <input type="hidden" name="role" value="admin" />
              {/* Add return path for redirection after login */}
              <input type="hidden" name="returnPath" value={from} />
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
