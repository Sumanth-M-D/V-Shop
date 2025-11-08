import { useNavigate } from "react-router-dom";

export interface BreadCrumbElement {
  title: string;
  to: string;
}

interface BreadCrumbProps {
  elements: BreadCrumbElement[];
}

// BreadCrumb component that receives an array of breadcrumb elements
function BreadCrumb({ elements }: BreadCrumbProps) {
  return (
    <div className="flex gap-2">
      {elements.map((element, i) => (
        <Element
          element={element}
          key={element.to || element.title || i}
          isLast={i === elements.length - 1}
        />
      ))}
    </div>
  );
}

interface ElementProps {
  element: BreadCrumbElement;
  isLast: boolean;
}

// Individual Element of the breadcrumb
function Element({ element, isLast }: ElementProps) {
  const navigate = useNavigate();

  return (
    <div className="text-sm text-secondary--shade__1 flex gap-2 hover:text-black">
      <button type="button" onClick={() => navigate(element.to)}>
        {element.title}
      </button>
      {!isLast && <span>&gt;</span>}
    </div>
  );
}

export default BreadCrumb;
