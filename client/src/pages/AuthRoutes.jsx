import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthType, // Action to toggle between 'login' and 'signup'
  authenticate, // Action to authenticate existing user
  createUser,
} from "../features/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/authRoutes/Input";

function AuthRoutes() {
  // Get state variables from redux store
  const { authType, isAuthenticated, error } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set up form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }, // Get validation errors
  } = useForm();

  // Handle form submission for login/signup
  const onSubmit = (data) => {
    const { email, password } = data;

    if (authType === "login") {
      dispatch(authenticate({ email, password }));
    } else if (authType === "signup") {
      dispatch(createUser({ email, password }));
    }
  };

  // Redirect to homepage if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center px-2 py-16 sm:py-32  mx-5">
      <div className="">
        {/* Authentication type selection (Login/Signup) */}
        <div className="flex gap-1 justify-center rounded-top">
          <button
            className={`authBtn ${authType === "login" ? "authActive" : ""} `}
            onClick={() => dispatch(setAuthType("login"))}
          >
            Login
          </button>
          <button
            className={`authBtn ${authType === "signup" ? "authActive" : ""}`}
            onClick={() => dispatch(setAuthType("signup"))}
          >
            Signup
          </button>
        </div>

        <div className="bg-secondary p-8">
          <div className="flex justify-center mb-4">
            <FaRegUserCircle className="text-4xl" />
          </div>

          {/* Authentication form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email input field */}
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              }}
              error={errors.email}
            />
            {/* Password input field */}
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              error={errors.password}
            />

            {/* Display error message if authentication fails */}
            {error && <p className="text-red">{error}</p>}

            {/* Submit button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded border-[1px] border-solid border-secondary--shade__1 hover:bg-white slowTransition"
              >
                <span>{authType === "login" ? "Login" : "Register"}</span>
                <FaLongArrowAltRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
