import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, fetchProducts } from "../../features/productSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Pagination() {
  const { currentPage, totalPages } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
      dispatch(fetchProducts());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center py-8 mb-14">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className={`p-2 rounded hover:bg-secondary ${
            currentPage === 1 ? "text-secondary--shade__0 cursor-not-allowed" : "text-secondary--shade__2"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <MdChevronLeft className="text-xl sm:text-2xl" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          {pageNumbers.map((num, idx) =>
            num === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-secondary--shade__1">
                ...
              </span>
            ) : (
              <button
                key={num}
                className={`px-3 py-1 rounded min-w-[2.5rem] ${
                  num === currentPage
                    ? "bg-primary text-white font-semibold"
                    : "hover:bg-secondary text-secondary--shade__2"
                }`}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            )
          )}
        </div>

        <div className="sm:hidden flex items-center gap-2 text-sm">
          <span className="text-secondary--shade__2">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          className={`p-2 rounded hover:bg-secondary ${
            currentPage === totalPages ? "text-secondary--shade__0 cursor-not-allowed" : "text-secondary--shade__2"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <MdChevronRight className="text-xl sm:text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
