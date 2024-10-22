import { useNavigate } from "react-router-dom";

// BreadCrumb component that receives an array of breadcrumb elements
function BreadCrumb({ elements }) {
  return (
    <div className="flex gap-2">
      {elements.map((element, i) => (
        <Element element={element} key={i} islast={i === elements.length - 1} />
      ))}
    </div>
  );
}

// Individual Element of the breadcrumb
function Element({ element, islast }) {
  const navigate = useNavigate();

  return (
    <div className="text-sm text-secondary--shade__1 flex gap-2 hover:text-black">
      <button onClick={() => navigate(element.to)}>{element.title}</button>
      {!islast && <span>&gt;</span>}
    </div>
  );
}

export default BreadCrumb;
