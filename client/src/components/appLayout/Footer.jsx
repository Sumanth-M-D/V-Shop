import Logo from "../general/Logo";
import { IoCallOutline } from "react-icons/io5";
import SocialMedia from "../general/SocialMedia";
import { NavLink } from "react-router-dom";

function Footer() {
  // Array of useful links for site navigation
  const usefulLinks = [
    { name: "About", link: "#" },
    { name: "Our services", link: "#" },
    { name: "How to shop on 'V-Shop'", link: "#" },
    { name: "FAQ", link: "#" },
    { name: "Contact us", link: "#" },
  ];

  // Array of customer service related links
  const customerService = [
    { name: "Payment Methods", link: "#" },
    { name: "Money back guarantee", link: "#" },
    { name: "Returns", link: "#" },
    { name: "Shipping", link: "#" },
    { name: "Terms and conditions", link: "#" },
    { name: "Privacy policy", link: "#" },
  ];

  // Array of account-related links for the user
  const myAccount = [
    { name: "Sign in", link: "/authentication" },
    { name: "View Cart", link: "/cart" },
    { name: "My wishlist", link: "/wishlist" },
    { name: "Track my order", link: "#" },
    { name: "Help", link: "#" },
  ];

  return (
    <footer className="bg-secondary  w-full px-8 sm:px-28  pb-12 pt-20 ">
      <div className="grid md:grid-cols-3 gap-14 mb-12 ">
        <div className="md:col-span-1 text-secondary--shade__2 text-sm">
          <Logo />
          <p className="py-3">
            Welcome to V-Shop, your number one source for all types of attire.
            We are dedicated to providing you with the best products, with a
            focus on quality, customer service, and uniqueness.
          </p>

          <div className="flex gap-2 items-center border-[1px] border-solid border-secondary--shade__1 p-2">
            <IoCallOutline className="text-2xl lg:m-2" />
            <div>
              <p>Got Question? Call us 24/7</p>
              <p className="text-custom-blue lg:text-lg">+0123456789</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex gap-3 justify-between ">
          <List heading={"Useful links"} items={usefulLinks} />
          <List heading={"Customer service"} items={customerService} />
          <List heading={"My Account"} items={myAccount} />
        </div>
      </div>
      <div className="flex gap-3 justify-between items-start">
        <p className="text-secondary--shade__1">
          Copyright &copy; V-Shop. All rights reserved
        </p>
        <SocialMedia />
      </div>
    </footer>
  );
}

// List component for rendering a list of items with a heading
function List({ heading, items }) {
  return (
    <div className="flex-1">
      <h3 className="font-semibold mb-4">{heading}</h3>
      <ul>
        {items.map((item, i) => (
          <ListItem item={item} key={i} />
        ))}
      </ul>
    </div>
  );
}

// ListItem component for rendering individual items in a list
function ListItem({ item }) {
  return (
    <div className="text-secondary--shade__2 text-sm my-3 hover:font-semibold duration-200">
      <NavLink to={item.link}>{item.name}</NavLink>
    </div>
  );
}

export default Footer;
