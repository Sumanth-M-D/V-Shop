interface CartWishlistTitleProps {
  title: string;
}

function Cart_Wishlist_Title({ title }: CartWishlistTitleProps) {
  return (
    <div className="bg-[url('/title_pattern.png')] bg-cover py-6 text-center">
      <h1 className="text-black tracking-tight text-5xl mb-3">{title}</h1>
      <p className=" text-primary--shade__1 text-base font-semibold">Shop</p>
    </div>
  );
}

export default Cart_Wishlist_Title;
