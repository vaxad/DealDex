import React from "react";
import { WavyBackground } from "../components/ui/wavy-background";
import Image from "next/image";
import { Tabs } from "../components/ui/tabs";
import Link from "next/link";
export default function Home() {
  const tabs = [
    {
      title: "Scraping",
      value: "Realtime Webscraping",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl max-md:sm font-bold text-white bg-gradient-to-br from-green-700 to-violet-900 mb-4">
          <p>Realtime Webscraping that allows the user to compare prices from famous sites like Amazon, Ebay, Flipkart etc..</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-violet-900">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-700 to-violet-900">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-700 to-violet-900">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];
  return (
    <div className="px-0 [isolation:isolate] bg-[#111111]">
      <div
        className="min-h-[90vh] text-center grid place-items-center overflow-clip"
        id="hero">
        <div className=" flex w-full flex-col justify-center items-center">
          <WavyBackground>
          <h1 className="px-2 font-bold max-sm:text-3xl max-sm:leading-snug" id="heading">
            Track the Price$
            <br />
            Don't Overpay!
          </h1>
          <p className="text-[hsl(0,0%,70%)] mx-auto text-center text-lg max-sm:text-sm mt-4 w-8/12 mb-12 ">
            Empowering informed purchasing decisions by providing a dynamic
            product price tracking and comparison tool across various e-commerce
            platforms.
          </p>
<Link href="/search">
          <div className=" pointer-events-none cursor-pointer relative w-max mx-auto gap-2">
            <input
              type="search"
              name=""
              id="search"
              placeholder="Search for ranges of products"
              className=" outline-none text-[#F3FF74] rounded-full px-8 py-3 w-96"
            />
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="searchIcon">
              <path
                d="M16.6 18.5L10.3 12.2C9.8 12.6 9.225 12.9167 8.575 13.15C7.925 13.3833 7.23333 13.5 6.5 13.5C4.68333 13.5 3.146 12.8707 1.888 11.612C0.63 10.3533 0.000666667 8.816 0 7C0 5.18333 0.629333 3.646 1.888 2.388C3.14667 1.13 4.684 0.500667 6.5 0.5C8.31667 0.5 9.85433 1.12933 11.113 2.388C12.3717 3.64667 13.0007 5.184 13 7C13 7.73333 12.8833 8.425 12.65 9.075C12.4167 9.725 12.1 10.3 11.7 10.8L18 17.1L16.6 18.5ZM6.5 11.5C7.75 11.5 8.81267 11.0627 9.688 10.188C10.5633 9.31333 11.0007 8.25067 11 7C11 5.75 10.5627 4.68767 9.688 3.813C8.81333 2.93833 7.75067 2.50067 6.5 2.5C5.25 2.5 4.18767 2.93767 3.313 3.813C2.43833 4.68833 2.00067 5.75067 2 7C2 8.25 2.43767 9.31267 3.313 10.188C4.18833 11.0633 5.25067 11.5007 6.5 11.5Z"
                fill="#F3FF74"
              />
            </svg>
          </div>
          </Link>
          </WavyBackground>
        </div>

        <svg
          width="504"
          height="454"
          viewBox="0 0 504 454"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -z-10 opacity-[0.15]">
          <path
            d="M352.666 221.463L459.373 36.9917L502.911 62.1583L371.29 289.917L207.455 195.542L87.4101 403.167H503.666V453.5H0.333496V0.5H50.6668V366.423L189.083 126.333L352.666 221.463Z"
            fill="url(#paint0_linear_3_45)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3_45"
              x1="252"
              y1="0.5"
              x2="252"
              y2="453.5"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#2E2E2E" />
              <stop offset="1" stopColor="#606060" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mb-40 mt-20">
        <div className="text-7xl max-sm:text-4xl font-semibold text-center mx-auto mb-8">Edge Cutting Features</div>
      <Tabs tabs={tabs} />
    </div>
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.png"
      alt="dummy image"
      width="700"
      height="700"
      className="object-cover object-left-top h-[60%] mt-4 md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
const DummyContent2 = () => {
  return (
    <Image
      src="/linear.png"
      alt="dummy image"
      width="700"
      height="700"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
const DummyContent3 = () => {
  return (
    <Image
      src="/linear.png"
      alt="dummy image"
      width="700"
      height="700"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
const DummyContent4 = () => {
  return (
    <Image
      src="/linear.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};