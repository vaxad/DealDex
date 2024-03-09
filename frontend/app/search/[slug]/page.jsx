"use client";
import React, { useEffect } from "react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../../../components/ui/3d-card";
import Loading from "../../components/Loading";
import Link from "next/link";
const page = ({ params: { slug } }) => {
  const [data, setData] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const getData = async () => {
    const res = await fetch(`${url}/api/price/fetch/${slug}`);
    const data = await res.json();
    setProduct(data.product);
    setData(data.others);
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

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
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full my-2 grid grid-cols-1 md:grid-cols-2 rounded-xl bg-gradient-to-b from-zinc-900 border border-zinc-800 to-black h-96 max-h-fit">
              <div className="border h-fit">
                <div className="w-full h-60 my-5  relative rounded-xl flex overflow-clip">
                  <img
                    src={product.images}
                    height="1000"
                    width="1000"
                    className="  top-0 w-full absolute blur-sm opacity-60 -z-10 object-contain mb-2 rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                  <img
                    src={product.images}
                    height="1000"
                    width="1000"
                    className="  top-0 h-full object-contain mb-2 rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </div>
              </div>
              <div></div>
            </div>
            <div className="w-full my-2 rounded-xl bg-black h-96 flex justify-center items-center cursor-pointer">
              <div className="mx-auto text-center"> + Add to compare</div>
            </div>
          </div>
        )}
        <div className="mt-10">
          <h1 className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
            Popular Searches
          </h1>

          <div className=" pt-5 pb-24  w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {loading ? (
              <div className=" col-span-1 md:col-span-2 lg:col-span-3 ">
                <Loading />
              </div>
            ) : (
              data.map((item) => (
                <CardContainer key={item._id} className="inter-var w-full">
                  <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-fit rounded-xl p-6 border  ">
                    <CardItem
                      translateZ="100"
                      className="w-full h-60 my-5  relative rounded-xl flex overflow-clip"
                    >
                      <img
                        src={item.images[0]}
                        height="1000"
                        width="1000"
                        className="  top-0 w-full absolute blur-sm opacity-60 -z-10 object-contain mb-2 rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />
                      <img
                        src={item.images[0]}
                        height="1000"
                        width="1000"
                        className="  top-0 h-full object-contain mb-2 rounded-xl group-hover/card:shadow-xl"
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
                          Rs{" "}
                          {Math.floor(item.prices[0].price) ||
                            item.prices[0].price}{" "}
                          /-
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
                      <Link
                        href={`/search/${item._id}`}
                        className=" flex w-6/12"
                      >
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="px-4 py-4 flex items-center justify-center mx-auto text-center w-full  rounded-xl bg-black dark:bg-white dark:text-black text-white text-md font-bold"
                        >
                          Compare <img src="/compare.png" alt="" />
                        </CardItem>
                      </Link>
                    </div>
                  </CardBody>
                </CardContainer>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
