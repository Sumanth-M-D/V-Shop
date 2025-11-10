import { useCallback } from "react";
import {
  FiSettings,
  FiShoppingBag,
  FiMapPin,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/redux";
import { logout } from "../features/authenticationSlice";
import { toast } from "react-toastify";

const menuItems = [
  {
    label: "Profile & Settings",
    description: "Manage personal information, password, and communication preferences.",
    icon: <FiSettings />,
    action: () => toast.info("Profile settings coming soon!"),
  },
  {
    label: "Orders",
    description: "Track orders, view receipts, and download invoices.",
    icon: <FiShoppingBag />,
    action: () => toast.info("Orders dashboard coming soon!"),
  },
  {
    label: "Addresses",
    description: "Add or edit delivery and billing addresses for faster checkout.",
    icon: <FiMapPin />,
    action: () => toast.info("Address book coming soon!"),
  },
];

function User() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("You have been logged out");
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-12 animate-pageFade">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex w-fit items-center gap-2 rounded-full border border-secondary--shade__0 px-4 py-2 text-sm font-semibold text-secondary transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <FiArrowLeft />
        Back
      </button>

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-secondary">My Account</h1>
        <p className="max-w-2xl text-sm text-secondary--shade__3">
          Welcome to your personal dashboard. Manage account information, track orders, and control your shopping experience from one place.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.action}
            className="flex h-full flex-col gap-4 rounded-3xl border border-secondary--shade__0 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl">
              {item.icon}
            </span>
            <div className="space-y-1">
              <p className="text-base font-semibold text-secondary">{item.label}</p>
              <p className="text-sm text-secondary--shade__3">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-red-600">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
              <FiLogOut />
            </span>
            <div>
              <p className="text-base font-semibold">Sign out of V-Shop</p>
              <p className="text-sm text-red-500">
                Secure your account by logging out when you’re done shopping.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-red-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}

export default User;

