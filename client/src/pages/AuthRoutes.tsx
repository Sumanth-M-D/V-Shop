import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  FiShield,
  FiUsers,
  FiSmile,
  FiMail,
  FiLock,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  setAuthType,
  login,
  createUser,
} from "../features/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Input from "../components/authRoutes/Input";

interface AuthFormInputs {
  email: string;
  password: string;
}

function AuthRoutes() {
  const { authType, isAuthenticated, error, status } = useAppSelector(
    (state) => state.authentication
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    mode: "onChange",
  });

  const successCopy = useMemo(
    () =>
      authType === "login" ? "Welcome back" : "Create your V-Shop account",
    [authType]
  );

  const introCopy = useMemo(
    () =>
      authType === "login"
        ? "Sign in to continue exploring the latest collections."
        : "We just need a few details to set up your account.",
    [authType]
  );

  const quickLoginHandler = () => {
    setValue("email", "test@gmail.com");
    setValue("password", "Test12345@");
    // Auto-submit the form after setting values
    dispatch(login({ email: "test@gmail.com", password: "Test12345@" }));
  };

  const onSubmit = (data: AuthFormInputs) => {
    const { email, password } = data;
    if (authType === "login") {
      dispatch(login({ email, password }));
    } else if (authType === "signup") {
      dispatch(createUser({ email, password }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success(
        authType === "login"
          ? "Logged in successfully!"
          : "Account created! Welcome aboard."
      );
    }
  }, [authType, isAuthenticated, navigate]);

  useEffect(() => {
    if (status === "success") {
      reset({
        email: "",
        password: "",
      });
    }
  }, [status, reset]);

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, [authType, reset]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-secondary--shade__0/40 py-10">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 rounded-full border border-secondary--shade__0 bg-white/80 px-4 py-2 text-sm font-semibold text-secondary transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <FiArrowLeft />
        Back to home
      </button>

      <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[40px] bg-white shadow-xl ring-1 ring-secondary--shade__0/60 backdrop-blur animate-fade-in-up">
        <div className="flex flex-col md:flex-row">
          <aside className="flex flex-1 flex-col justify-between gap-8 bg-gradient-to-br from-primary via-primary--shade__1 to-secondary--shade__1 px-8 py-12 text-white md:min-h-full md:px-12">
            <div className="flex items-center gap-3 text-white/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
                <FaRegUserCircle className="text-xl" />
              </span>
              <p className="text-sm font-medium tracking-wide uppercase">
                V-Shop Members
              </p>
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                {authType === "login"
                  ? "Welcome back to V-Shop."
                  : "Let’s get you set up in minutes."}
              </h1>
              <p className="max-w-sm text-sm text-white/80">
                Join thousands of shoppers who trust V-Shop for a seamless
                experience tailored to their taste, from curated recommendations
                to lightning-fast checkout.
              </p>
            </div>

            <ul className="space-y-5 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg text-white">
                  <FiShield />
                </span>
                Securely manage orders and wishlists wherever you are.
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg text-white">
                  <FiUsers />
                </span>
                Unlock member-only drops and early access to sales.
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg text-white">
                  <FiSmile />
                </span>
                Save time with personal preferences and fast checkout.
              </li>
            </ul>

            <div className="hidden flex-col gap-2 text-sm text-white/80 md:flex">
              <p>Need help?</p>
              <a
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
                href="mailto:support@vshop.dev"
              >
                Contact support <FaLongArrowAltRight />
              </a>
            </div>
          </aside>

          <section className="flex flex-1 flex-col justify-center px-6 py-10 md:px-12 md:py-16">
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="flex items-center justify-between rounded-full bg-secondary--shade__0 p-1 text-sm font-medium text-secondary">
                <button
                  className={`flex-1 rounded-full px-5 py-2 transition ${
                    authType === "login"
                      ? "bg-white text-primary shadow"
                      : "text-secondary--shade__3"
                  }`}
                  onClick={() => dispatch(setAuthType("login"))}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={`flex-1 rounded-full px-5 py-2 transition ${
                    authType === "signup"
                      ? "bg-white text-primary shadow"
                      : "text-secondary--shade__3"
                  }`}
                  onClick={() => dispatch(setAuthType("signup"))}
                  type="button"
                >
                  Signup
                </button>
              </div>

              <div className="rounded-3xl border border-secondary--shade__0 bg-white/90 p-8 shadow-lg backdrop-blur">
                <div className="space-y-3 text-center">
                  <h2 className="text-xl font-semibold text-secondary">
                    {successCopy}
                  </h2>
                  <p className="text-sm text-secondary--shade__3">
                    {introCopy}
                  </p>
                </div>

                <form
                  className="mt-6 flex flex-col gap-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    validation={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    }}
                    error={errors.email}
                    icon={<FiMail />}
                    helperText="We’ll never share your email with anyone else."
                  />

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
                    icon={<FiLock />}
                    helperText="Must be at least 6 characters long."
                  />

                  {error && (
                    <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-600 animate-fade-in-up">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-secondary--shade__3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-secondary--shade__1 text-primary focus:ring-primary"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-primary transition hover:text-primary--shade__1"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {authType === "login" && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={quickLoginHandler}
                        disabled={status === "loading"}
                        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary/30 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span>Quick Login with Demo Account</span>
                      </button>
                      <p className="mt-2 text-center text-xs text-secondary--shade__3">
                        Use demo credentials to explore protected pages
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-4">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary--shade__1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-secondary--shade__1"
                      disabled={status === "loading"}
                    >
                      <span>
                        {status === "loading"
                          ? "Please wait..."
                          : authType === "login"
                            ? "Login"
                            : "Register"}
                      </span>
                      <FaLongArrowAltRight />
                    </button>
                    {status === "loading" && (
                      <p className="text-center text-xs text-secondary--shade__3">
                        Processing your request...
                      </p>
                    )}
                    <p className="text-center text-xs text-secondary--shade__3">
                      By continuing, you agree to our{" "}
                      <a className="text-primary hover:underline" href="#">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a className="text-primary hover:underline" href="#">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>

              <div className="text-center text-sm text-secondary--shade__3">
                {authType === "login" ? (
                  <p>
                    New to V-Shop?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => dispatch(setAuthType("signup"))}
                    >
                      Create an account
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => dispatch(setAuthType("login"))}
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
              <div className="rounded-3xl border border-secondary--shade__0 bg-secondary--shade__0/40 p-4 text-xs text-secondary--shade__3 md:hidden">
                <p className="font-semibold text-secondary">
                  Need help getting started?
                </p>
                <p className="mt-1">
                  Reach us anytime at{" "}
                  <a
                    className="text-primary font-medium"
                    href="mailto:support@vshop.dev"
                  >
                    support@vshop.dev
                  </a>{" "}
                  and we’ll guide you through the process.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
