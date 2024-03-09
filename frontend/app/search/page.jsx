import React from "react";
import data from "../../utils/data";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="px-10 max-sm:px-4">
        <Link href="/">
          <div className="rounded-full border items-center flex bg-black shadow-md px-2 py-1 mt-2 text-sm w-fit">
            <img src="/back.png" alt="" className="mr-1" /> Back
          </div>
        </Link>
        <div className="mt-2">
          <h1 className="text-6xl max-sm:text-5xl font-bold text-zinc-500 dark:text-zinc-200">
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
          <h1 className="text-4xl max-sm:text-2xl font-bold text-zinc-500 dark:text-zinc-200">
            Popular Searches
          </h1>
          <div className="mt-4 flex w-fit flex-wrap flex-row gap-20 max-md:gap-10 max-sm:gap-6">
            {data.map((item) => (
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-fit rounded-xl p-6 border  ">
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={item.images[0]}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-contain mb-2 rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white line-clamp-2"
                  >
                    {item.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mb-6 dark:text-neutral-300 line-clamp-1"
                  >
                    {item.description}
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-neutral-600 dark:text-white"
                  >
                    {item.prices.length > 0 && (
                      <span>
                        Rs {parseFloat(item.prices[0].price).toFixed(2)} /-
                      </span>
                    )}
                  </CardItem>
                  <div className="flex justify-around items-center mt-2 gap-2">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-4 w-6/12 rounded-xl text-md font-normal dark:text-white border "
                    >
                      Visit →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-4 flex items-center justify-center mx-auto text-center w-6/12 rounded-xl bg-black dark:bg-white dark:text-black text-white text-md font-bold"
                    >
                      Compare <img src="/compare.png" alt="" />
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
