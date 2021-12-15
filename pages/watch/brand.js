import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import renderHTML from "react-render-html";
import WatchItems from "../../components/watchItems";
import { RiArrowRightSFill } from "react-icons/ri";

const logos = [
  { url: "#", image: "logo (1).png" },
  { url: "#", image: "logo (2).png" },
  { url: "#", image: "logo (3).png" },
  { url: "#", image: "logo (4).png" },
  { url: "#", image: "logo (5).png" },
  { url: "#", image: "logo (6).png" },
]

const watchData = [
  {
    itemTitle: "Montblanc Watches",
    items: [
      { url: "#", image: "watch-item-1.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
      { url: "#", image: "watch-item-2.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
      { url: "#", image: "watch-item-3.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
      { url: "#", image: "watch-item-4.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
    ]
  },
  {
    itemTitle: "Frederique Constant Diamond Watches",
    items: [
      { url: "#", image: "watch-item-5.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
      { url: "#", image: "watch-item-6.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
      { url: "#", image: "watch-item-7.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
      { url: "#", image: "watch-item-8.png", title: "MONTBLANC HERITAGE", id: "#112533", cost: "2500" },
    ]
  }
]

const options = [
  { name: "all", value: "all" }
];

export default function Watch() {
  const [selectOption, setSelectOption] = useState('him');

  return (
    <div className="watch-brand_page">
      <Head>
        <title>Watch Brand | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <p className="text-capitalize mb-0">High End Watches</p>
          <h1 className="title text-white text-capitalize mb-5">
            Omega
          </h1>
          <div className="row m-0 align-items-end">
            <p className="description col-md-6 p-0 mb-5">The brand that is almost as old as Royal Coster Diamonds: Omega. Omega SA is a Swiss luxury watch manufacturer, based in Biel, Switzerland. Initially, the brand operated as the ‘La Generale Watch Co’, founded in 1848. In 1903, the name changed to Omega.</p>
            <div className="image-panel col-6 d-md-block d-none p-0 text-end">
              <img src="/img/watch/omga_logo.png" width="71" height="71" alt="logo-image" />
            </div>
          </div>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start guide section */}
      <div className="guide-section  py-5">
        <div className="row r-container py-sm-5 py-3">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">Exclusive Omega Watches</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text">
              Omega is very proud of their innovative watchmaking. It is inspired by sports timekeeping, their conquests of space, advocacy on behalf of worthy organizations and their enviable role in support of the world’s favorite spy: 007.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start watch section */}
      <div className="watch-section r-container mt-5">
        <div className="top-bar row m-0">
          <div className="col-sm-6 btn-panel d-flex">
            <button className={"btn py-4 me-5 " + (selectOption == 'him' && 'active')} onClick={() => setSelectOption('him')}>Him</button>
            <button className={"btn py-4 " + (selectOption == 'her' && 'active')} onClick={() => setSelectOption('her')}>Her</button>
          </div>
          <div className="col-sm-6 order-sm-last order-first d-flex py-4 justify-content-end">
            <div className="search-box round-form d-flex align-items-center py-2 pe-2">
              <label htmlFor="selectSearch" className="px-4">
                FITER BY :{" "}
              </label>
              {options && (
                <select
                  className="form-select text-end"
                  onChange={(e) => {
                    if (e.target.value) {
                      setFilterCategory([e.target.value]);
                    } else {
                      blogData = [];
                      setFilterCategory([]);
                    }
                  }}
                  defaultValue=""
                  aria-label="Default select example"
                >
                  <option value="">All</option>
                  {options.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {renderHTML(item.name)}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
        </div>
        <WatchItems watchData={watchData} />
      </div>
      {/* End watch section */}

      {/* Start banner section */}
      <div className="banner-section r-container round row mt-5 mb-4 p-5">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 p-0 p-md-5 p-sm-3">
          <h3 className="title text-capitalize mb-5">Omega: Signature<br />timepieces</h3>
          <p className="description mb-5">The Speedmaster and the Seamaster are Omega’s most iconic models. One of the events Omega as a company is most famous for is that their watch was the first one that was worn on the moon. Omega watches were the choice of NASA. So when Buzz Aldrin stepped on the lunar surface in 1969, he was wearing a Speedmaster Professional. This chronograph has been nicknamed the Moonwatch. The Seamaster is known from the 007 movies. This timepiece will forever be known as the official watch of James Bond.</p>
          <button className="btn pink-btn round-form text-uppercase py-3 px-5">Visit Website</button>
        </div>
      </div>
      {/* End banner section */}

      {/* Start history section */}
      <div className="history-section r-container pt-2 row">
        <div className="history-panel col-md-6 p-0 pe-md-3 mb-5">
          <div className="image-panel round hover-scale mb-5">
            <img src="/img/watch/brand-page_banner-bg-2.jpg" alt="history-image" />
          </div>
          <h3 className="mb-5 blue-text">Omega's History</h3>
          <p className="mb-5">From the moon to the Olympic Games. Discover all of the iconic moments that defined the OMEGA brand since 1848.</p>
          <button className="btn btn-detail p-0 d-flex align-items-center text-uppercase">
            more details <RiArrowRightSFill />
          </button>
        </div>
        <div className="news-panel col-md-6 p-0 ps-md-3 mb-5">
          <div className="image-panel round hover-scale mb-5">
            <img src="/img/watch/brand-page_banner-bg-3.jpg" alt="history-image" />
          </div>
          <h3 className="mb-5 blue-text">Omega News & Stories</h3>
          <p className="mb-5">New product launches, corporate announcements, and sporting events: stay up to date with the latest OMEGA® Stories.</p>
          <button className="btn btn-detail p-0 d-flex align-items-center text-uppercase">
            more details <RiArrowRightSFill />
          </button>
        </div>
      </div>
      {/* End history section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div >
  );
}
