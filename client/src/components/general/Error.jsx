// Error component to display error messages
function Error({ errorMessage }) {
  return (
    <div className="py-40 flex justify-center text-primary--shade__1">
      <h1 className="text-5xl">{errorMessage}</h1>
    </div>
  );
}

export default Error;
