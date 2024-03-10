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
  const [chartData, setChartData] = useState({
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
  });
  const [chartData2, setChartData2] = useState({
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
          18999, 19500, 19500, 19750, 19500, 19500, 20500, 20750, 21000, 21250,
          19500, 21750, 19500, 19500, 19500, 19500, 19500, 19500, 23500, 18999,
        ],
        fill: false,
        backgroundColor: "rgba(111, 14, 141, 1)",
        borderColor: "rgba(0, 14, 141, 0.5)",
      },
    ],
  });
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
  const isBigger = () => {
    if (product.prices && item.prices) {
      if (
        parseFloat(item.prices[0].price.replace(/[^0-9.]+/g, "")) <=
        parseFloat(product.prices[0].price.replace(/[^0-9.]+/g, ""))
      ) {
        setBigger(1);
        console.log(parseFloat(item.prices[0].price.replace(/[^0-9.]+/g, "")));
        return 1;
      } else {
        console.log(
          parseFloat(product.prices[0].price.replace(/[^0-9.]+/g, ""))
        );
        return 0;
      }
    }
  };
  const [bigger, setBigger] = useState(-1);
  const [data, setData] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [msg, setMsg] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [coupons, setCoupons] = React.useState({});
  const [showCoupons, setShowCoupons] = React.useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const flask = process.env.NEXT_PUBLIC_FLASK_URL;

  const getCoupon = async () => {
    const res = await fetch(`${flask}/get_amazon_promo_codes`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    setCoupons(data);
  };

  const sendMsg = async () => {
    const res = await fetch(`${url}/api/price/forum/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: msg }),
    });
    const data = await res.json();
    setMessages([...messages, data.message]);
  };
  async function uploadImage(url) {
    // Make a POST request with Fetch API
    try {
      const uploadResponse = await fetch(`${flask}/category_detect`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ image_url: url }),
      });
      const responseData = await uploadResponse.json();
      console.log("Image uploaded successfully:", responseData);
      if (!responseData.result) return;
      const json = JSON.parse(responseData.result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  function generateAroundValue(x, n) {
    const variation = 0.1 * x;
    const values = [];
    for (let i = 0; i < n - 2; i++) {
      values.push(Math.floor(Math.random() * (variation * 2) + x - variation));
    }
    const resp = shuffle(values.slice());
    return [...resp, x];
  }

  const updateChartData = (prices) => {
    const x = parseFloat(extractNumbers(prices[0].price));
    const n = chartData.labels.length;
    const result = generateAroundValue(x, n);
    console.log(result);
    setChartData({
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
          label: "Price Line",
          data: result,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    });
  };

  const updateChartData2 = (prices) => {
    const x = parseFloat(extractNumbers(prices[0].price));
    const n = chartData.labels.length;
    const result = generateAroundValue(x, n);
    console.log(result);
    setChartData2({
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
          label: "Price Line",
          data: result,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    });
  };
  const getData = async () => {
    const res = await fetch(`${url}/api/price/fetch/${slug}`);
    const data = await res.json();
    setProduct(data.product);
    uploadImage(data.product.images[0]);
    data.others.sort((a, b) => {
      return (
        parseFloat(a.prices[0].price.replace(/[^0-9.]+/g, "")) -
        parseFloat(b.prices[0].price.replace(/[^0-9.]+/g, ""))
      );
    });
    setData(data.others);
    console.log(data);
    setLoading(false);
    const chatres = await fetch(`${url}/api/price/forum/${slug}`);
    const chatdata = await chatres.json();
    updateChartData(data.product.prices);
    setMessages(chatdata.messages);
    if (data.product.brand.includes("flipkart")) {
      getCoupon();
    }
  };

  useEffect(() => {
    if (compare !== -1) {
      setItem(data[compare]);
      updateChartData2(data[compare].prices);
      if (product.prices) {
        setBigger(
          parseFloat(data[compare].prices[0].price.replace(/[^0-9.]+/g, "")) >=
            parseFloat(product.prices[0].price.replace(/[^0-9.]+/g, ""))
            ? 1
            : 0
        );
      }
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
  const handleScrollToCompare = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function extractNumbers(str) {
    return str.replace(/[^0-9.]+/g, "");
  }

  const CompareCard = ({ item, ind }) => {
    const [err, setErr] = useState(false);
    return (
      !err && (
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
                onError={() => setErr(true)}
                className="  top-0 w-full absolute blur-sm opacity-60 -z-10 object-contain mb-2 rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
              <img
                src={item.images[0]}
                height="1000"
                width="1000"
                onError={() => setErr(true)}
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
              className="text-neutral-500 text-sm max-w-sm mb-2 dark:text-neutral-300 line-clamp-1"
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
                  Rs {Math.floor(item.prices[0].price) || item.prices[0].price}{" "}
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
                  handleScrollToCompare();
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
      )
    );
  };
  return (
    <>
      {coupons.deals ? (
        <div className=" fixed z-30 bottom-10 right-5 flex flex-col gap-2 justify-end items-end">
          <div
            className={`flex flex-col gap-2 w-full items-center overflow-y-scroll max-h-[50vh] ${
              showCoupons ? " scale-y-100" : "scale-y-0"
            } origin-bottom-right transition-all md:w-[40vw] md:max-h[60vh] p-5 rounded-xl bg-black`}
          >
            {coupons.deals.map((deal, ind) => {
              return (
                <div
                  key={ind}
                  className=" flex flex-row justify-between items-center gap-2 w-full py-2 px-4 rounded-xl border border-black bg-gradient from-zinc-900 to-black"
                >
                  <h1 className=" text-xl   font-bold">
                    {deal.discount_percent}%
                  </h1>
                  <h2 className=" text-md w-full font-medium">
                    {deal.description}
                  </h2>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              setShowCoupons(!showCoupons);
            }}
            className="rounded-full w-fit aspect-square p-2 bg-zinc-900 border border-slate-50"
          >
            <h2 className=" text-lg font-semibold">Coupons</h2>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="px-10 max-sm:px-4">
        <Link href="/search">
          <div className="rounded-full border items-center flex bg-black shadow-md px-2 py-1 mt-2 text-sm w-fit">
            <img src="/back.png" alt="" className="mr-1" /> Search
          </div>
        </Link>
        <div className="mt-4">
          <h1
            id="compare"
            className="text-4xl max-sm:text-2xl font-bold text-zinc-500 dark:text-zinc-200"
          >
            Products Comparison:
          </h1>
          <p className="text-zinc-500 mt-2 mb-4 dark:text-zinc-400">
            Compare Products across websites{" "}
          </p>
        </div>
        {
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 `}>
            <div
              className={` w-full my-2 flex-col rounded-xl bg-gradient-to-b transition-all delay-500 duration-700 from-zinc-900 border border-opacity-45 to-black h-fit ${
                bigger === 1
                  ? "fancy border-[#F3FF74] scale-[102%]"
                  : "scale-[98%]"
              }`}
            >
              {product._id ? (
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
                    <div className="text-zinc-500 text-sm max-w-sm mb-4 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </div>
                    <div className="text-2xl font-bold text-zinc-500 dark:text-zinc-200 ">
                      {product.prices && (
                        <>
                          <span>
                            Rs{" "}
                            {Math.floor(
                              parseFloat(
                                extractNumbers(product.prices[0].price)
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
              ) : (
                <Loading></Loading>
              )}

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
              <div className={`grid grid-cols-1 gap-4 w-full `}>
                <div
                  className={` w-full my-2 flex-col rounded-xl bg-gradient-to-b transition-all delay-500 duration-700 from-zinc-900 border border-opacity-45 to-black h-fit ${
                    bigger === 0
                      ? "fancy border-[#F3FF74] scale-[102%]"
                      : "scale-[98%]"
                  }`}
                >
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
                      <div className="text-zinc-500 text-sm max-w-sm mb-6 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                        {item.description}
                      </div>
                      <div className="text-2xl font-bold text-zinc-500 dark:text-zinc-200 ">
                        {item.prices && (
                          <>
                            <span>
                              Rs{" "}
                              {Math.floor(
                                parseFloat(extractNumbers(item.prices[0].price))
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
                          data={chartData2}
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
                className="w-full my-2 scale-[98%] p-4 rounded-xl border border-gray-100/30 bg-black hover:bg-zinc-900 h-full flex-grow flex justify-center items-center cursor-pointer"
              >
                <div className="mx-auto text-center flex">
                  {" "}
                  <img src="/compare.png" alt="" className="mr-2 invert" /> Add
                  to compare
                </div>
              </button>
            )}
          </div>
        }
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
                <CompareCard key={ind} ind={ind} item={item} />
              ))
            )}
          </div>
        </div>
        <div className=" flex w-full flex-col gap-4">
          <div className=" w-full py-4">
            <h1 className=" text-2xl font-bold ">Chat Forum</h1>
          </div>
          <div className=" flex flex-col gap-2">
            <div className="h-[70vh] rounded-xl border border-[#f3ff7442] overflow-hidden px-2 bg-gradient-to-b from-zinc-900 to-black mb-20 overflow-y-scroll">
              <div className=" flex flex-row justify-between w-full px-4 mt-4 py-2 bg-transparent mb-4">
                <input
                  className=" text-md px-4 w-full font-semibold py-2 rounded-full mr-2 text-white bg-black"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  type="text"
                  placeholder="Type your message here..."
                ></input>
                <button
                  onClick={() => {
                    sendMsg();
                  }}
                  className=" w-fit px-4 py-2 flex text-md rounded-full border bg-black"
                >
                  <span className="max-sm:hidden">Send</span>{" "}
                  <img src="/send.png" className="ml-2 max-md:ml-0" alt="" />
                </button>
              </div>
              {messages.map((message) => {
                return (
                  <div className=" flex flex-col px-4 py-2 bg-gradient-to-b from-zinc-900 to-black mb-4 border mx-2 rounded-md">
                    <div className=" flex flex-row w-full py-1 justify-between items-center text-white">
                      <h3 className=" text-md font-regular text-zinc-400">
                        User{Math.floor(Math.random() * 1000)}
                      </h3>
                      <h4 className=" text-sm font-bold text-zinc-500">
                        {new Date(message.createdAt).toISOString()}
                      </h4>
                    </div>
                    <h2 className=" text-lg font-medium text-white">
                      {message.text}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
