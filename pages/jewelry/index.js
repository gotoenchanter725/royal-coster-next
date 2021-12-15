import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Collection from "../../components/collection";
import Schedule from "../../components/schedule";
import Footer from "../../components/footer";
import SelectSearch, { fuzzySearch } from "react-select-search-nextjs";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";

const options = [
  { name: "ALL", value: "ALL" },
  { name: "POPULAR", value: "POPULAR" },
];
const options1 = [
  { name: "ALL", value: "ALL" },
  { name: "JEWELRY", value: "JEWELRY" },
];
const options2 = [
  { name: "ALL", value: "ALL" },
  { name: "PRICE", value: "PRICE" },
];
const options3 = [
  { name: "ALL", value: "ALL" },
  { name: "PEARL", value: "PEARL" },
];
const options4 = [
  { name: "ALL", value: "ALL" },
  { name: "BIRTHSTONE", value: "BIRTHSTONE" },
];
const options5 = [
  { name: "ALL", value: "ALL" },
  { name: "METAL", value: "METAL" },
];
const options6 = [
  { name: "ALL", value: "ALL" },
  { name: "STONES", value: "STONES" },
];
const productItems = [
  {
    img: "product(1).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(2).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(4).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(5).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(1).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(2).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "ads_image.png",
  },
  {
    img: "product(5).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(1).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(2).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    hoverImg: "hoverImage.png",
    cost: "$2500",
    url: "#",
  },
];

export default function Jewelry() {
  const [products, setProducts] = useState(productItems);
  const [result, setResult] = useState(73);
  const [selectValue, setSelectValue] = useState("POPULAR");
  const [selectValue1, setSelectValue1] = useState("JEWELRY");
  const [selectValue2, setSelectValue2] = useState("PRICE");
  const [selectValue3, setSelectValue3] = useState("PEARL");
  const [accessToken, setAccessToken] = useState();
  const [selectValue4, setSelectValue4] = useState("BIRTHSTONE");
  const [selectValue5, setSelectValue5] = useState("METAL");
  const [selectValue6, setSelectValue6] = useState("STONES");

  useEffect(() => {
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  const setFavor = (event) => {
    event.target.closest(".favor-icon").classList.toggle("favor");
  };

  return (
    <div className="jewelry_page">
      <Head>
        <title>Jewelry | Royal Coster</title>
      </Head>
      {/* Header */}
      <Header />
      {/* Start hero section*/}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title">All Jewelry</h1>
        </div>
      </div>
      {/* End hero section*/}
      {/* Start jewelry section */}
      <div className="jewelry-section r-container pt-4 pb-5 mt-5">
        <div className="top-bar row align-items-center m-0 py-3">
          <div className="title-panel col-md-6 col-12 p-0 pb-md-0 pb-3">
            <h2>Jewelry</h2>
            <p className="text-uppercase">{result} results</p>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end p-0 pt-3 pt-md-0">
            <div className="search-box round-form d-flex align-items-center">
              <label htmlFor="selectSearch" className="px-4">
                SORT BY :{" "}
              </label>
              <SelectSearch
                id="selectSearch"
                options={options}
                value={selectValue}
                onChange={(value) => {
                  setSelectValue(value);
                }}
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                search
              />
            </div>
          </div>
        </div>
        <div className="filter-bar row align-items-center justify-content-between m-0 py-3">
          <SelectSearch
            id="firstFilter"
            options={options1}
            value={selectValue1}
            onChange={(value) => {
              setSelectValue1(value);
            }}
            filterOptions={fuzzySearch}
            emptyMessage="Not found"
            search
          />
          <SelectSearch
            id="secondFilter"
            options={options2}
            value={selectValue2}
            onChange={(value) => {
              setSelectValue2(value);
            }}
            filterOptions={fuzzySearch}
            emptyMessage="Not found"
            search
          />
          <SelectSearch
            id="thirdFilter"
            options={options3}
            value={selectValue3}
            onChange={(value) => {
              setSelectValue3(value);
            }}
            filterOptions={fuzzySearch}
            emptyMessage="Not found"
            search
          />
          <SelectSearch
            id="forthFilter"
            options={options4}
            value={selectValue4}
            onChange={(value) => {
              setSelectValue4(value);
            }}
            filterOptions={fuzzySearch}
            emptyMessage="Not found"
            search
          />
          <SelectSearch
            id="fifthFilter"
            options={options5}
            value={selectValue5}
            onChange={(value) => {
              setSelectValue5(value);
            }}
            filterOptions={fuzzySearch}
            emptyMessage="Not found"
            search
          />
          <SelectSearch
            id="sixthFilter"
            options={options6}
            value={selectValue6}
            onChange={(value) => {
              setSelectValue6(value);
            }}
            filterOptions={fuzzySearch}
            emptyMessage="Not found"
            search
          />
        </div>
        <div className="product-panel py-5 mb-5">
          {products.map((item, index) => {
            if (item.url)
              return (
                <div className="product-item" key={index}>
                  <Link passHref={true} href={item.url}>
                    <a>
                      <div className="product-image d-flex justify-content-center align-items-center round">
                        <img
                          src={"/img/jewelry/" + item.img}
                          alt="product-image"
                        />
                      </div>
                      <h3 className="text-uppercase blue-text py-4 m-0">
                        {item.title}
                      </h3>
                      <p className="pb-4 text-uppercase m-0">
                        {item.categories.map((category, key) => {
                          return (
                            <span key={key} className="me-2">
                              {category}
                            </span>
                          );
                        })}
                      </p>
                      <h4 className="blue-text">{item.cost}</h4>
                    </a>
                  </Link>
                  {accessToken && (
                    <div className="favor-icon " onClick={setFavor}>
                      <RiHeartLine className="unfavor" />
                      <RiHeartFill className="favor" />
                    </div>
                  )}
                </div>
              );
            else
              return (
                <div className="image-panel round" key={index}>
                  <img src={"/img/jewelry/" + item.img} />
                </div>
              );
          })}
        </div>
      </div>
      {/* End jewelry section */}
      {/* Collection */}
      <div className="collection-section">
        <Collection />
      </div>
      {/* Schedule */}
      <Schedule />
      {/* Footer */}
      <Footer />
    </div>
  );
}
