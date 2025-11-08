import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")}>
      <img
        src="/logo.jpg"
        className="h-9 border-2 border-solid border-primary shadow-2xl rounded hover:scale-105"
      />
    </button>
  );
}

export default Logo;
