function ShippingAndReturns() {
  return (
    <div className="text-base text-secondary--shade__3">
      <div className="mb-6">
        <h2 className="font-semibold  text-lg mb-1">
          Shipping and Return Policy{" "}
        </h2>
        <p className=" text-sm">
          At V-Shop, we are committed to delivering your orders quickly and
          safely. Please review our shipping guidelines below:
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold mb-1">
            Processing Time and shipping costs
          </h3>
          <p>
            Orders are typically processed within 1-2 business days after
            payment confirmation. During peak seasons or sales, processing times
            may extend up to 3-5 business days. Shipping Methods & Delivery
            Times
          </p>
          <div className="">
            <p>We offer the following shipping options:</p>
            <ul className=" list-disc list-inside pl-3">
              <li>
                Standard Shipping (5-7 business days): Free on orders above $50.
              </li>
              <li>
                Express Shipping (2-3 business days): Available for an
                additional fee at checkout.
              </li>
              <li>
                Overnight Shipping (1 business day): Available for select
                locations for an additional fee.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Eligibility for Returns</h3>
          <ul className=" list-disc list-inside pl-3">
            <li>Items must be returned within 30 days of the delivery date.</li>
            <li>
              The product must be in original condition (unused, unwashed, with
              all tags and packaging intact).
            </li>
            <li>
              Final Sale items, personalized products, and gift cards are
              non-returnable.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShippingAndReturns;
