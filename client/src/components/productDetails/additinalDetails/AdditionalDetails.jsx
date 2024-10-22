import { useState } from "react";
import Description from "./Description";
import AdditionalInfo from "./AdditionalInfo";
import ShippingAndReturns from "./ShippingAndReturns";

import ReviewList from "./Reviews";

function AdditionalDetails({ rating }) {
  // State to keep track of the currently active tab (element)
  const [activeElement, setActiveElement] = useState(0);

  // Array of elements containing the title and corresponding component to display
  const elements = [
    { title: "Description", element: <Description /> },
    { title: "Additional Information", element: <AdditionalInfo /> },
    { title: "Shipping & returns", element: <ShippingAndReturns /> },
    {
      title: `Reviews (${rating.count})`,
      element: <ReviewList rating={rating} />,
    },
  ];

  return (
    <div className="upperMd:py-10">
      <div className="grid grid-cols-2 justify-items-center  xs:flex xs:flex-nowrap xs:justify-around">
        {elements.map((ele, i) => (
          <button
            key={i}
            onClick={() => setActiveElement(i)}
            className={`py-4 px-2 font-semibold text-base ${
              activeElement === i ? "text-primary--shade__1 border-b-2" : ""
            }`}
          >
            {ele.title}
          </button>
        ))}
      </div>
      <div className="borderSecondary p-10">
        {/* Render the currently active element's component */}
        {elements[activeElement].element}
      </div>
    </div>
  );
}

export default AdditionalDetails;
