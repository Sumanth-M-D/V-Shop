import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  // Function to navigate back to the previous page in browser history
  function goBack() {
    navigate(-1);
  }

  return (
    <div className="py-40 flex flex-col gap-10 items-center text-primary--shade__1">
      <h1 className="text-5xl">Page Not Found</h1>

      {/* Button to go back to the previous page */}
      <button
        className="text-3xl border-2 px-8 py-3 rounded-md bg-secondary hover:text-black hover:bg-primary duration-200"
        onClick={goBack}
      >
        &larr; Go Back
      </button>
    </div>
  );
}

export default PageNotFound;
