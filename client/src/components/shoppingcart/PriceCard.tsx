import { updateShipping } from "../../features/shoppingCartSlice";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CartItem } from "../../types/cart.types";

function PriceCard() {
  // Access the cartProducts and shipping state from the Redux store
  const { cartProducts, shipping } = useAppSelector(
    (state) => state.shoppingCart
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Calculate the subtotal by summing up the price of all products in the cart
  const subtotal =
    Math.ceil(
      cartProducts.reduce(
        (acc: number, ele: CartItem) => acc + (ele.price ?? 0) * ele.quantity,
        0
      ) * 100
    ) / 100;

  // Shipping options available for the user to select
  const shippingOptions = [
    { name: "free", value: 0, label: "Free Shipping" },
    { name: "standard", value: 10, label: "Standard" },
    { name: "express", value: 20, label: "Express" },
  ];

  // Function to handle changes in the selected shipping option
  function handleChangeShipping(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateShipping(Number(e.target.value)));
  }

  // Function to navigate back to the homepage when the user continues shopping
  function continueShopping() {
    navigate("/");
  }

  {
    /* Price card container with subtotal, shipping, and total information */
  }
  return (
    <div className="w-72 mx-auto my-10 md:my-0">
      <div className="bg-secondary p-5 w-64 upperMd:w-72 flex flex-col gap-5 text-sm text-black">
        <h3 className="text-base border-b-[1px] pb-3 mb-3 font-medium">
          Cart Total
        </h3>
        <div className="flex justify-between font-medium border-b-[1px] border-secondary--shade__0 pb-3">
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>
        <div className="flex flex-col gap-3 mb-3 pb-3 border-b-[1px] border-secondary--shade__0">
          <div className="mb-2">
            <p className="font-medium mb-2">Shipping</p>

            {/* Loop through shipping options to render radio buttons */}
            <div className="flex flex-col gap-2 pl-2">
              {shippingOptions.map((option) => (
                <div key={option.name} className="flex justify-between ">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.value}
                      checked={shipping === option.value}
                      onChange={handleChangeShipping}
                      id={option.name}
                    />
                    <label
                      htmlFor={option.name}
                      className="flex justify-between"
                    >
                      {option.label}
                    </label>
                  </div>
                  <span className="justify-self-end">${option.value}.00</span>
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder for address change */}
          <div>
            <p className="font-medium mb-1"> Estimate for your country</p>
            <p className="text-secondary--shade__1 border-b-[1px] inline">
              change address
            </p>
          </div>
        </div>

        {/* Display the total amount including shipping */}
        <div className="flex justify-between text-primary--shade__1 font-semibold text-base">
          <p>Total</p>
          <p>${subtotal + shipping}</p>
        </div>

        <div>
          <button className="cta">PROCEED TO CHECKOUT</button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        <button
          className="py-2 w-full border-[1px] border-secondary--shade__0  hover:shadow-md"
          onClick={continueShopping}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
}

export default PriceCard;
