import { ChangeEvent, FormEvent, useState } from "react";
import { VscSearch } from "react-icons/vsc";
import {
  fetchProducts,
  resetCurrentPage,
} from "../../../features/productSlice";
import { setSearchText } from "../../../features/categoriesSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";

function Searchbar() {
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSearchText(inputText));
    dispatch(resetCurrentPage());
    dispatch(fetchProducts());
    navigate("/");
  }

  return (
    <form
      className="sm:order-none order-last w-[600px] sm:w-80 md:w-96 lg:w-[500px] flex justify-center "
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Search Product..."
        type="text"
        className="text-sm px-4 py-2 w-full  h-10  borderPrimary focus:outline-none"
        value={inputText}
        onChange={handleChange}
      ></input>
      <button
        className="px-3 py-auto bg-primary self-stretch items-stretch h-10 borderPrimary hover:scale-105 "
        type="submit"
      >
        <VscSearch color={"white"} className="text-xl " />
      </button>
    </form>
  );
}

export default Searchbar;
