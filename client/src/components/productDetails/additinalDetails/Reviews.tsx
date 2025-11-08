import { useState } from "react";
import Ratings from "../../general/Ratings";
import { Rating } from "../../../types/product.types";

interface ReviewUser {
  name: string;
  photo: string;
  review: string;
}

interface ReviewProps {
  user: ReviewUser;
  rating: Rating;
}

// Review Component
function Review({ user, rating }: ReviewProps) {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200">
      <img
        src={user.photo}
        alt={`${user.name}'s profile`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <div className="flex gap-2 text-sm">
          <Ratings rating={rating} /> <span>{`${rating.rate}/5`}</span>
        </div>

        <p className="text-gray-700 mt-1">{user.review}</p>
      </div>
    </div>
  );
}

interface ReviewListProps {
  rating: Rating;
}

// Review List Component
function ReviewList({ rating }: ReviewListProps) {
  // State to manage visible reviews
  const [visibleCount, setVisibleCount] = useState(3);
  const reviewCount = rating.count;

  // Sample data for reviews
  const users: ReviewUser[] = Array.from({ length: reviewCount }, (_, i) => ({
    name: `User ${i + 1}`,
    photo: `https://i.pravatar.cc/150?img=${i + 1}`, // Automatic user photo generator
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo.",
  }));

  // Function to show 3 more reviews
  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, reviewCount));
  };

  // Function to hide reviews and reset visible count to 3
  const handleHideReviews = () => {
    setVisibleCount(3);
  };

  return (
    <div className="w-full  overflow-y-auto ">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      {/* List of reviews */}
      <div className="space-y-4">
        {users.slice(0, visibleCount).map((user, index) => (
          <Review key={user.name + index} user={user} rating={rating} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex flex-wrap  py-8 gap-3">
        <span className="w-44">
          <button
            onClick={handleShowMore}
            className="cta"
            disabled={visibleCount >= reviewCount}
          >
            Read More Reviews
          </button>
        </span>
        <span className="w-44">
          <button
            onClick={handleHideReviews}
            className="cta"
            disabled={visibleCount <= 3}
          >
            Hide Reviews
          </button>
        </span>
      </div>
    </div>
  );
}

export default ReviewList;
