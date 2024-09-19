import React from "react";
import { RxCross1, RxCross2 } from "react-icons/rx";

type TechBarProps = {
  techSearch: string;
  setTechSearch: Function;
  setTechSearchQuery: Function;
};

const TechBar = ({
  techSearch,
  setTechSearch,
  setTechSearchQuery,
}: TechBarProps) => {
  const handleSubmit = () => {
    setTechSearchQuery(techSearch);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="relative"
    >
      <input
        type="text"
        value={techSearch}
        placeholder="Search for a technology"
        className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-300"
        onChange={(e) => {
          setTechSearch(e.target.value);
        }}
      />

      <button
        type="button"
        onClick={() => {
          setTechSearch("");
          setTechSearchQuery("");
        }}
        className="absolute right-4 top-[30%] text-blue-400 text-lg"
      >
        <RxCross2 />
      </button>
    </form>
  );
};

export default TechBar;
