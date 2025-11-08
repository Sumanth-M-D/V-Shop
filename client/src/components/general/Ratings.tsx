import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Rating as RatingType } from "../../types/product.types";
import { ReactElement } from "react";

interface RatingsProps {
  rating: RatingType;
}

function Ratings({ rating }: RatingsProps) {
  let numRating = rating.rate; // Extract the numerical rating from the rating prop
  const starRating: ReactElement[] = []; // Array to hold the star icons

  for (let i = 0; i < 5; i++) {
    // Check the number of stars to render (5 stars total)

    // full star
    if (numRating >= 1) {
      starRating.push(<FaStar className="text-primary" key={i} />);
      numRating--;
      continue;
    }

    // Half star
    if (numRating > 0) {
      starRating.push(<FaStarHalfAlt className="text-primary" key={i} />);
      numRating = 0;
      continue;
    }

    // Empty star
    starRating.push(<FaRegStar className="text-primary" key={i} />);
  }

  return <div className="flex text-sm items-center gap-1">{starRating}</div>;
}

export default Ratings;
