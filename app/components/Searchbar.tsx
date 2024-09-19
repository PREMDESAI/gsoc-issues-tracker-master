import React from "react";

type SearchbarProps = {
  setSearchQuery: Function; // Prop to set the search query in Home component
};

const Searchbar = ({ setSearchQuery }: SearchbarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for an organization"
        className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-300"
        onChange={(e) => {
          setSearchQuery(e.target.value); // Update search query state on input change
        }}
      />
    </div>
  );
};

export default Searchbar;
