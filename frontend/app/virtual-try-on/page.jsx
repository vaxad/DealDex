"use client";
import React from "react";
import { useState } from "react";
const page = () => {
  const [tab, setTab] = useState("shoes");
  return (
    <>
      <div className="px-10 mb-20">
        <div className="flex gap-2 px-4 py-4 mx-auto mt-4 bg-zinc-950 rounded-full w-fit items-center justify-center cursor-pointer mb-6">
          <div
            className={`py-2 px-4 flex rounded-full hover:border transition-all items-center max-sm:text-xs ${
              tab === "shoes" ? "border border-white" : ""
            }`}
            onClick={() => {
              setTab("shoes");
            }}
          >
            <img src="/shoes.png" alt="" className="mr-2" />
            Shoes
          </div>
          <div
            className={`py-2 px-4 flex rounded-full hover:border transition-all items-center max-sm:text-xs ${
              tab === "glasses" ? "border border-white" : ""
            }`}
            onClick={() => {
              setTab("glasses");
            }}
          >
            <img src="/glasses.png" alt="" className="mr-2" />
            Glasses
          </div>
          <div
            className={`py-2 px-4 flex rounded-full hover:border transition-all items-center max-sm:text-xs ${
              tab === "watch" ? "border border-white" : ""
            }`}
            onClick={() => {
              setTab("watch");
            }}
          >
            <img src="/watch.png" alt="" className="mr-2" />
            Watch
          </div>
        </div>
        {tab === "shoes" && (
          <iframe
            allow="camera"
            src="https://www.shopar.ai/collection/shoes"
            frameborder="0"
            className="mx-auto rounded-xl max-sm:-ml-3 shadow-lg h-[80vh] w-[90vw] "
          ></iframe>
        )}
        {tab === "watch" && (
          <iframe
            allow="camera"
            src="https://www.shopar.ai/collection/movado"
            frameborder="0"
            className="mx-auto rounded-xl max-sm:-ml-3 shadow-lg h-[80vh] w-[90vw] "
          ></iframe>
        )}
        {tab === "glasses" && (
          <iframe
            allow="camera"
            src="https://www.shopar.ai/collection/glasses?mode=ar"
            frameborder="0"
            className="mx-auto rounded-xl max-sm:-ml-3 shadow-lg h-[80vh] w-[90vw]"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default page;
