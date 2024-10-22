import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { TfiReload } from "react-icons/tfi";
import { GoInfo } from "react-icons/go";
import { SlSupport } from "react-icons/sl";

// Array of services provided by the application, each with an ID, icon, title, and content
const services = [
  {
    id: 1,
    icon: <HiOutlineRocketLaunch />,
    title: "Free Shipping",
    content: "Orders $50 or more",
  },
  {
    id: 2,
    icon: <TfiReload />,
    title: "Free Returns",
    content: "Within 30 days",
  },
  {
    id: 3,
    icon: <GoInfo />,
    title: "Get 20% off on 1 item",
    content: "When you sign up",
  },
  {
    id: 4,
    icon: <SlSupport />,
    title: "We Support",
    content: "24/7 amazing service",
  },
];

function WhatWeProvide() {
  return (
    <div className="grid grid-cols-2  sm:grid-cols-4  justify-center sm:justify-items-center gap-10 lg:gap-20 py-14 px-4 xs:px-20 sm:px-4  border-b-[1px] border-secondary--shade__0 bg-secondary">
      {/* Map over the services array to render each Service component */}
      {services.map((service) => (
        <Service service={service} key={service.id} />
      ))}
    </div>
  );
}

export default WhatWeProvide;

// Individual service component
function Service({ service }) {
  const { icon, title, content } = service;
  return (
    <div className="flex items-center gap-2 md:gap-3 text-black">
      <div className="text-2xl font-bold">{icon}</div>
      <div>
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-xs text-secondary--shade__2">{content}</p>
      </div>
    </div>
  );
}
