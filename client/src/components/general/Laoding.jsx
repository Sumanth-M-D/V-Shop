// Loading component to display a spinner during data fetching or processing
function Loading() {
  return (
    <div className="my-40">
      <div className="flex justify-center items-center ">
        <div className="animate-spin-slow rounded-full h-32 w-32 border-8 border-secondary--shade__0 border-t-secondary "></div>
      </div>
    </div>
  );
}

export default Loading;
