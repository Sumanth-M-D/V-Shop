const PLACEHOLDER_ITEMS = Array.from({ length: 8 });

function ProductCardSkeleton() {
  return (
    <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-secondary--shade__0 bg-white p-4 shadow-sm">
      <div className="animate-pulse">
        <div className="mb-6 h-56 w-full rounded-2xl bg-secondary--shade__0" />
        <div className="mb-3 h-4 w-20 rounded-full bg-secondary--shade__1" />
        <div className="mb-2 h-5 w-full rounded-full bg-secondary--shade__1" />
        <div className="mb-4 h-5 w-3/4 rounded-full bg-secondary--shade__1" />
        <div className="mb-4 h-6 w-24 rounded-full bg-primary" />
        <div className="flex flex-col gap-2">
          <div className="h-10 w-full rounded-full bg-secondary--shade__0" />
          <div className="h-10 w-full rounded-full bg-secondary--shade__0" />
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-14 pt-24 xs:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:px-14 2xl:px-24">
      {PLACEHOLDER_ITEMS.map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductGridSkeleton;

