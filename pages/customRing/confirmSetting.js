import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NeedHelp from "../../components/needHelp";
import { useRouter } from "next/router";
import {
  RiHeartFill,
  RiShareLine,
  RiErrorWarningLine,
  RiChat1Line,
  RiCustomerService2Fill,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";

const options = [
  { name: "ALL", value: "ALL" },
  { name: "POPULAR", value: "POPULAR" },
];

const products = ["product-1.png", "product(1).png", "product(2).png"];
const karat = [
  { title: "14K SILVER", color: "white" },
  { title: "18K SILVER", color: "white" },
  { title: "14K GOLD", color: "yellow" },
  { title: "18K GOLD", color: "yellow" },
  { title: "PLATINIUM", color: "platinium" },
  { title: "ROSE GOLD", color: "rose-gold" },
];
const sizeList = [
  { size: 5 },
  { size: 6 },
  { size: 7 },
  { size: 8 },
  { size: 9 },
];

export default function ConformSetting() {
  const [result, setResult] = useState("878");
  const [selectValue, setSelectValue] = useState("POPULAR");
  const [mainImage, setMainImage] = useState(products[0]);
  const [color, setColor] = useState("white");
  const [favorItem, setFavorItem] = useState();
  const [accessToken, setAccessToken] = useState();
  const router = useRouter();

  const showProduct = (product) => {
    setMainImage(product);
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  return (
    <div className="confirmSetting_page">
      <Head>
        <title>chooseSetting | Royal Coster</title>
      </Head>
      <Header />
      {/* Start state section */}
      <div className="state-section">
        <div className="link-panel r-container py-3 d-sm-flex d-none align-items-center">
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
          <Link passHref={true} href="#">
            <a className="mx-2">MAKE A RING</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            CHOOSE A SETTING
          </span>
        </div>
        <div className="link-panel r-container py-3 mb-md-5 mb-0 d-sm-none d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          ...
          <Link passHref={true} href="#">
            <a className="mx-2">MAKE A RING</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            confirm A SETTING
          </span>
        </div>
        <div className="setting-state-panel">
          <div className="r-container  py-md-3  row">
            <div className="pe-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center active">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  1
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Setting</h3>
                </div>
              </div>
              <img
                className="d-md-block d-none"
                src="/img/customRing/chooseSetting/choose.png"
                width="52"
                height="52"
                alt="state-image"
              />
            </div>
            <div className="px-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  2
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Diamond</h3>
                </div>
              </div>
              <img
                className="d-md-block d-none"
                src="/img/customRing/chooseSetting/diamond.png"
                width="52"
                height="52"
                alt="state-image"
              />
            </div>
            <div className="ps-5 py-md-0 py-5 my-md-5 my-0 col-4 setting-state d-flex justify-content-between align-items-center">
              <div className="text-panel d-flex align-items-center">
                <div className="number me-3 d-flex justify-content-center align-items-center">
                  3
                </div>
                <div className="title text-uppercase">
                  <p className="mb-1 d-md-block d-none">Choose a</p>
                  <h3 className="m-0">Ring</h3>
                </div>
              </div>
              <img
                className="d-md-block d-none"
                src="/img/customRing/chooseSetting/complete.png"
                width="52"
                height="52"
                alt="state-image"
              />
            </div>
          </div>
        </div>
      </div>
      {/* End state section */}
      {/* Start confirm section */}
      <div className="confirm-section py-5 mb-5 row r-container">
        <div className="show-product col-md-6 col-12 p-0 pt-5 pe-md-5">
          <div className="row m-0">
            <div className="tile-product col-md-2 col-12 order-md-first order-last p-0 pe-md-3 d-md-block d-flex">
              {products.map((item, index) => {
                return (
                  <button
                    className="btn btn-show-product col-md-12 col-2 mb-3 me-md-0 me-4 p-0 round-form"
                    key={index}
                    onClick={() => showProduct(item)}
                  >
                    <img
                      src={"/img/customRing/confirmSetting/" + item}
                      alt="product-image"
                    />
                  </button>
                );
              })}
            </div>
            <div className="main-product col-md-10 p-0">
              <div className="image-panel round mb-4">
                <img
                  src={"/img/customRing/confirmSetting/" + mainImage}
                  alt="main-image"
                />
              </div>
              <div className="btn-panel d-md-flex d-none align-items-center justify-content-between">
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
        <div className="show-setting col-md-6 col-12 p-0 pt-5 ps-md-5 ps-0">
          <div className="title-panel">
            <h3 className="title pb-4 m-0">Solitaire</h3>
            <h3 className="description text-capitalize pb-4 m-0">
              18K White Gold 2mm Knife Edge Solitaire Engagement Ring
            </h3>
            <p className="product-id pb-4 m-0">SKU 1219W14</p>
            <h3 className="cost pb-5 m-0">€ 645.00</h3>
          </div>
          <div className="confirm-panel">
            <div className="selector-panel row m-0 py-4">
              <div className="select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0">
                <label
                  htmlFor="selectKarat"
                  className="d-flex align-items-center pb-4 text-uppercase"
                >
                  Metal : white Gold 18k
                  <RiErrorWarningLine className="ms-2" />
                </label>
                <div className="select-box">
                  <div className={"state-circle " + color}></div>
                  <select
                    className="form-select blue-text ps-5 round-form py-3"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setColor(karat[e.target.value].color);
                    }}
                  >
                    {karat.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="select-size col-lg-6 col-md-12 col-sm-6 col-12 pt-sm-0 pt-4 p-0 ps-lg-3 ps-md-0 ps-md-3 ps-0">
                <label
                  htmlFor="selectKarat"
                  className="d-flex align-items-center pb-4 text-uppercase"
                >
                  Size
                  <RiErrorWarningLine className="ms-2" />
                </label>
                <select
                  className="form-select blue-text ps-4 round-form py-3"
                  aria-label="Default select example"
                >
                  {sizeList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.size}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-4">
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
              <div className="setting-btn-panel text-end">
                <Link passHref={true} href="/customRing/chooseSetting">
                  <a className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4">
                    select this setting
                  </a>
                </Link>
                <p className="m-0">
                  Price is for setting only, Price includes VAT
                </p>
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
            <div className="schedule-panel d-md-flex d-none align-items-center justify-content-between flex-wrap py-4">
              <p className="m-0 text-uppercase">
                Not ready to purchase online?
              </p>
              <button className="btn btn-schedule text-uppercase blue-text my-3 px-5 py-2">
                Schedule an appointment
              </button>
            </div>
            <div className="btn-panel share-btn-panel mt-5 d-md-none d-flex align-items-center justify-content-between">
              <button className="btn px-5 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center">
                <RiShareLine className="me-2" />
                share
              </button>
              <button
                className="btn px-5 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#dropHint"
              >
                drop a hint
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End confirm section */}

      {/* Start detail section */}
      <div className="detail-section r-container pb-sm-5 mb-sm-5">
        <h2 className="title-panel text-capitalize blue-text pt-sm-5 pb-5">
          Setting Details
        </h2>
        <div className="detail-panel row m-0 py-5">
          <div className="col-md-4 col-12 image-panel round p-0 pe-md-5 mb-5">
            <img
              src="/img/customRing/confirmSetting/detail_img.png"
              alt="detail-image"
            />
          </div>
          <div className="description-panel col-md-8 col-12 p-0 mb-5 ps-md-5">
            <h3 className="title text-uppercase blue-text m-0">SKU 1219W14</h3>
            <p className="py-4">
              This beautiful tapered engagement ring design is channel-set with
              eight round shaped diamonds. A setting designed to draw the eye to
              the center diamond or gemstone of your choice. Pair it with the
              matching wedding band for a contoured look.
            </p>
            <nav className="info-panel">
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active text-uppercase px-0 me-5"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Information
                </button>
                <button
                  className="nav-link text-uppercase px-0"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Can be set with Diamonds
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <h3 className="title py-5 text-uppercase m-0">
                  Ring information
                </h3>
                <div className="informations">
                  <div className="d-flex align-items-center px-4 py-3 justify-content-between info-title-panel">
                    <p className="text-uppercase m-0">metal</p>
                    <p className="text-uppercase m-0">14K White Gold</p>
                  </div>
                  <div className="width-panel d-flex px-4 py-3 align-items-center justify-content-between">
                    <p className="text-uppercase m-0">width</p>
                    <p className="m-0">2mm</p>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <h3 className="title py-5 text-uppercase m-0">
                  Can be set with Diamonds
                </h3>
                <div className="informations">
                  <div className="d-flex align-items-center px-4 py-3 justify-content-between info-title-panel">
                    <p className="text-uppercase m-0">metal</p>
                    <p className="text-uppercase m-0">14K White Gold</p>
                  </div>
                  <div className="width-panel d-flex px-4 py-3 align-items-center justify-content-between">
                    <p className="text-uppercase m-0">width</p>
                    <p className="m-0">2mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End detail section */}
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
