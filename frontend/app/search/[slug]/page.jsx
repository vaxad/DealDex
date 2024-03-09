"use client";
import React, { useEffect, useState } from "react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../../../components/ui/3d-card";
import Loading from "../../components/Loading";
import Link from "next/link";
import { Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
} from "chart.js";
ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale);
const page = ({ params: { slug } }) => {
  const chartData = {
    labels: [
      "2023-01-01",
      "2023-02-05",
      "2023-03-12",
      "2023-04-18",
      "2023-05-24",
      "2023-06-29",
      "2023-08-04",
      "2023-09-09",
      "2023-10-15",
      "2023-11-21",
      "2023-12-27",
      "2024-01-02",
      "2024-02-08",
      "2024-03-14",
      "2024-04-19",
      "2024-05-25",
      "2024-06-30",
      "2024-08-05",
      "2024-09-10",
      "2024-10-16",
    ],
    datasets: [
      {
        label: "Demo Line",
        data: [
          18999, 23500, 19500, 19750, 20000, 23000, 20500, 20750, 21000, 21250,
          21500, 21750, 22000, 22250, 22500, 19500, 23000, 23250, 23500, 18999,
        ],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };
  const [compare, setCompare] = useState(-1);
  const [item, setItem] = useState({});
  const [userData, setUserData] = useState({});
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
    if (compare !== -1) {
      setItem(data[compare]);
    }
  }, [compare]);
  useEffect(() => {
    getData();
  }, []);
  const handleScrollToProducts = () => {
    const productsDiv = document.querySelector("#products");
    if (productsDiv) {
      productsDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="px-10 max-sm:px-4">
        <Link href="/search">
          <div className="rounded-full border items-center flex bg-black shadow-md px-2 py-1 mt-2 text-sm w-fit">
            <img src="/back.png" alt="" className="mr-1" /> Search
          </div>
        </Link>
        <div className="mt-4">
          <h1 className="text-4xl max-sm:text-2xl font-bold text-zinc-500 dark:text-zinc-200">
            Products Comparison:
          </h1>
          <p className="text-zinc-500 mt-2 dark:text-zinc-400">
            Compare Products across websites{" "}
          </p>
        </div>
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full my-2 flex-col rounded-xl bg-gradient-to-b from-zinc-900 border border-zinc-800 to-black h-fit ">
              <div className="flex w-full">
                <div className="h-full flex-grow w-1/2 flex items-center">
                  <div className="w-full h-60 relative rounded-l-xl items-center justify-center flex overflow-clip">
                    <img
                      src={product.images}
                      className="  top-0 w-full absolute blur-sm opacity-60 h-full object-cover mb-2 rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                    <img
                      src={product.images}
                      className="  top-0 h-full  object-contain mb-2 z-10 rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </div>
                </div>
                <div className="p-4 w-2/3">
                  <div className="text-2xl leading-normal font-bold text-zinc-500 dark:text-zinc-200 line-clamp-2">
                    {product.name}
                  </div>
                  <div className="text-zinc-500 text-sm max-w-sm mb-6 dark:text-zinc-400 line-clamp-6 mt-4 leading-relaxed">
                    {product.description}
                  </div>
                  <div className="text-2xl font-bold text-zinc-500 dark:text-zinc-200 ">
                    {product.prices && (
                      <>
                        <span>
                          Rs{" "}
                          {Math.floor(
                            parseFloat(
                              product.prices[0].price.replace(/\,/g, "")
                            )
                          )}{" "}
                          /-
                        </span>
                        <Link
                          href={product.link}
                          target="_blank"
                          className="w-6/12"
                        >
                          <div
                            translateZ={20}
                            as="button"
                            className="px-4 py-2 text-sm mt-2 w-fit bg-white rounded-md text-md font-normal dark:text-black border "
                          >
                            Read more →
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {product.prices ? (
                <>
                  <div className="p-4 w-full col-span-2">
                    <h2 className="text-2xl mb-2">Line Graph</h2>
                    <Line
                      data={chartData}
                      options={options}
                      className="w-full"
                    />
                  </div>
                </>
              ) : null}
            </div>
            {compare !== -1 ? (
              <div className="grid grid-cols-1 gap-4 w-full">
                <div className="w-full my-2 flex-col rounded-xl bg-gradient-to-b from-zinc-900 border border-zinc-800 to-black h-fit ">
                  <div className="flex w-full">
                    <div className="h-full flex-grow w-1/2 flex items-center">
                      <div className="w-full h-60 relative rounded-l-xl items-center justify-center flex overflow-clip">
                        <img
                          src={item.images}
                          className="  top-0 w-full absolute blur-sm opacity-60 h-full object-cover mb-2 rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                        <img
                          src={item.images}
                          className="  top-0 h-full  object-contain mb-2 z-10 rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </div>
                    </div>
                    <div className="p-4 w-2/3">
                      <div className="text-2xl leading-normal font-bold text-zinc-500 dark:text-zinc-200 line-clamp-2">
                        {item.name}
                      </div>
                      <div className="text-zinc-500 text-sm max-w-sm mb-6 dark:text-zinc-400 line-clamp-6 mt-4 leading-relaxed">
                        {item.description}
                      </div>
                      <div className="text-2xl font-bold text-zinc-500 dark:text-zinc-200 ">
                        {item.prices && (
                          <>
                            <span>
                              Rs{" "}
                              {Math.floor(
                                parseFloat(
                                  item.prices[0].price.replace(/\,/g, "")
                                )
                              )}{" "}
                              /-
                            </span>
                            <Link
                              href={item.link}
                              target="_blank"
                              className="w-6/12"
                            >
                              <div
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 text-sm mt-2 w-fit bg-white rounded-md text-md font-normal dark:text-black border "
                              >
                                Read more →
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {item.prices ? (
                    <>
                      <div className="p-4 w-full col-span-2">
                        <h2 className="text-2xl mb-2">Line Graph</h2>
                        <Line
                          data={chartData}
                          options={options}
                          className="w-full"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleScrollToProducts();
                }}
                className="w-full my-2 max-sm:h-fit p-4 rounded-xl border border-gray-100/30 bg-black hover:bg-zinc-900 h-96 flex justify-center items-center cursor-pointer"
              >
                <div className="mx-auto text-center flex">
                  {" "}
                  <img src="/compare.png" alt="" className="mr-2 invert" /> Add
                  to compare
                </div>
              </button>
            )}
          </div>
        )}
        <div className="mt-10">
          <h1
            id="products"
            className="text-4xl font-bold text-zinc-500 dark:text-zinc-200"
          >
            Similar Products
          </h1>

          <div className=" pt-5 pb-24  w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {loading ? (
              <div className=" col-span-1 md:col-span-2 lg:col-span-3 ">
                <Loading />
              </div>
            ) : (
              data.map((item, ind) => (
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
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mb-6 dark:text-neutral-300"
                    >
                      <Link href={item.brand} className="flex gap-1">
                        {" "}
                        <span> source: </span>
                        <div className="underline">{item.brand}</div>{" "}
                      </Link>
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
                      <Link href={item.link} target="_blank" className="w-6/12">
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="px-4 py-4 w-full rounded-xl text-md font-normal dark:text-white border "
                        >
                          Visit →
                        </CardItem>
                      </Link>
                      <div
                        href={`/search/${item._id}`}
                        className=" flex w-6/12 cursor-pointer"
                        onClick={() => {
                          setCompare(ind);
                        }}
                      >
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="px-4 py-4 flex items-center justify-center mx-auto text-center w-full  rounded-xl bg-black dark:bg-white dark:text-black text-white text-md font-bold"
                        >
                          Compare <img src="/compare.png" alt="" />
                        </CardItem>
                      </div>
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
