import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Link from "next/link";
import TechBar from "./TechBar";

type NavbarProps = {
  year: string;
  setYear: Function;
  setSearchQuery: Function;
  organizationData: any[];
  setTechSearchQuery: Function;
  techSet: Set<string>;
};

const Navbar = ({
  year,
  setYear,
  setSearchQuery,
  setTechSearchQuery,
  techSet,
}: NavbarProps) => {
  const [techSearch, setTechSearch] = useState("");
  return (
    <div className="fixed left-0 top-0 h-full w-[18%] bg-gray-100 shadow-md p-4 rounded-lg flex flex-col justify-between">
      <div>
        <div className="text-xl font-bold text-blue-700">
          GSOC Issue Tracker
        </div>

        <div className="flex flex-col gap-1 mt-4 justify-center items-center">
          <div>Organziations</div>
          <div className="h-[1.5px] w-full bg-black"></div>
          <div className="my-1">
            <Searchbar setSearchQuery={setSearchQuery} />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center mt-4">
          <label className="text-gray-700"> Year</label>
          <div className="h-[1.5px] w-full bg-black"></div>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-300 w-[55%] text-center"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 mt-8 justify-center items-center">
          <div>Technology</div>
          <div className="h-[1.5px] w-full bg-black"></div>
          <div className="my-1">
            <TechBar
              techSearch={techSearch}
              setTechSearch={setTechSearch}
              setTechSearchQuery={setTechSearchQuery}
            />
          </div>
        </div>
      </div>

      <footer className="text-lg text-gray-600 mt-4">
        Developed by
        <br />
        <Link
          href="https://www.linkedin.com/in/kavish-parikh"
          target="blank"
          className=" text-blue-600"
        >
          Kavish
        </Link>
        {" and "}
        <Link
          href="https://www.linkedin.com/in/tirthraj-raval-773422263"
          target="blank"
          className=" text-blue-600"
        >
          Tirthraj
        </Link>
      </footer>
    </div>
  );
};

export default Navbar;
