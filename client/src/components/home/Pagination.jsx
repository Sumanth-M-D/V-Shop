import { useDispatch, useSelector } from "react-redux";
import {
  decrementCurrentPage,
  incrementCurrentPage,
  updateCurrentPage,
} from "../../features/productSlice";

function Pagination() {
  // Get current page and total pages from the Redux store
  const { currentPage, totalPages } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Calculate the minimum and maximum page numbers to display
  const min = Math.floor((currentPage - 1) / 3) * 3 + 1;
  const max = Math.min(min + 2, totalPages);
  const pageNumbers = [];

  // Flags to determine if the current page is the first or last
  const noPrev = currentPage === 1;
  const noNext = currentPage === totalPages;

  // Populate the pageNumbers array with the range of page numbers to display
  for (let i = min; i <= max; i++) {
    pageNumbers.push(i);
  }

  // Handler to decrement the current page
  function handlePrev() {
    dispatch(decrementCurrentPage());
  }

  // Handler to increment the current page
  function handleNext() {
    dispatch(incrementCurrentPage());
  }

  // Handler to jump to a specific page
  function handleJump(num) {
    dispatch(updateCurrentPage(num));
  }

  return (
    <div className="flex justify-center py-8 mb-14 text-base">
      <div className="flex gap-8 text-black">
        {/* Prev button */}
        <button
          className={
            noPrev ? "text-secondary--shade__0" : "hover:font-semibold"
          }
          onClick={handlePrev}
        >
          &larr; Prev
        </button>

        {/* Page numbers */}
        <div className="flex gap-6">
          <div className="flex gap-4">
            {pageNumbers.map((num) => (
              <button
                className={`hover:font-semibold ${
                  num === currentPage ? "text-primary--shade__1 font-bold" : ""
                }`}
                key={num}
                onClick={() => handleJump(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-secondary--shade__0">of {totalPages}</p>
        </div>

        {/* Nextbutton */}
        <button
          className={
            noNext ? "text-secondary--shade__0 " : "hover:font-semibold"
          }
          onClick={handleNext}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
