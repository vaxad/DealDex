import React from "react";
import data from "../../../utils/data";
const page = () => {
  return (
    <>
      <div className="px-10 max-sm:px-4">
        <div className="mt-10">
          <h1 className="text-6xl max-sm:text-3xl font-bold text-zinc-500 dark:text-zinc-200">
            Search
          </h1>
          <p className="text-zinc-500 mt-2 dark:text-zinc-400">
            Search for the products you want to compare
          </p>
          <div className=" relative w-max mt-6 gap-2">
            <input
              type="search"
              name=""
              id="search"
              placeholder="Search for ranges of products"
              className=" outline-none text-[#F3FF74] rounded-full px-8 max-sm:px-4 max-sm:w-72 max-sm:text-xs py-3 w-96"
            />
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="searchIcon"
            >
              <path
                d="M16.6 18.5L10.3 12.2C9.8 12.6 9.225 12.9167 8.575 13.15C7.925 13.3833 7.23333 13.5 6.5 13.5C4.68333 13.5 3.146 12.8707 1.888 11.612C0.63 10.3533 0.000666667 8.816 0 7C0 5.18333 0.629333 3.646 1.888 2.388C3.14667 1.13 4.684 0.500667 6.5 0.5C8.31667 0.5 9.85433 1.12933 11.113 2.388C12.3717 3.64667 13.0007 5.184 13 7C13 7.73333 12.8833 8.425 12.65 9.075C12.4167 9.725 12.1 10.3 11.7 10.8L18 17.1L16.6 18.5ZM6.5 11.5C7.75 11.5 8.81267 11.0627 9.688 10.188C10.5633 9.31333 11.0007 8.25067 11 7C11 5.75 10.5627 4.68767 9.688 3.813C8.81333 2.93833 7.75067 2.50067 6.5 2.5C5.25 2.5 4.18767 2.93767 3.313 3.813C2.43833 4.68833 2.00067 5.75067 2 7C2 8.25 2.43767 9.31267 3.313 10.188C4.18833 11.0633 5.25067 11.5007 6.5 11.5Z"
                fill="#F3FF74"
              />
            </svg>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
            Popular Searches
          </h1>
          <div className="mt-4 flex w-fit flex-wrap flex-row gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 w-80 h-fit bg-slate-700 dark:bg-slate-400 rounded-lg p-4"
              >
                <h1 className="text-xl font-bold text-zinc-500 dark:text-zinc-200">
                  {item.name}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
