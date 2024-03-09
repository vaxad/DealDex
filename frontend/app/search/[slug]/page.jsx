import React from "react";
import data from "../../../utils/data";
const page = () => {
  return (
    <>
      <div className="px-10 max-sm:px-4">
        <div className="mt-10">
          <h1 className="text-4xl max-sm:text-2xl font-bold text-zinc-500 dark:text-zinc-200">
            Products Comparison:
          </h1>
          <p className="text-zinc-500 mt-2 dark:text-zinc-400">
            Compare Products across websites{" "}
          </p>
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
