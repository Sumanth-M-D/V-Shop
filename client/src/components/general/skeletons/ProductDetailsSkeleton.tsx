function ProductDetailsSkeleton() {
  return (
    <section className="animate-pulse gap-10 py-8 upperMd:grid upperMd:grid-cols-10">
      <div className="upperMd:col-span-5 lg:col-span-4">
        <div className="h-[420px] w-full rounded-3xl bg-secondary--shade__0" />
        <div className="mt-4 flex gap-3">
          <div className="h-20 w-20 rounded-2xl bg-secondary--shade__0" />
          <div className="h-20 w-20 rounded-2xl bg-secondary--shade__0" />
          <div className="h-20 w-20 rounded-2xl bg-secondary--shade__0" />
        </div>
      </div>

      <div className="upperMd:col-span-5 lg:col-span-6">
        <div className="mb-6 h-7 w-3/4 rounded-full bg-secondary--shade__1" />
        <div className="mb-4 h-6 w-1/3 rounded-full bg-secondary--shade__1" />
        <div className="mb-6 h-10 w-28 rounded-full bg-primary" />
        <div className="mb-5 space-y-3">
          <div className="h-4 w-full rounded-full bg-secondary--shade__0" />
          <div className="h-4 w-5/6 rounded-full bg-secondary--shade__0" />
          <div className="h-4 w-full rounded-full bg-secondary--shade__0" />
          <div className="h-4 w-4/6 rounded-full bg-secondary--shade__0" />
        </div>
        <div className="mb-4 flex gap-4">
          <div className="h-11 w-36 rounded-full bg-secondary--shade__0" />
          <div className="h-11 w-36 rounded-full bg-secondary--shade__0" />
          <div className="h-11 w-36 rounded-full bg-secondary--shade__0" />
        </div>
        <div className="mt-10 h-5 w-2/5 rounded-full bg-secondary--shade__1" />
      </div>
    </section>
  );
}

export default ProductDetailsSkeleton;

