import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import Customer from "../../components/customer";
import ProductDetail from "../../components/productDetail";
import NeedHelp from "../../components/needHelp";
import { useRouter } from "next/router";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import NumberFormat from "react-number-format";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  RiHeartFill,
  RiShareLine,
  RiErrorWarningLine,
  RiChat1Line,
  RiCustomerService2Fill,
  RiSubtractFill,
  RiAddFill,
  RiArrowRightLine,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";

SwiperCore.use([Autoplay, Navigation]);

const products = {
  id: 2,
  images: ["item_watch-1.png", "item_watch-2.png", "item_watch-3.png"],
  title: "Omega De Ville Trésor",
  style: "OMEGA",
  description:
    "OMEGA has a long tradition of creating beautiful watches for women. In this contemporary collection, each watch has been crafted with a pure design and a truly modern edge.",
  price: 4400,
};
const customerSlider = [
  {
    name: "Ayesha",
    location: "Amsterdam, Netherlands",
    coverImage: "item_watch-1.png",
    customerImage: "customer-1.png",
    description:
      "Finding jewelry that just finishes your outfit.. Isn't that a great feeling? 😍 At Royal Coster Diamonds we have an extensive collection of (diamond) jewelry. If you'd rather choose the diamond and setting yourself, that's also possible.",
  },
  {
    name: "costerdiamondsofficial",
    location: "Amsterdam, Netherlands",
    coverImage: "item_watch-2.png",
    customerImage: "customer-2.png",
    description:
      "This 2 carat Royal 201 diamond ring is a must for everyone 😍 Tag the person who you think should have this ring!⁠",
  },
  {
    name: "Ayesha",
    location: "Amsterdam, Netherlands",
    coverImage: "item_watch-3.png",
    customerImage: "customer-1.png",
    description:
      "Finding jewelry that just finishes your outfit.. Isn't that a great feeling? 😍 At Royal Coster Diamonds we have an extensive collection of (diamond) jewelry. If you'd rather choose the diamond and setting yourself, that's also possible.",
  },
];

const informations = [
  { name: "Shape", value: "ROUND" },
  { name: "sYMMETRY", value: "vERY gOOD" },
  { name: "CARAT", value: "1.00" },
  { name: "fLUORESCENCE", value: "nONE" },
  { name: "COLOR", value: "H" },
  { name: "l/w( (MM)", value: "6.31X6.36" },
  { name: "CLARITY", value: "SI1" },
  { name: "l/w rATIO", value: "1.01" },
  { name: "CUT", value: "EXCELLENT" },
  { name: "cERTIFICATE", value: "igi" },
  { name: "POLISH", value: "EXCELLET" },
];
const productID = "SKU 10872957";
const productDescription =
  "This beautiful tapered engagement ring design is channel-set with eight round shaped diamonds. A setting designed to draw the eye to the center diamond or gemstone of your choice. Pair it with the matching wedding band for a contoured look.";

export default function ProductWatch() {
  const [size, setSize] = useState(0);
  const [favorItem, setFavorItem] = useState();
  const [accessToken, setAccessToken] = useState();
  const [itemAmount, setItemAmount] = useState(1);
  const [itemPrice, setItemPrice] = useState();
  const [mainImage, setMainImage] = useState(products.images[0]);
  const router = useRouter();

  const showProduct = (product) => {
    setMainImage(product);
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
      setItemPrice(products.price);
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  const addCart = (e) => {
    e.preventDefault();
    router.push("/cart");
    if (localStorage.products) {
      let productStore = JSON.parse(localStorage.products);
      let setItem = productStore.find((item, index) => item.id == products.id);
      if (setItem) {
        setItem.amount += itemAmount;
        localStorage.setItem("products", JSON.stringify(productStore));
      } else {
        localStorage.setItem(
          "products",
          JSON.stringify([
            ...productStore,
            {
              ...products,
              amount: itemAmount,
            },
          ])
        );
      }
    } else {
      localStorage.setItem(
        "products",
        JSON.stringify([
          {
            ...products,
            amount: itemAmount,
          },
        ])
      );
    }
  };
  return (
    <div className="productWatch_page" id="productPage">
      <Head>
        <title>ProductWatch | Royal Coster</title>
      </Head>
      <Header />

      {/* Start state section */}
      <div className="state-section">
        <div className="link-panel  r-container py-3 d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          /
          <Link passHref={true} href="/shop">
            <a className="mx-2">ENGAGEMENT RINGS</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            CHOOSE A SETTING
          </span>
        </div>
      </div>
      {/* End state section */}

      {/* Start confirm section */}
      <div className="confirm-section py-5 mb-5 row r-container">
        <div className="show-product col-md-6 col-12 p-0 pt-5 pe-5">
          <div className="row m-0">
            <div className="tile-product col-2 p-0 pe-3">
              {products.images.map((item, index) => {
                return (
                  <button
                    className="btn btn-show-product mb-3 p-0 round-form"
                    key={index}
                    onClick={() => showProduct(item)}
                  >
                    <img src={"/img/product/" + item} alt="product-image" />
                  </button>
                );
              })}
            </div>
            <div className="main-product col-10 p-0">
              <div className="image-panel round mb-4">
                <div className="image-box">
                  <img src={"/img/product/" + mainImage} alt="main-image" />
                </div>
              </div>
              <div className="btn-panel d-flex align-items-center justify-content-between">
                <button className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center">
                  <RiShareLine className="me-2" />
                  share
                </button>
                <button
                  className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#dropHint"
                >
                  drop a hint
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="show-setting col-md-6 col-12 p-0 pt-5 ps-5">
          <div className="title-panel">
            <h3 className="type pb-4 m-0">{products.style}</h3>
            <h3 className="title text-capitalize pb-4 m-0">{products.title}</h3>
            <p className="description pb-4 m-0">{products.description}</p>
          </div>
          <div className="confirm-panel">
            <div className="cost-panel d-flex justify-content-between align-items-center py-5">
              <div className="price-panel">
                <h4 className="text-uppercase">total</h4>
                <h3 className="blue-text">
                  <NumberFormat
                    value={itemPrice * itemAmount}
                    displayType="text"
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    prefix="€ "
                  />
                </h3>
              </div>
              <div className="amount-panel d-flex align-items-center">
                <button
                  className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-4"
                  onClick={() =>
                    itemAmount > 1 && setItemAmount(itemAmount - 1)
                  }
                >
                  <RiSubtractFill />
                </button>
                <span className="mx-4">{itemAmount}</span>
                <button
                  className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-4"
                  onClick={() => setItemAmount(itemAmount + 1)}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <div className="confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-5">
              {accessToken && (
                <button
                  className={
                    "btn favor-btn round-form d-flex align-items-center justify-content-center p-4 me-3 " +
                    favorItem
                  }
                  onClick={() =>
                    favorItem ? setFavorItem() : setFavorItem("favor")
                  }
                >
                  <RiHeartFill />
                </button>
              )}
              <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                <button
                  className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4"
                  onClick={addCart}
                >
                  add to cart
                </button>
                <p className="m-0">Price excludes VAT</p>
              </div>
            </div>
            <div className="help-panel d-flex justify-content-between py-4">
              <p className="text-uppercase m-0">Need help?</p>
              <div className="link-panel d-flex">
                <Link passHref={true} href="/contact">
                  <a className="text-uppercase me-4 d-flex align-items-center blue-text">
                    <RiCustomerService2Fill className="me-2" />
                    contact
                  </a>
                </Link>

                <Link passHref={true} href="#">
                  <a className="text-uppercase d-flex align-items-center blue-text">
                    <RiChat1Line className="me-2" />
                    chat
                  </a>
                </Link>
              </div>
            </div>
            <div className="schedule-panel d-flex align-items-center justify-content-between flex-wrap py-4">
              <p className="m-0 text-uppercase">
                Not ready to purchase online?
              </p>
              <button className="btn btn-schedule text-uppercase blue-text my-3 px-5 py-2">
                Schedule an appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End confirm section */}

      {/* Start product detail section */}
      <ProductDetail
        informations={informations}
        productID={productID}
        productDescription={productDescription}
      />
      {/* End product detail section */}

      {/* Start customer section */}
      <Customer customerSlider={customerSlider} />
      {/* End customer section */}

      {/* Start help section */}
      <NeedHelp />
      {/* End help section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
