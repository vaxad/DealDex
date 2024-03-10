"use client";
import React, { useEffect, useState } from "react";
import data from "../../utils/data2.json";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Loading from "../components/Loading";
import Link from "next/link";
import Dictaphone from "../components/Dictaphone";
import * as L from "leaflet";

const page = () => {
  const dummyData = [
      {
          "address": "Ground Floor, NIKE, Hansa Plaza, 798, Rd Number 36, CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033",
          "categories": [
              "Sportswear store",
              "Clothing store",
              "Shoe store",
              "Sporting goods store"
          ],
          "latitude": 17.43402,
          "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3bcb91460b99e1bf:0x3f62a09ce6ea8761!8m2!3d17.43402!4d78.4038726!16s%2Fg%2F1tksltjt!19sChIJv-GZC0aRyzsRYYfq5pygYj8?authuser=0&hl=en&rclk=1",
          "longitude": 78.4038726,
          "main_category": "Sportswear store",
          "name": "NIKE",
          "place_id": "ChIJv-GZC0aRyzsRYYfq5pygYj8",
          "rating": 4.2,
          "reviews": 411
      },
      {
          "address": "No 6, 3, NIKE, Cupid Curve Apartment, 344/A/4 to 6, GF, Rd Number 1, opposite Vengal Rao Park, Banjara Hills, Hyderabad, Telangana 500034",
          "categories": [
              "Sportswear store",
              "Clothing store",
              "Men's clothing store",
              "Shoe store"
          ],
          "latitude": 17.4222945,
          "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3bcb9735ad7ee649:0xb5d8dffc19da5c3f!8m2!3d17.4222945!4d78.4496912!16s%2Fg%2F11b8z9kk8z!19sChIJSeZ-rTWXyzsRP1zaGfzf2LU?authuser=0&hl=en&rclk=1",
          "longitude": 78.4496912,
          "main_category": "Sportswear store",
          "name": "NIKE",
          "place_id": "ChIJSeZ-rTWXyzsRP1zaGfzf2LU",
          "rating": 3.9,
          "reviews": 269
      },
      {
          "address": "Nike, GF, Shop No. 07, Magneto Mall, National Highway 6, Great Eastern Rd, Labhandih, Chhattisgarh 492001",
          "categories": [
              "Sportswear store",
              "Shoe store",
              "Western apparel store"
          ],
          "latitude": 21.2408131,
          "link": "https://www.google.com/maps/place/Nike/data=!4m7!3m6!1s0x3a28dd36c0dda529:0xef54eccd79d2acee!8m2!3d21.2408131!4d81.6840693!16s%2Fg%2F119whllcf!19sChIJKaXdwDbdKDoR7qzSec3sVO8?authuser=0&hl=en&rclk=1",
          "longitude": 81.6840693,
          "main_category": "Sportswear store",
          "name": "Nike",
          "place_id": "ChIJKaXdwDbdKDoR7qzSec3sVO8",
          "rating": 3.7,
          "reviews": 143
      },
      {
          "address": "Shop 11 & 12, NIKE, Shop No.11 & 12, Ground Floor, New City Center Mall Devendra Nagar, Bus Stand Rd, Pandri, Raipur, Chhattisgarh 492001",
          "categories": [
              "Sportswear store"
          ],
          "latitude": 21.2551093,
          "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3a28dd9d38f21b51:0xa0f401bf5e8efe23!8m2!3d21.2551093!4d81.6462555!16s%2Fg%2F11b7rxgttz!19sChIJURvyOJ3dKDoRI_6OXr8B9KA?authuser=0&hl=en&rclk=1",
          "longitude": 81.6462555,
          "main_category": "Sportswear store",
          "name": "NIKE",
          "place_id": "ChIJURvyOJ3dKDoRI_6OXr8B9KA",
          "rating": 3.6,
          "reviews": 65
      },
      {
          "address": "Shop No 13, NIKE, 1st Floor, 14, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500082",
          "categories": [
              "Sportswear store"
          ],
          "latitude": 17.419384,
          "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3bcb97369865d87f:0x3cdba6987f938750!8m2!3d17.419384!4d78.448262!16s%2Fg%2F1tdbjft1!19sChIJf9hlmDaXyzsRUIeTf5im2zw?authuser=0&hl=en&rclk=1",
          "longitude": 78.448262,
          "main_category": "Sportswear store",
          "name": "NIKE",
          "place_id": "ChIJf9hlmDaXyzsRUIeTf5im2zw",
          "rating": 3.7,
          "reviews": 28
      }
  ]
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchData, setSearchData] = React.useState([
    {
        "address": "Ground Floor, NIKE, Hansa Plaza, 798, Rd Number 36, CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033",
        "categories": [
            "Sportswear store",
            "Clothing store",
            "Shoe store",
            "Sporting goods store"
        ],
        "latitude": 17.43402,
        "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3bcb91460b99e1bf:0x3f62a09ce6ea8761!8m2!3d17.43402!4d78.4038726!16s%2Fg%2F1tksltjt!19sChIJv-GZC0aRyzsRYYfq5pygYj8?authuser=0&hl=en&rclk=1",
        "longitude": 78.4038726,
        "main_category": "Sportswear store",
        "name": "NIKE",
        "place_id": "ChIJv-GZC0aRyzsRYYfq5pygYj8",
        "rating": 4.2,
        "reviews": 411
    },
    {
        "address": "No 6, 3, NIKE, Cupid Curve Apartment, 344/A/4 to 6, GF, Rd Number 1, opposite Vengal Rao Park, Banjara Hills, Hyderabad, Telangana 500034",
        "categories": [
            "Sportswear store",
            "Clothing store",
            "Men's clothing store",
            "Shoe store"
        ],
        "latitude": 17.4222945,
        "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3bcb9735ad7ee649:0xb5d8dffc19da5c3f!8m2!3d17.4222945!4d78.4496912!16s%2Fg%2F11b8z9kk8z!19sChIJSeZ-rTWXyzsRP1zaGfzf2LU?authuser=0&hl=en&rclk=1",
        "longitude": 78.4496912,
        "main_category": "Sportswear store",
        "name": "NIKE",
        "place_id": "ChIJSeZ-rTWXyzsRP1zaGfzf2LU",
        "rating": 3.9,
        "reviews": 269
    },
    {
        "address": "Nike, GF, Shop No. 07, Magneto Mall, National Highway 6, Great Eastern Rd, Labhandih, Chhattisgarh 492001",
        "categories": [
            "Sportswear store",
            "Shoe store",
            "Western apparel store"
        ],
        "latitude": 21.2408131,
        "link": "https://www.google.com/maps/place/Nike/data=!4m7!3m6!1s0x3a28dd36c0dda529:0xef54eccd79d2acee!8m2!3d21.2408131!4d81.6840693!16s%2Fg%2F119whllcf!19sChIJKaXdwDbdKDoR7qzSec3sVO8?authuser=0&hl=en&rclk=1",
        "longitude": 81.6840693,
        "main_category": "Sportswear store",
        "name": "Nike",
        "place_id": "ChIJKaXdwDbdKDoR7qzSec3sVO8",
        "rating": 3.7,
        "reviews": 143
    },
    {
        "address": "Shop 11 & 12, NIKE, Shop No.11 & 12, Ground Floor, New City Center Mall Devendra Nagar, Bus Stand Rd, Pandri, Raipur, Chhattisgarh 492001",
        "categories": [
            "Sportswear store"
        ],
        "latitude": 21.2551093,
        "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3a28dd9d38f21b51:0xa0f401bf5e8efe23!8m2!3d21.2551093!4d81.6462555!16s%2Fg%2F11b7rxgttz!19sChIJURvyOJ3dKDoRI_6OXr8B9KA?authuser=0&hl=en&rclk=1",
        "longitude": 81.6462555,
        "main_category": "Sportswear store",
        "name": "NIKE",
        "place_id": "ChIJURvyOJ3dKDoRI_6OXr8B9KA",
        "rating": 3.6,
        "reviews": 65
    },
    {
        "address": "Shop No 13, NIKE, 1st Floor, 14, Balapur Basthi, Banjara Hills, Hyderabad, Telangana 500082",
        "categories": [
            "Sportswear store"
        ],
        "latitude": 17.419384,
        "link": "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3bcb97369865d87f:0x3cdba6987f938750!8m2!3d17.419384!4d78.448262!16s%2Fg%2F1tdbjft1!19sChIJf9hlmDaXyzsRUIeTf5im2zw?authuser=0&hl=en&rclk=1",
        "longitude": 78.448262,
        "main_category": "Sportswear store",
        "name": "NIKE",
        "place_id": "ChIJf9hlmDaXyzsRUIeTf5im2zw",
        "rating": 3.7,
        "reviews": 28
    }
]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const flask = process.env.NEXT_PUBLIC_FLASK_URL;
  const getData = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("query", search + " near vile parle, Mumbai");
    console.log(form);
    const res = await fetch(
      `https://4scjblv6-5000.inc1.devtunnels.ms/api/places`,
      {
        method: "POST",
        body: form,
      }
    );
    const data = await res.json();
    console.log(data);
    setSearchData(data);
    setLoading(false);
  };

  const getUserLocation = () => {
    if (window)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //26.949792 75.712954
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            // setLatitude(26.09134);
            // setLongitude(74.52432);
          },
          (err) => {
            alert(err.message);
            router.push("/");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
        router.push("/");
      }
  };

  useEffect(() => {
    // getData();
    getUserLocation();
  }, []);

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    await getData();
  };

  useEffect(() => {
    console.log(latitude, longitude);
  }, [latitude, longitude]);

  const setMap = (stations) => {
    var container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    // //.log("hello")
    var map = L.map("map").setView(
      [searchData[0].latitude, searchData[0].longitude],
      50
    );
    // Create an array to store the markers
    var markers = [];

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    // Loop through the coordinates array
    for (var i = 0; i < searchData.length; i++) {
      var coordinate = [searchData[i].latitude, searchData[i].longitude];

      // Create a marker for each coordinate
      var marker = L.marker(coordinate).addTo(map);
      markers.push(marker);

      // Add a popup to each marker with coordinate information
        marker.bindPopup(searchData[i].address);
    }
    var customIcon2 = L.icon({
      iconUrl: "/location.png",
      iconSize: [32, 32], // set the size of the icon
      iconAnchor: [16, 32], // set the anchor point
      popupAnchor: [0, -32], // set the popup anchor
    });
    // const latitude = 21.170240     //temp
    // const longitude = 72.831062    //temp
    var marker = L.marker([latitude, longitude], { icon: customIcon2 })
      .addTo(map)
      .bindPopup("You are here");
    markers.push(marker);
    try {
      // Create a feature group from the array of markers
      var markerGroup = L.featureGroup(markers);
      // Fit the map to the bounds of the marker group
      map.fitBounds(markerGroup.getBounds());
    } catch (e) {
      //.log(e)
    }
  };

  useEffect(() => {
    if (searchData.length > 0 && latitude) {
      var container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }
      setMap();
    }
  }, [searchData, latitude]);
  return (
    <>
      <div className="px-10 max-sm:px-4">
        <Link href="/">
          <div className="rounded-full border items-center flex bg-black shadow-md px-2 py-1 mt-2 text-sm w-fit">
            <img src="/back.png" alt="" className="mr-1" /> Home
          </div>
        </Link>
        <div className="mt-2">
          <h1 className="text-6xl max-sm:text-5xl font-bold text-zinc-500 dark:text-zinc-200">
            Search
          </h1>
          <p className="text-zinc-500 mt-2 dark:text-zinc-400">
            Search for the products you want to compare
          </p>
          <div className=" flex flex-row gap-4 items-center">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className=" relative w-max flex  mt-6 gap-2"
            >
              <input
                type="search"
                name=""
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            </form>
            <Dictaphone
              className="items-center"
              setDesc={setSearch}
              setLang={() => console.log("jii")}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col w-full">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className=" flex w-full justify-center items-center">
                {searchData.length > 0 && (
                  <div
                    id="map"
                    className=" z-10 w-full rounded-xl my-8"
                    style={{ height: "50vh" }}
                  ></div>
                )}
              </div>
              <div className=" grid grid-cols-2 w-full gap-2 py-8">
              {searchData.map((maps) => {
                return (
                  <CardContainer className="w-full flex justify-center items-center rounded-xl border border-slate-50">
                    <CardItem className=" flex w-full ">
                      <CardBody className="flex flex-row w-full gap-2 ">
                        <div className="px-4">
                          <h1 className="text-2xl font-bold p-4">
                            Name: {maps.name}
                          </h1>
                          <p className="text-lg text-gray-400 font-medium py-2">
                            <span className="text-gray-50"> Address: </span>
                            {maps.address.length > 70?maps.address.slice(0,70)+"...":maps.address}
                          </p>
                        </div>
                        <div className="px-2">
                          <p className="text-lg text-gray-400 font-medium py-2">
                            <span className="text-gray-50"> Categories:</span>{" "}
                            {maps.categories}
                          </p>
                          <p className="text-lg text-gray-400 font-medium py-2">
                            <span className="text-gray-50"> Ratings:</span>{" "}
                            {maps.rating}
                          </p>
                          <p className="text-lg text-gray-400 font-medium py-2">
                            <span className="text-gray-50"> Reviews: </span>{" "}
                            {maps.reviews}
                          </p>
                        </div>
                        <a className=" flex h-full" href={maps.link} target="_blank" rel="noreferrer">
                          <button className="bg-black flex flex-grow justify-center items-center text-white px-8 py-2 rounded-r-lg">
                            View on map
                          </button>
                        </a>
                      </CardBody>
                    </CardItem>
                  </CardContainer>
                );
              })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
